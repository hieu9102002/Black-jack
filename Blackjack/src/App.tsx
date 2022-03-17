import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hand from "./Hand";
import { Card } from "./Card";
import Deck from "./Deck";
import './CSS-Playing-Cards-master/cards.css';
import React, { ChangeEventHandler, useEffect, useState } from 'react';
import { outcome } from "./Reset";
import Reset from "./Reset";

const App = () => {
    const minBet = 5;
    const deck = Deck.getInstance();

    const [playerHand, setPlayerHand] = useState <Card[]>([]);
    const [AIHand, setAIHand] = useState<Card[]>([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [AIScore, setAIScore] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [playerCash, setPlayerCash] = useState(100);
    const [bet, setBet] = useState(minBet);
    const [betMade, setBetMade] = useState(false);
    const [lost, setLost] = useState(false);

    useEffect(() => {
        setPlayerHand([deck.draw(true), deck.draw(true)]);
        setAIHand([deck.draw(true), deck.draw(false)]);
    }, [])

    const playerDraw = () => {
        setPlayerHand([...playerHand, deck.draw(true)]);
    }

    const computerDraw = () => {
        let computerScore = 0;
        AIHand.forEach(card => {
            computerScore += card.value;
        });

        while (computerScore < 17) {
            const card = deck.draw(false);
            AIHand.push(card);
            computerScore += card.value;
        }

        AIHand.forEach(card => {
            card.revealed = true;
        })

        setAIScore(calculateScore(AIHand));
        setPlayerScore(calculateScore(playerHand));
        setGameEnd(true);
    }

    const calculateScore = (hand: Card[]): number => {
        let score = 0;
        let noOfAces = 0;
        hand.forEach(card => {
            score += card.value;
            noOfAces += (card.name === "a")?1:0;
        });

        while (score > 21 && noOfAces > 0) {
            score -= 10;
            noOfAces--;
        }
        return score;
    };

    const resetGame = (outcome: outcome) => {
        switch (outcome) {
            case "player": setPlayerCash(playerCash + bet * 2); break;
            case "draw": setPlayerCash(playerCash + bet); break;
            default:
        }
        setPlayerHand([deck.draw(true), deck.draw(true)]);
        setAIHand([deck.draw(true), deck.draw(false)]);
        setPlayerScore(0);
        setAIScore(0);
        setGameEnd(false);
        setBetMade(false);
        setBet(minBet);

        if (playerCash < minBet) setLost(true);
    }

    const newGame = () => {
        deck.getNewDeck();
        setPlayerHand([deck.draw(true), deck.draw(true)]);
        setAIHand([deck.draw(true), deck.draw(false)]);
        setPlayerScore(0);
        setAIScore(0);
        setGameEnd(false);
        setBetMade(false);
        setBet(minBet);
        setPlayerCash(100);
        setLost(false);
    }

    const changeBet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBet(parseInt(event.target.value))
    }

    const makeBet = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(bet);
        setPlayerCash(playerCash - bet);
        setBetMade(true);
    }

    if (lost) return (
        <div className="container">
            <h1>Game over!</h1>
            <p>You ran out of money to continue playing!</p>
            <button type="button" className="btn btn-primary" onClick={newGame}>New game</button>
        </div>
    );

    return (
        <div className="container playingCards">
            <div className="row">{deck.getJSX()}</div>
            <div className="row">
                <div className="col">
                    <Hand playerName="Player" cards={playerHand} />
                </div>
                <div className="col">
                    <Hand playerName="AI" cards={AIHand} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p>Money left: ${playerCash}</p>
                    <form onSubmit={makeBet} className="form-inline">
                        <div className="form-group row">
                            <label htmlFor="bet-input" className="col-sm-2 col-form-label">Bet: </label>
                            <div className="col-sm-10">
                                <input id="bet-input" className={betMade? "form-control-plaintext":"form-control"} type="number" min={minBet} max={playerCash} onChange={changeBet} />
                            </div>
                        </div>
                        <input type="submit" className="btn btn-primary" disabled={betMade} value="Make Bet!"/>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-primary" onClick={playerDraw} disabled={!betMade || gameEnd} >Draw!</button>
                    <button type="button" className="btn btn-secondary" onClick={computerDraw} disabled={!betMade || gameEnd}>Done!</button>
                    {gameEnd ? <Reset playerScore={playerScore} AIScore={AIScore} resetGame={resetGame} bet={bet} /> : <></>}
                </div>
            </div>
        </div>
    );
}

export default App;

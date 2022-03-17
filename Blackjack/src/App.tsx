import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Hand from "./Hand";
import { Card } from "./Card";
import Deck from "./Deck";
import './CSS-Playing-Cards-master/cards.css';
import { useEffect, useState } from 'react';
import { outcome } from "./Reset";
import Reset from "./Reset";

const App = () => {
    const deck = Deck.getInstance();

    const [playerHand, setPlayerHand] = useState <Card[]>([]);
    const [AIHand, setAIHand] = useState<Card[]>([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [AIScore, setAIScore] = useState(0);
    const [gameEnd, setGameEnd] = useState(false);
    const [playerCash, setPlayerCash] = useState(100);

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

    const resetGame = (outcome:outcome) => {
        setPlayerHand([deck.draw(true), deck.draw(true)]);
        setAIHand([deck.draw(true), deck.draw(false)]);
        setPlayerScore(0);
        setAIScore(0);
        setGameEnd(false);
    }

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
                    <button type="button" className="btn btn-primary" onClick={playerDraw} disabled={gameEnd} >Draw!</button>
                    <button type="button" className="btn btn-secondary" onClick={computerDraw} disabled={gameEnd}>Done!</button>
                    {gameEnd ? <Reset playerScore={playerScore} AIScore={AIScore} resetGame={resetGame} /> : <></>}
                </div>
            </div>
        </div>
    );
}

export default App;

import './App.css';
import 'bootstrap';
import Hand from "./Hand";
import { Card } from "./Card";
import Deck from "./Deck";
import './CSS-Playing-Cards-master/cards.css';
import { useEffect, useState } from 'react';

const App = () => {
    const deck = Deck.getInstance();

    const [playerHand, setPlayerHand] = useState <Card[]>([]);
    const [AIHand, setAIHand] = useState <Card[]>([]);

    useEffect(() => {
        setPlayerHand([deck.draw(true), deck.draw(true)]);
        setAIHand([deck.draw(true), deck.draw(false)]);
    }, [])

    const playerDraw = () => {
        setPlayerHand([...playerHand, deck.draw(true)]);
    }

  return (
      <div className="container playingCards">
          {deck.getJSX()}
          <Hand playerName="Player" cards={playerHand} />
          <button type="button" className="btn btn-primary" onClick={playerDraw}>Draw!</button>
          <button type="button" className="btn btn-secondary">Done!</button>
          <Hand playerName="AI" cards={AIHand} />
        </div>
  );
}

export default App;

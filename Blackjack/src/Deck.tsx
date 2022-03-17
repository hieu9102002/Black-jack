import { cardNameArr, cardTypeArr, Card } from "./Card"

export default class Deck {
    private static instance: Deck;
    public cards!: Card[];
    private constructor() {
        this.getNewDeck();
    }

    public static getInstance() {
        if (!Deck.instance) Deck.instance = new Deck();
        return Deck.instance;
    }

    public getNewDeck() {
        let newCards: Card[] = [];

        cardNameArr.forEach(name => {
            cardTypeArr.forEach(type => {
                newCards.push(new Card(name, type, false));
            })
        })

        this.cards = newCards;
    }

    public draw(revealed: boolean): Card {
        if (this.cards.length == 0) this.getNewDeck();
        let cardPos = Math.floor(Math.random() * this.cards.length);

        let card = this.cards.splice(cardPos, 1);
        card[0].revealed = revealed;

        return card[0];
    }

    public getJSX(): JSX.Element {
        return (<DeckJSX cardsLeft={this.cards} />);
    }
}

const DeckJSX = ({ cardsLeft }: { cardsLeft: Card[] }) => {
    return (
        <div>
            <h2>Deck</h2>
            <ul className="deck">
                {cardsLeft.map((card, i) => {
                    return (<li key={i.toString()+"deck"}>{card.getJSX()}</li>)
                })}
            </ul>
            
            <p>Cards remaining: {cardsLeft.length}</p>
        </div>
    );
}
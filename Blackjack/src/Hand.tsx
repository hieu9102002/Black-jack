import { Card } from "./Card";

export type handProp = {
    playerName: string,
    cards: Card[]
}

const Hand = ({ playerName, cards }: handProp): JSX.Element => {
    return (
        <div>
            <h2>{playerName}</h2>

            <ul className="hand">

                {cards.map(card => {
                    return (<li key={card.name + card.type}>{card.getJSX()}</li>);
                })}
            </ul>
        </div>       
    );
}

export default Hand;
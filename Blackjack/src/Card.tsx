export const cardNameArr = ['a' , '2' , '3' , '4' , '5' , '6' , '7' , '8' , '9' , '10' , 'j' , 'q' , 'k'] as const;
export const cardTypeArr = ["clubs" , "spades" , "hearts" , "diams"] as const;

export type cardName = typeof cardNameArr[number];
export type cardType = typeof cardTypeArr[number];
export type cardProp = {
    name: cardName,
    type: cardType,
    revealed: boolean
};

export class Card implements cardProp {
    public name: cardName;
    public type: cardType;
    public revealed: boolean;
    public value: number;
    public constructor(name: cardName, type: cardType, revealed: boolean) {
        this.name = name;
        this.type = type;
        this.revealed = revealed;
        if (!isNaN(parseInt(this.name))) {
            this.value = parseInt(this.name);
        } else if (this.name != 'a') {
            this.value = 10;
        } else {
            this.value = 11;
        }
    }
    public getJSX(): JSX.Element {
        return (<CardJSX name={this.name} type={this.type} revealed={this.revealed} />);
    }
}

const CardJSX = ({ name, type, revealed }: cardProp) => {
    const getTypeAsSymbol = (type: cardType):string => {
        let code: number;
        switch (type) {
            case "clubs": code = 9827; break;
            case "spades": code = 9824; break;
            case "diams": code = 9830; break;
            case "hearts": code = 9829; break;
        }
        return String.fromCharCode(code);
    }
    const getJSX = (revealed: boolean) => {
        if (revealed) return (
            <div className={"card rank-" + name + " " + type}>
                <span className="rank">{name.toUpperCase()}</span>
                <span className="suit">{getTypeAsSymbol(type)}</span>
            </div>
        );
        else return (
            <div className="card back"></div>  
        );
    }
    return getJSX(revealed);
};

export default CardJSX;
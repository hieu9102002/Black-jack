import { MouseEventHandler } from "react";

export type outcome = "draw" | "player" | "house";

const Reset = ({ playerScore, AIScore, resetGame, bet }: { playerScore: number, AIScore: number, resetGame: Function, bet: number }) => {

    let outcome: outcome;

    if (playerScore > 21 && AIScore > 21 || playerScore === AIScore)
        outcome = "draw";

    else if (playerScore > 21)
        outcome = "house";

    else if (AIScore > 21)
        outcome = "player";

    else if (playerScore > AIScore)
        outcome = "player";
    else outcome = "house";

    const printWinner = (): JSX.Element => {
        switch (outcome) {
            case "draw": return (<p>It's a draw! You get back ${bet}</p>);
            case "player": return (<p>The player wins! You win ${bet*2}</p>);
            default: return (<p>The house wins! You lose your ${ bet}</p>);
        }
    };

    const returnWinner: MouseEventHandler = () => resetGame(outcome)

    return (
        <div>
            <p>Player score: {playerScore}</p>
            <p>AI score: {AIScore}</p>
            {printWinner()}
            <button onClick={returnWinner} type="button" className="btn btn-primary">New draw!</button>
        </div>
    )
}

export default Reset;
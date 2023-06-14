import './Winner.css';
import {useNavigate} from "react-router-dom";

export const Winner = () => {
    const navigation = useNavigate();
    const goBattleNow = () => {
        navigation('/match');
    };
    return (
        <div className="Winner">
            <h1 className="Title">Winner!</h1>
            <h3 className="Subtitle">
                Congrats! Your cat far surpasses the other cat in cuteness!
            </h3>
        <Button onClick={goBattleNow} />
    </div>
);};

export function Button({ onClick }) {
    return (
        <button className="Button" onClick={onClick}>
            Battle Again
        </button>
    );
}

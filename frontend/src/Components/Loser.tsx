import './Loser.css';
import {useNavigate} from "react-router-dom";

export const Loser = () => {
    const navigation = useNavigate();
    const goBattleNow = () => {
        navigation('/match');
    };
    return (
        <div className="Loser">
            <h1 className="Title">You Lost!</h1>
            <h3 className="Subtitle">
                So Sad! Your cat doesn't have what it takes!
            </h3>
            <Pictures />
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

export function Pictures(){
    return (
        <div className="image-container">
            <img src="/sad.png" alt="Sad Cat" />
        </div>
    );
}

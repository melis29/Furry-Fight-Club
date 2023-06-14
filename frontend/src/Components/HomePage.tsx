import './HomePage.css';
import {useNavigate} from "react-router-dom";



export const Home = () => {
	const navigation = useNavigate();

	const handleBattleNow = () => {
		// Add your logic for the battle functionality
		navigation('/Match');
	};

	return (
		<div className="HomePage">
			<Title />
			<Subtitle />
			<Button onClick={handleBattleNow} />
			<Pictures/>
		</div>
	);
};

export function Title() {
	return <h1 className="Title">Furry Fight Club</h1>;
}

export function Subtitle() {
	return (
		<h3 className="Subtitle">
			Battle against other cats to see who is the cutest!
		</h3>
	);
}

export function Button({ onClick }) {
	return (
		<button className="Button" onClick={onClick}>
			Battle Now
		</button>
	);
}

export function Pictures(){
	return (
		<div className="image-container">
			<img src="/nora.png" alt="Nora" />
			<img src="/both.png" alt="Both" />
			<img src="/yelena.png" alt="Yelena" />
		</div>
	);
}







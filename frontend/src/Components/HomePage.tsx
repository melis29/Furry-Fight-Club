import './HomePage.css';

const handleBattleNow = () => {
	// Add your logic for the battle functionality
	console.log('Battle Now clicked!');
};

export const Home = () => {
	return (
		<div className="HomePage">
			<Title />
			<Subtitle />
			<Button onClick={handleBattleNow} />
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







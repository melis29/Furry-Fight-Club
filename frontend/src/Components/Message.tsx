import {useState} from "react";
import "@css/DoggrStyles.css";
import {MessageService} from "@/Services/MessageService.tsx";
import {useAuth} from "@/Services/Auth.tsx";
import {useLocation} from "react-router-dom";


export function Message() {
	const [message, setMessage] = useState('');

	const auth = useAuth();

	const { search } = useLocation();
	const queryParams = new URLSearchParams(search);

	const imgUri = queryParams.get('imgUri');
	const name = queryParams.get('name');
	const petType = queryParams.get('petType');
	const id = parseInt(queryParams.get('id'), 10);

	const minioUrl = "http://localhost:9000/doggr/" + imgUri;

	const onSendButtonClick = () => {
		MessageService.send(auth.userId, id, message)
			.then(() => {
				alert("Message sent");
			})
			.catch(err => {
				console.error(err);
			});
		console.log(message + " " + auth.userId + " " + id);
		setMessage('');
	};

	const handleInputChange = (event) => {
		setMessage(event.target.value);
	};

	return (
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<img className="rounded" src={minioUrl} alt="Profile of pet" style={{ width: '128px', height: '128px' }} />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"text-2xl text-blue-300"}>Pet Type: {petType}</div>
			<div>
				<label htmlFor="messageInput">Enter Message:</label>
				<input id="messageInput" value={message} onChange={handleInputChange}></input>
				<button onClick={onSendButtonClick}>Send</button>
			</div>
		</div>
	);
}

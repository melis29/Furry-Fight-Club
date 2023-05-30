/*
 ** Hooks—functions starting with `use`—can only be called at the top level of your components
 * or [your own Hooks.](https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks)**
 * You can’t call Hooks inside conditions, loops, or other nested functions. Hooks are functions,
 * but it’s helpful to think of them as unconditional declarations about your component’s needs.
 * You “use” React features at the top of your component similar to how you “import” modules
 * at the top of your file.
 */
import {useState} from "react";
import {ProfileType} from "@/DoggrTypes.ts";
import { Message } from "@/Components/Message.tsx";
import { useNavigate } from 'react-router-dom';

export const MessageButton = (props: ProfileType) => {
	const { imgUri, name, petType, thumbUri, id} = props;
	const [showMessage, setShowMessage] = useState(false);

	const navigate = useNavigate();

	const goToMessage = () => {
		const url = `/message?imgUri=${encodeURIComponent(imgUri)}&name=${encodeURIComponent(name)}&petType=${encodeURIComponent(petType)}&thumbUri=${encodeURIComponent(thumbUri)}&id=${encodeURIComponent(id)}`;
		navigate(url);
	};

	return (
		<div style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '20px',
		}}>
			<button onClick={goToMessage}>
				Message
			</button>
		</div>
	);
};

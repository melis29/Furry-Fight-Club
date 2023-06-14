
import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/DoggrTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";
import { BattleUpload } from "@/Components/BattleUpload.tsx";


import './Match.css';
import { useNavigate } from 'react-router-dom';

export const Match = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();
	const [uploadNeeded, setUploadNeeded] = useState(true);
	const [selectedFile, setSelectedFile] = useState();

	const auth = useAuth();

	const navigation = useNavigate();

	const fetchProfile = () => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch( (err) => console.log("Error in fetch profile", err));
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const opponent = (
		<Profile
			{...currentProfile}
			opponent={true}
		/>
	);

	const user = (
		<Profile
			{...currentProfile}
			opponent={false}
		/>
	);

	const onFileChange = ev => {
		setSelectedFile(ev.target.files[0]);
		setUploadNeeded(false);
	};

	const toUpload = () =>{
		return (<div className={"flex flex-col items-center rounded-box bg-slate-700 w-1/3 mx-auto my-5 "}>
			<label htmlFor="profilepic" className="text-blue-300 mb-2 my-2 mx-auto">Upload your cat picture:</label>
			<input
				type={"file"}
				className={"input input-bordered max-w-full"}
				id={"profilepic"}
				name="profilepic"
				accept={"image/png, image/jpeg"}
				onChange={onFileChange}
			/>
			<button onClick={onFileChange} className={"my-2"}>Upload</button>
		</div>);
	};

	const result = () => {
		const randomNum = Math.floor(Math.random() * 100);
		if(randomNum % 2 == 0)
		{
			navigation('/winner');
		}
		else{
			navigation('/loser');
		}
	};

	return (
		<div className="battle-container">
			<div className="battle-items">
				{opponent}
				<h2>VS</h2>
				{uploadNeeded ? toUpload() : user}
				{/*<MessageButton {...currentProfile} />*/}
			</div>
			<br></br>
			<button className="btn btn-large" onClick={result}>
				Battle!
			</button>
		</div>
	);
};


import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/DoggrTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import {getNextProfileFromServer, httpClient} from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";
import { UploadFileToMinio } from "../../../backend/src/plugins/minio.js";

import './Match.css';
import { useNavigate } from 'react-router-dom';

export const Match = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();
	const [myName, setMyName] = useState("");
	const [uploadNeeded, setUploadNeeded] = useState(true);
	const [selectedFile, setSelectedFile] = useState();
	const [img, setImg] = useState("cat");


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
		// @ts-ignore
		<Profile
			opponent={false}
			name={myName}
			// @ts-ignore
			imgUri={img.name}
			petType="cat"
		/>
	);


	const onFileChange = async (ev) => {
		const selectedFile = ev.target.files[0];
		setImg(selectedFile);
	};

	const onSubmit = () =>{
		const formData = new FormData();
		formData.append('file', img);
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
			}
		};
		httpClient.post("/users/picture", formData, config)
			.then( (response) => {
				console.log("Got response from uploading file", response.status);
			})
			.catch((error) => {
				console.error("Error occurred during file upload:", error);
			});
		setUploadNeeded(false);
	};

	const toUpload = () =>{
		return (<div className={"flex flex-col items-center rounded-box bg-slate-700 w-1/3 mx-auto my-5 "}>
			<label htmlFor="catname" className="text-green-300 mb-2 my-2 mx-auto">Enter in cat name:</label>
			<input
				placeholder="Name..."
				type="text"
				id="name"
				required
				onChange={e => setMyName(e.target.value)}
				name="name"
				className="input input-bordered"
				style={{ width: "70%", height: "25%"}}
			/>

			<label htmlFor="profilepic" className="text-green-300 mb-2 my-2 mx-auto">Upload your cat picture:</label>
			<input
				type={"file"}
				id={"profilepic"}
				name="profilepic"
				accept={"image/png, image/jpeg"}
				onChange={onFileChange}
				style={{ width: "70%", height: "25%"}}
			/>
			<button onClick={onSubmit} className={"my-2 bg-emerald-500"} >Upload</button>
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

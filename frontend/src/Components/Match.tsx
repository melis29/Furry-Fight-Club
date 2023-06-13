
import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/DoggrTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { useEffect, useState } from "react";
import { MessageButton } from "@/Components/MessageButton.tsx";

import './Match.css';

export const Match = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();

	const auth = useAuth();

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

	return (
		<div className="battle-container">
			<div className="battle-items">
				{opponent}
				<h2>VS</h2>
				{user}
				{/*<MessageButton {...currentProfile} />*/}
			</div>
		</div>
	);
};

import { ProfileType } from "@/DoggrTypes.ts";
import "@css/DoggrStyles.css";

export type ProfileProps = ProfileType & {
	opponent: boolean;
};

export function Profile(props: ProfileProps) {
	const { imgUri, name, petType, opponent } = props;

	console.log("in profile" + imgUri);

	const minioUrl = "http://localhost:9000/doggr/" + imgUri;

	const onTauntButtonClick = () =>{
		alert("Your fur is gross!");
	};

	const onEncourageButtonClick = () =>{
		alert("We can do this!");
	};

	return (
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-1/3 mx-auto my-5 "}>
			<img className="rounded my-5" src={minioUrl} alt="Image of animal" style={{ width: '128px', height: '128px' }} />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			{ opponent? <div className={"text-2xl text-blue-300"}>Opponent {petType}</div> : <div className={"text-2xl text-blue-300"}>Challenger {petType}</div> }
			{ opponent ? <div className={"space-x-18 my-5"}>
				<button className="btn btn-circle" style={{ whiteSpace: "nowrap", width: "100px", height: "100px", backgroundColor: "red" }} onClick={onTauntButtonClick}>Taunt</button>
			</div> : <div className={"space-x-18 my-5"}>
				<button className="btn btn-circle" style={{ whiteSpace: "nowrap", width: "100px", height: "100px", backgroundColor: "red" }} onClick={onEncourageButtonClick}>
					Encourage
				</button>
			</div> }
		</div>
	);
}

import {useState} from "react";

export function BattleUpload () {

    const [selectedFile, setSelectedFile] = useState();

    const onFileChange = ev => {
        setSelectedFile(ev.target.files[0]);
    };

    return(
        <div className={"flex flex-col items-center rounded-box bg-slate-700 w-1/3 mx-auto my-5 "}>
            <label htmlFor="profilepic" className="text-blue-300 mb-2 my-2 mx-auto">Upload your cat picture:</label>
            <input
                type={"file"}
                className={"input input-bordered max-w-full"}
                id={"profilepic"}
                name="profilepic"
                accept={"image/png, image/jpeg"}
                onChange={onFileChange}
            />
            <button className={"my-2"}>Upload</button>
        </div>
    );
}

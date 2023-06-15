import { useAuth } from "@/Services/Auth.tsx";
import { useCallback, useState } from "react";

import "./Login.css";
import {httpClient} from "@/Services/HttpClient.tsx";
import {SubmissionStatus} from "@/Components/CreateProfile.tsx";
import {useNavigate} from "react-router-dom";


export function Login() {
	const context = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [submitFailed, setSubmitFailed] = useState(false);

	const navigation = useNavigate();

	const onSubmitLogin = useCallback(async () => {
		if (context) {
			const loginSuccess = await context.handleLogin(email, password);
			if (!loginSuccess) {
				setSubmitFailed(true);
			}
		} else {
			console.error("We have no auth context WARNING WARNING");
		}
	}, [email, password, context, setSubmitFailed]);

	// const onSubmitLogin = () => {
	// 	httpClient.post("/signIn", {email, password})
	// 		.then( (response) => {
	// 			console.log("Got response from logging in", response.status);
	// 			if (response.status === 200) {
	// 				alert("Login success.");
	// 				navigation('/');
	// 			} else {
	// 				alert("Login Fail");
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error occurred during login", error);
	// 		});
	// };

	return (
		<div className="login-form">
			<div className="login-heading">Login</div>
			<div className="error-message">
				{submitFailed ? (
					<p>Your password or email was incorrect! Please try again.</p>
				) : null}
			</div>

			<div className="form-field">
				<label htmlFor="email">Email Address:</label>
				<input
					type="text"
					id="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name="email"
				/>
			</div>

			<div className="form-field">
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					required
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
				/>
			</div>

			<div className="form-field">
				<button onClick={onSubmitLogin}>Submit</button>
			</div>
		</div>
	);
}

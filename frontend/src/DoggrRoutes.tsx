import { CreateProfile } from "@/Components/CreateProfile.tsx";
import { Home } from "@/Components/HomePage.tsx";
import { Login } from "@/Components/Login.tsx";
import { Logout } from "@/Components/Logout.tsx";
import { Match } from "@/Components/Match.tsx";
import { Message } from "@/Components/Message.tsx";
import { ProtectedRoute } from "@/Components/ProtectedRoute.tsx";
import { useAuth } from "@/Services/Auth.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { Winner } from "@/Components/Winner.tsx";
import { Loser } from "@/Components/Loser.tsx";
import "@css/DoggrStyles.css";

export function DoggrRouter() {
	const auth = useAuth();

	return (
		<div className={"doggrfancy"}>
			<nav className="bg-emerald-500 rounded-b shadow-lg mb-1">
				<div className="navbar justify-center">
					<div className={"navbar-center lg:flex"}>

						<ul className={"menu menu-horizontal"}>
							<li><Link to="/">Home</Link></li>
							<li><Link to="/match"> Battle</Link></li>
							{auth?.token != null ? (
								<li><Link to="/logout">Logout</Link></li>
							) : (
								<>
									<li><Link to="/login"> Login</Link></li>
									<li><Link to="/create"> Create Account</Link> </li>
								</>
							)}</ul>

					</div>
				</div>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/match" element={<ProtectedRoute><Match /></ProtectedRoute>} />
				<Route path="/create" element={<CreateProfile/>}/>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/message" Component={auth?.token != null? Message : Login} />
				<Route path="/winner" element={<Winner />} />
				<Route path="/loser" element={<Loser />} />
			</Routes>
		</div>
	);
}


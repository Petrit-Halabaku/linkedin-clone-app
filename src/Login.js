import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { auth } from "./firebaseConfig";

import "./Login.css";

const Login = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [profilePic, setProfilePic] = useState("");
	const dispatch = useDispatch();

	const registerHandler = (e) => {
		if (!name) {
			return alert("Please enter a full name");
		}
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: name,
						email: email,
						photoURL: profilePic,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: userAuth.user.displayName,
								photoURL: profilePic,
							})
						);
					});
			})
			.catch((err) => {
				alert(err.message);
			});
	};
	const loginHandler = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.user.displayName,
						profileUrl: userAuth.user.photoURL,
					})
				);
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<div className="login">
			<img
				src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg"
				alt="Linked inLogo"
			/>
			<form>
				<input
					type="text"
					placeholder="Full name (required if registering)"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Profile picture URL (optional)"
					value={profilePic}
					onChange={(e) => setProfilePic(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<button type="submit" onClick={loginHandler}>
					Sign In
				</button>
			</form>
			<p>
				Not a member?{" "}
				<span className="login__register" onClick={registerHandler}>
					Rgister now
				</span>
			</p>
		</div>
	);
};

export default Login;

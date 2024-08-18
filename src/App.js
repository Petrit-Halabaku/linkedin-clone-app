import React, { useEffect } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

import "./App.css";
import Feed from "./Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./Login";
import { auth } from "./firebaseConfig";
import Widgets from "./Widgets";

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(
					login({
						email: userAuth.email,
						uid: userAuth.uid,
						displayName: userAuth.displayName,
						photoURL: userAuth.photoURL,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="app">
			{/* header */}
			<Header />
			{/* app body */}

			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					{/* sidebar */}
					<Sidebar />
					{/* feed */}
					<Feed />
					{/* widgets */}
          <Widgets/>
				</div>
			)}
		</div>
	);
}

export default App;

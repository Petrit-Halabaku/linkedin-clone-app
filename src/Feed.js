import React, { useEffect, useState } from "react";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventIcon from "@material-ui/icons/Event";
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay";
import FlipMove from "react-flip-move";

import InputOption from "./InputOption";
import Post from "./Post";
import { db } from "./firebaseConfig";
import firebase from "firebase";

import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import "./Feed.css";

const Feed = () => {
	const user = useSelector(selectUser);
	const [posts, setPosts] = useState([]);
	const [input, setInput] = useState("");

	useEffect(() => {
		db.collection("posts")
			.orderBy("timestamp", "desc")
			.onSnapshot((snapshot) =>
				setPosts(
					snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
				)
			);
	}, []);

	const onSubmitHandler = (e) => {
		e.preventDefault();
		db.collection("posts").add({
			name: user.displayName,
			desc: user.email,
			message: input,
			photoURL: user.photoURL || "",
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput("");
	};
	const onChangeHandler = (e) => {
		setInput(e.target.value);
	};
	console.log(user);

	return (
		<div className="feed">
			<div className="feed__inputContainer">
				<div className="feed__input">
					<CreateIcon />
					<form onSubmit={onSubmitHandler}>
						<input
							type="text"
							name="post"
							value={input}
							onChange={onChangeHandler}
						/>
						<button type="submit">Submit</button>
					</form>
				</div>
				<div className="feed__inputOptions">
					<InputOption title="Photo" Icon={ImageIcon} color="#70B5F9" />
					<InputOption
						title="Video"
						Icon={SubscriptionsIcon}
						color="#e7a33e"
					/>
					<InputOption title="Event" Icon={EventIcon} color="#c0cbcd" />
					<InputOption
						title="Write article"
						Icon={CalendarViewDayIcon}
						color="#7fc15e"
					/>
				</div>
			</div>
			<FlipMove>
				{posts.map(({ id, data: { name, desc, message } }) => (
					<Post key={id} name={name} desc={desc} message={message} />
				))}
			</FlipMove>
		</div>
	);
};

export default Feed;

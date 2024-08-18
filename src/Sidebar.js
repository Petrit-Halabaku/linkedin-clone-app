import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";

import "./Sidebar.css";

const Sidebar = () => {
	const user = useSelector(selectUser);

	const recentItems = (topic) => (
		<div className="sidebar__recentItem">
			<span className="sidebar__hash">#</span>
			<p>{topic}</p>
		</div>
	);

	const { displayName, email, photoURL } = user;
	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<img
					src={
						"https://media-exp1.licdn.com/dms/image/C4E16AQEyCIGixVpT8A/profile-displaybackgroundimage-shrink_200_800/0/1602980882885?e=1616630400&v=beta&t=JCrCLKrU5b2nBAfChFTIuOIfjphA2pKz4F9rwtZCyx4"
					}
					alt=""
				/>
				<Avatar className="sidebar__avatar" src={photoURL} />
				<h2>{displayName}</h2>
				<h4>{email}</h4>
			</div>
			<div className="sidebar__stats">
				<div className="sidebar__stat">
					<p>Who viewed you</p>
					<p className="sidebar__statNumber">200</p>
				</div>
				<div className="sidebar__stat">
					<p>Views on post</p>
					<p className="sidebar__statNumber">200</p>
				</div>
			</div>
			<div className="sidebar__bottom">
				<p>Recent</p>
				{recentItems("reactJS")}
				{recentItems("Backend Dev")}
				{recentItems("Web Development")}
				{recentItems("Engineering")}
				{recentItems("Hacking")}
				{recentItems("JS")}
				{recentItems("NodeJs")}
			</div>
		</div>
	);
};

export default Sidebar;

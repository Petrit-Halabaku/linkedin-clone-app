import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyA6NWdjAaLMnJPha5XzyNuRPJYADFu6OX4",
	authDomain: "linkedin-clone-345ed.firebaseapp.com",
	projectId: "linkedin-clone-345ed",
	storageBucket: "linkedin-clone-345ed.appspot.com",
	messagingSenderId: "361846966008",
	appId: "1:361846966008:web:d274a828e2d0483ad35d0d",
	measurementId: "G-4Q1WL7H6BH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBS8IS7-CRzs3XVLGSpQE3cOoE2NiPR29k",
	authDomain: "my-project-475d0.firebaseapp.com",
	projectId: "my-project-475d0",
	storageBucket: "my-project-475d0.appspot.com",
	messagingSenderId: "744541723773",
	appId: "1:744541723773:web:f7c8195954c8f3d60ee514",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

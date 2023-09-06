
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";


// 투두리스트 db를 firebase에 연동해서 해보는중 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCwwok7ON34f_uUfXqykGTDwNm-BZX0nJE",
  authDomain: "hackathontalk.firebaseapp.com",
  databaseURL: "https://hackathontalk-default-rtdb.firebaseio.com",
  projectId: "hackathontalk",
  storageBucket: "hackathontalk.appspot.com",
  messagingSenderId: "288121129508",
  appId: "1:288121129508:web:e2c22abae75ff1855866b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import {auth , db} from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const registerUser = async (e) => {
        


    }



  return (

    <div>

    <Alert alert={null}/>
    <Navbar navbar={ [["Home","/"],["Login","/login"]] } aboutus={true} contactus={true}/>

    <form onSubmit={registerUser}>

        <input type="email" name="email" placeholder="Email" onChange={(e)=>{
        setEmail(e.target.value)}
        } required />
        <input type="password" name="password" placeholder="Password" onChange={(e)=>{
        setPassword(e.target.value)}
        } required />    

        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login"> Login </Link> </p>
    </form>    

    </div>  
  );
}
export default Signup;
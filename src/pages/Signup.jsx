import Navbar from "../components/Navbar";
import Alert from "../components/Alert";
import {auth , db} from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [alert,setAlert] = useState(null);

    const user = auth.currentUser;
    // console.log(user);
     

    const showAlert = (message,type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }


    const registerUser = async (e) => {
        e.preventDefault();

        let validateMessage="";
        if(/\s/.test(password))
        {
            validateMessage="Password should not contain spaces";
        }
        if(password.length<6)
        {
            validateMessage="Password should be atleast 6 characters long";
        }
        if(validateMessage!=="")
        {
            showAlert(validateMessage,"danger");
            setPassword("");
            return;
        }

        if (user) {
            navigate("/profile");
            // console.log(user.email);
            
            window.alert("First Log Out from your account");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // const user = userCredential.user;
            // await setDoc(doc(db, "users", user.uid), {
            //     email: email,
            //     password: password
            // });
            navigate('/profile',{state:{msg:"Registered Successfully",type:"success"}});
        } catch (error) {
            setEmail("");
            setPassword("");
            if (error.code === 'auth/email-already-in-use') { showAlert('Email Already in Use!',"danger"); }
            else if (error.code === 'auth/invalid-email') { showAlert('Invalid E-mail!',"danger"); }
            else if (error.code === 'auth/network-request-failed') { showAlert('No Network Connection!','danger'); }
            else { showAlert('Something went wrong!','danger'); }
            
        }

    }



  return (

    <div>

    <Alert alert={alert}/>
    <Navbar navbar={ [["Home","/"],["Login","/login"]] } aboutus={true} contactus={true}/>

    <form onSubmit={registerUser}>

        <input type="email" name="email" value={email} placeholder="Email" onChange={(e)=>{
        setEmail(e.target.value)}
        } required />
        <br />
        <input type="password" name="password" value={password} placeholder="Password" onChange={(e)=>{
        setPassword(e.target.value)}
        } required />    
        <br />
        <button type="submit">Register</button>
        <p>Already have an account? <Link to="/login"> Login </Link> </p>
    </form>    

    </div>  
  );
}
export default Signup;
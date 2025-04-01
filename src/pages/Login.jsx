import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword ,signOut } from "firebase/auth"
import Navbar from "../components/Navbar"
import Alert from "../components/Alert"
import { useNavigate } from "react-router-dom"

function Login() {

  
  const navigate = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(null)

  const user = auth.currentUser; 
  // console.log(user)
  // console.log(user.email);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  
  const loginUser = async (e) => {
    e.preventDefault();

    let validateMessage = "";
    if (/\s/.test(password)) {
      validateMessage = "Password should not contain spaces"
    }
    if (password.length < 6) {
      validateMessage = "Password should be atleast 6 characters long"
    }
    if (validateMessage !== "") {
      showAlert(validateMessage, "danger")
      setPassword("")
      return;
    }

    if (user) {
      // navigate("/profile");
      // // console.log(user.email);
      
      // window.alert("First Log Out from your account");
      // return;
      signOut(auth).then(() => {
                      // Sign-out successful.
                      console.log("Sign Out Successful");
                  }).catch((error) => {
                      // An error happened.
                      console.log(error.message);
                  });
                  return;
  }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // const user = userCredential.user
      showAlert("Login Successful", "success")
      navigate('/profile',{state:{msg:"Logged Successfully",type:"success"}});

    } catch (error) {
      setEmail("")
      setPassword("")
      if (error.code === 'auth/invalid-email') { showAlert('Invalid Email!',"danger"); }
      else if (error.code === 'auth/invalid-credential') { showAlert('Invalid Credentials!',"danger"); }
      else if (error.code === 'auth/network-request-failed') { showAlert('Network Request Failed!',"danger"); }
      else { showAlert('Login Failed!',"danger"); }
    }
  }



  return (
    <div>
      <Alert alert={alert} />
      <Navbar navbar={[['Home' , '/'], [ 'Register' , '/signup' ]]} aboutus={true} contactus={true} />

      <form onSubmit={loginUser}>

        <input type="email" name=""  onChange={(e)=>{
          setEmail(e.target.value)}
        } value={email} placeholder="Email" required />
        
        <br />
        <input type="password" name=""  onChange={(e)=>{
          setPassword(e.target.value)}
        } value={password} placeholder="Password" required />
        <br />
        <button type="submit">Login</button>
        <p>Don't have an account? <Link to="/signup"> Register </Link> </p>

      </form>

    </div>
  )
}
export default Login
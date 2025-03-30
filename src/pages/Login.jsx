import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"
import Navbar from "../components/Navbar"
import Alert from "../components/Alert"


function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alert, setAlert] = useState(null)

  // const user = auth.currentUser; 

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000)
  }

  // if (user) {
  //   // navigate("/profile");
  //   window.alert("First Log Out from your account")
  //   return;
  // }
  const loginUser = async (e) => {
    e.preventDefault()

    let validateMessage = ""
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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      // const user = userCredential.user
      showAlert("Login Successful", "success")
      setEmail("")
      setPassword("")

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
      <Navbar navbar={[['Home' , '/'], [ 'Register' , '/login' ]]} aboutus={true} contactus={true} />

      <form onSubmit={loginUser}>

        <input type="email" name="" id="" onChange={(e)=>{
          setEmail(e.target.value)}
        } value={email} placeholder="Email" required />
        
        <br />
        <input type="password" name="" id="" onChange={(e)=>{
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
import Navbar from '../components/Navbar'
import Features from '../components/Features'
import Alert from '../components/Alert'

function Home() {
  

  return (
    <div>
      {/* <Alert alert={}/> */}
      <Navbar navbar={ [["Login","/login"],["Register","/signup"]] } aboutus={true} contactus={true}/>
      <Features/>
    </div>
  )
}

export default Home
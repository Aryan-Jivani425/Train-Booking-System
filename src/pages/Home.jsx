import Navbar from '../components/Navbar'
import Features from '../components/Features'

function Home() {
  

  return (
    <div>
      <Navbar navbar={ [["Login","/login"],["Register","/signup"]] } aboutus={true} contactus={true}/>
      <Features/>
    </div>
  )
}

export default Home
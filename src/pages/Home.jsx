import {React} from 'react'
import Navbar from '../components/Navbar'


function Home() {
  

  return (
    <div>
      
      <Navbar navbar={ [["Login","/login"],["Register","/signup"]] } aboutus={true} contactus={true}/>
    </div>
  )
}

export default Home
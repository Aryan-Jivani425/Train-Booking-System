import { React, use, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth } from "../firebase-config"

function Navbar(props)
{
    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

    const user = auth.currentUser;
    
    return(
        <div>
          {
          props.navbar && props.navbar.map((element)=>{
            return(
              <>
                <Link  to={element[1]}>{element[0]}</Link>
              </> 
            )
          })
          }
          {props.aboutus && <Link  onClick={() => { scrollTo("aboutUs") }}>About Us</Link> }
          {props.contactus && <Link  onClick={() => { scrollTo("contactUs") }}>Contact Us</Link> }                  
            <Link to="/profile"><button type="button" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <img className="h-8 w-8 rounded-full" src={user && user.photoURL ? user.photoURL : url} alt="" />
            </button></Link>
                  
      </div>
    )

}
export default Navbar;
import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth,db,storage } from "../firebase-config";
import { onAuthStateChanged, updateProfile, signOut, deleteUser } from "firebase/auth";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";


function Profile() 
{
    console.log("Profile Page");
    
    const [data, setData] = useState({ name: "", email: "", phone: "", dob: "", gender: "" });
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState(null)
    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const [alert,setAlert] = useState(null);


    const navigate = useNavigate();
    const location = useLocation();


    const showAlert = (message,type) => {
        setAlert({
            msg: message,
            type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {

            if(!currentUser)
            {
                navigate("/login");
                return;
            }
            setUser(currentUser);
        })

        if(location.state)
        {
            showAlert(location.state.message,location.state.type);
            // navigate("/profile");
        }
    },[])

    useEffect(() => {

        const setUserdate = async () => {
            const userDoc = doc(db, "users", user.uid);
            const result = await getDoc(userDoc);
            setData(result.data());
        }

        if(user)
        {
            setUserdate();
        }
    },[user])



    return(
        <div>
            <Alert alert={alert} />
            <Navbar navbar={[["Home", "/"], ["Search Train", "/searchtrain"], ["Book List", "/booklist"]]  }  aboutus={true} constactus={true} />

            <div class="bg-white shadow-xl rounded-lg py-3">
              <div class="flex justify-center photo-wrapper p-2">
                <img class="w-32 h-32 rounded-full mx-auto" src={user && user.photoURL ? user.photoURL : url} />
              </div>
              <div class="p-2">
                <h3 class="text-center text-2xl text-gray-900 font-medium leading-8">{data?.name}</h3>
                <div class="text-center text-gray-400 text-xs font-semibold">
                </div>
                <table class="flex text-xs my-3 justify-center">
                  <tbody><tr>
                    <td class="px-2 py-2 text-base text-gray-500 font-bold">Email:</td>
                    <td class="px-2 py-2 text-base">{user?.email}</td>
                  </tr>
                    <tr>
                      <td class="px-2 py-2 text-base text-gray-500 font-bold">Phone:</td>
                      <td class="px-2 py-2 text-base">{data?.phone}</td>
                    </tr>
                  </tbody></table>
              </div>
            </div>

        </div>
    )


}

export default Profile; 
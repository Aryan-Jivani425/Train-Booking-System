import { useState,useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth,db,storage } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, updateProfile, signOut, deleteUser } from "firebase/auth";
import Navbar from "../components/Navbar";
import Alert from "../components/Alert";


function Profile() 
{
    // console.log("Profile Page");
    
    const [data, setData] = useState();
    const [user, setUser] = useState(null);
    const [photo, setPhoto] = useState(null)
    const url = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const [alert,setAlert] = useState(null);


    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
      }

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

        // console.log(auth.currentUser);
        

        if(location.state)
        {
            showAlert(location.state.msg,location.state.type);
            navigate("/profile"); // to remove the state from the url
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

    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const userDoc = doc(db, "users", user.uid);
        const newfields ={
            name:data.name,
            phone:Number(data.phone),
            state:data.state,
            dob:data.dob,
            gender: data.gender
        }
        await updateDoc(userDoc, newfields);
        window.scrollTo({top:0,behavior:"smooth"});
        showAlert("Profile Updated",'success');
    }


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
                    {/* <td class="px-2 py-2 text-base">{user?.email}</td> */}
                  </tr>
                    <tr>
                      <td class="px-2 py-2 text-base text-gray-500 font-bold">Phone:</td>
                      <td class="px-2 py-2 text-base">{data?.phone}</td>
                    </tr>
                  </tbody></table>
              </div>
            </div>
            <input type="file" name="" id="" />
            <br />
            <button>Update Picture</button>
            <br />
            <button>Logout</button>
            <br />
            <button>Delete Account</button>
            <br />
            <form onSubmit={handlesubmit} >

                <input type="text" name="name" id="" placeholder="Enter Name" onChange={handleChange} value={data?.name} required/>
                <br />
                <input type="number" name="phone" id="" placeholder="Enter Phone" onChange={handleChange} value={data?.phone} required/>
                <br />
                <input type="email" defaultValue={user?.email} readOnly/>
                <br />
                    <div className='flex justify-center gap-10'>
                        <div className="flex form-check form-check-inline align-center">
                            <input className="form-check-input mr-2"  type="radio" name="gender" id="inlineRadio1" onChange={handleChange} value="male" checked={data?.gender==='male'} required/>
                            <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                        </div>
                        <div className="flex form-check form-check-inline align-center">
                            <input className="form-check-input mr-2"  type="radio" name="gender" id="inlineRadio2" onChange={handleChange} value="female" checked={data?.gender==='female'} required/>
                            <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                        </div>
                        <div className="flex form-check form-check-inline align-center">
                            <input className="form-check-input mr-2"  type="radio" name="gender" id="inlineRadio3" onChange={handleChange} value="others" checked={data?.gender==='others'} required/>
                            <label className="form-check-label" htmlFor="inlineRadio3">Others</label>
                        </div>
                    </div>
                <br />
                <input type="date" name="dob" id="" placeholder="Enter DOB" onChange={handleChange}  value={data?.dob} required/>
                <br />
                <input type="text" name="state" id="" placeholder="Enter State" onChange={handleChange} value={data?.state} required/>
                <br />
                <button type="submit">Submit</button>
            </form>

        </div>
    )


}

export default Profile; 
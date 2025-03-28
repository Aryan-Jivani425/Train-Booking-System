// import { BrowserRouter, Routes } from 'react-router-dom'
  import { getDatabase,ref,set } from 'firebase/database';
  import app from './firebase-config.js';
import './App.css'

function App() {

  const db = getDatabase(app);

  const temp = function putondb(){
    
  set(ref(db, 'users/'), {
    username: 'aryan',
    email: 'aryan@gmail.com'
  });

  }

  return (
    <>

      <h1>hiiiii</h1>
      <button onClick={temp} type="button">Click here</button>


      {/* <BrowserRouter>
        <Routes>

        </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App

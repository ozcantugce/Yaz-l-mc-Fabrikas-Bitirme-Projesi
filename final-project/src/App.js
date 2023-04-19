import React, { useState, useRef} from 'react';
import './App.css';
import { Auth } from './components/Auth';
import Cookies from 'universal-cookie';
import { Chat } from './components/Chat';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState("");
  
  const roomInputRef = useRef(null);

  const signUserOut = async () => {
    await signOut(auth)
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);

  }


  if (!isAuth) {
  return (
    <div>
    <Auth setIsAuth={setIsAuth} />
    </div>
  );
}
return (
<div>
   {room ? (
   <Chat room={room}/>
   ) : (
   <div className='card text-bg-info p-3 shadow p-3 mb-5 bg-body-tertiary rounded' style={{width: "50%", justifyContent: "center", marginLeft: "350px", marginTop: "50px"}}>
    <label style={{textAlign: 'center'}}><h2>Sohbet Odası Adını Yazınız...</h2></label>
    <br/>
    <input className='border border-dark-subtle' ref={roomInputRef}/>
    <br/>
    <button type="button" className="btn btn-primary" style={{width: "150px", textAlign: "center", marginLeft: "290px"}}  onClick={()=> setRoom(roomInputRef.current.value)}>Odaya Giriş Yapın</button>
    <br/>
    <div className='cikis-yap'>
      <button type="button" className="btn btn-primary" style={{width: "150px", textAlign: "center", marginLeft: "290px"}} onClick={signUserOut}>Çıkış Yapın</button>
    </div>
    </div>
    )}

    </div>
    );
}

export default App;

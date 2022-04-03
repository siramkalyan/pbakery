/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc , updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import firebase from '../Firebase';
import nav from './nav.png'
import Lights from '../pages/Lights';
function Header() {
  let user1 = localStorage.getItem('username');
  let email = localStorage.getItem('user');
  let username1 = "";
    if(user1){
      username1  = user1;
     const ref = doc(firebase, 'orders', email);
      setDoc(ref, {email : email,item:[],time : new Date()},{merge:true});
    }
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [auth1, setauth1] = React.useState("")
    const signIn = () => {
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user);
    setauth1(user.displayName);
    localStorage.setItem("user", user.email);
    localStorage.setItem("username", user.displayName);
    alert(`Welcome ${user.displayName}`);
    window.location.reload();
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    alert(errorMessage);
    // ...
  });
}
    return (
      <div><div className='header'>🎄✨🎂𝘚𝘳𝘪 𝘚𝘢𝘪 𝘔𝘢𝘭𝘭𝘪𝘬𝘢𝘳𝘫𝘶𝘯𝘢 𝘉𝘢𝘬𝘦𝘳𝘺 🎂✨🎄</div>
        <div className='sigin-up'>
          { user1 !== undefined && user1 !== null && user1 !== "" ?
             <div style={{textAlign : "left"}}>🎊Welcome {username1}🎊</div>
            :
               <div><button>
                     <img  onClick={signIn} 
                      style={{width: '30px' ,border : "none"}} 
                      src='https://clipartcraft.com/images/google-logo-transparent-cute.png' >
                    </img>
                   <div style={{textAlign : "center"}}> Sign In</div>
                </button>
               </div>
          }
           <div style={{textAlign : 'right' , marginLeft : '1rem'}} >
          <img src={nav} style={{width: '30px'}} />
        </div>
        </div>
       {/* <div style={{position : 'sticky', top : '0'}}>       <Lights /> </div> */}

        </div>
    )
}

export default Header

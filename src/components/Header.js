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
      <div><div className='header'>πβ¨πππ³πͺ ππ’πͺ ππ’π­π­πͺπ¬π’π³π«πΆπ―π’ ππ’π¬π¦π³πΊ πβ¨π</div>
        <div className='sigin-up'>
          { user1 !== undefined && user1 !== null && user1 !== "" ?
             <div style={{textAlign : "left"}}>πWelcome {username1}π</div>
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

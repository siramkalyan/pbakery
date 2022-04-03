import React from 'react'
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Cart(props) {

    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    
        const signIn = () => {
            signInWithPopup(auth, provider)
              .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
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
        const onclickcart  = () =>
        {
          window.location.href = "/checkout"
        }
  let user1 = localStorage.getItem('username') || "";
    return (
        <div className='cart'>
            {user1 && user1 !== null && user1 !== undefined && user1 !== ""?  <div style={{color : 'white',fontWeight : 'bold',fontSize :'1rem' , background : 'none'}}onClick={onclickcart}>⭐🌟 C͙l͙i͙c͙k͙ t͙o͙ v͙i͙e͙w͙ y͙o͙u͙r͙ c͙a͙r͙t͙ 🌟⭐</div> : <div onClick={signIn} style={{textAlign : "center"}}>Please click to view your cart</div>}
           
        </div>
        
    )
}

export default Cart

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import firebase from '../Firebase'
import {doc ,getDoc} from "firebase/firestore";
 function MyOrders() {
     const [orders, setorders] = React.useState([])
     const user = localStorage.getItem("user") || "";
     console.log(user)
  React.useEffect(async()=>{
        const docRef = doc(firebase, "orders", user);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists){
        console.log("Document data:", docSnap.data());
        setorders(docSnap.data().orders);
        // console to show the orders
        console.log(orders);
    }
        else{
            console.log("No such document!");
        }
    },[])

 
    return (
        <div>
           <center className="yourorders" style={{borderRadius : '0.5rem'}}><h2>💫Your Orders💫</h2></center>
           {
                user === "" ? <div>Please login to see your orders</div> : <div>{
                    orders.length > 0 && orders.map((order,index)=>{
                        return(

        <div key={index} className='checkout-header' style={{alignContent : "center", justifyContent : "center"}}>
                            <div key={index} className='checkoutlist-body' >
                                <div key={index}>{order.item.name}</div>
                                <div >{order.quantity} kgs</div>
                                <div>{order.time.split("T")[0]}</div>
                            </div>
                            </div>
                        )
                    })
                    }
                    </div>
           }
           <div>
           </div>
        </div>
    )
}

export default MyOrders

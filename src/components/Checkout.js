import React from 'react'
import firebase from '../Firebase'
import { doc, onSnapshot , setDoc , getDoc, updateDoc , arrayUnion} from "firebase/firestore";
import Checkoutlist from './Checkoutlist';
import { Link } from 'react-router-dom';
function Checkout() {
    const [items, setitems] = React.useState([])
    const [getData, setgetData] = React.useState([])
    let user = localStorage.getItem('user');
    let email = "";
    if(user && items.length === 0){
     email  = user;
    }
    /*const unsub =  onSnapshot(doc(firebase, "orders", email), (doc) => {
        setitems(doc.data())
    });
    }*/
    console.log("get-order",items)
    let orders = localStorage.getItem('orders');
    orders = JSON.parse(orders);
    console.log("orders",orders)
    const onbtnClick = async () => {
        if(user){
            email  = user;
        const ref = doc(firebase, "orders", email);
     //console.log("No such document!");
        const docRef = await getDoc(ref);
        console.log("docRef",docRef)
        if(docRef.exists){
            console.log("docRef.exists")
            const data = docRef.data();
            console.log("data",data)
            if(data.orders){
            orders.forEach(element => {
                console.log("element",element)
                data.orders.push(element)
            });
            console.log("newData",data)
            await updateDoc(ref,data);
        }else{

            setDoc(ref,{orders}, {merge: true}); 
        }
        //const docRef1 = doc(firebase, "live-orders", email);
       // setDoc(docRef1,{orders , email : email , time : new Date() , status : "new" , isDelivered : false}, {merge: true});
        }
            else{
     setDoc(ref,{orders}, {merge: true});    }
      // localStorage.removeItem('orders');
       <Link to={"/contact"} />
        window.location.href = "/contact";
        }
}
    return (
        <div>
            <center className="yourorders"><h2>💫Your Cart💫</h2></center>
            {   orders && orders.length > 0 ?
                orders.map((order, index) => {
                    return (
                        <div key={index}>
                            <Checkoutlist order={order} />
                        </div>
                    )
                }
                ) : ""
            }
            {orders && orders.length > 0 ? <h1>Total Price: {orders.map((item => Number(item.item.dis_price * item.quantity))).reduce((prev,curr) => prev + curr,0)}</h1> : <h1>No Orders are present in your cart</h1>}
            {orders && orders.length > 0 ? <button className='btn' onClick={onbtnClick}>Checkout</button> : ""}
        </div>
    )
}

export default Checkout

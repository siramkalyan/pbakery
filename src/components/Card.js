/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import cake from './cake.png'
import { getAuth } from 'firebase/auth'
import { doc, setDoc , updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; 
import firebase from '../Firebase'
import { appendToStorage } from './appendToStorage';
function Card(props) {
    let user = localStorage.getItem('user');
    let email = "";
    if(user){
     email  = user;
    }
    const [orders, setOrders] = React.useState([])
    const [quantity, setquantity] = React.useState(0)
    const [btnText , setbtnText] = React.useState('Add to cart')
    const onInputchange = (e) => {
        setquantity(e.target.value) 
    }
    const onClickadd = () => {
        setquantity(quantity + 0.5)
    }
    const onClickremove = () => {
        if(quantity > 0){
        setquantity(quantity - 0.5)
        }
    }
    const onClicksubmit = async() => {
        if(quantity !== 0 && email !== "" && email !== null && email !== undefined){
        setOrders([...orders, {email : email , item: props.item, quantity: quantity}])
        setbtnText('Added')
        //const ref = doc(firebase, 'orders', email);
        let append_item = {
            item: props.item,
            quantity: quantity,
            isDelivered: false,
            time : new Date()
        }
        appendToStorage("orders",append_item);
        /*await updateDoc(ref, {
            item: arrayUnion(append_item)
        });*/
        }
        else{
            alert("Please enter quantity")
        }
    }
   // console.log("orders",orders)
    return (
        
        <div className="card card-shadow">
            <div className='card-header'>
            {props.item.name}
            </div>
            <div className="card-header card-image">
                <img src={props.item.image} alt="image" />
                </div>
            <div className="card-body">
            Price starting at <strike>{props.item.org_price}</strike> <b>{props.item.dis_price}</b>
            </div>
            <div className='card-footer'>
                <center>
                <button className="btn btn-outline" onClick={onClickremove}>-</button>
                <input className='btn btn-text' type="text" placeholder='in kgs' disabled="disabled" onClick={onInputchange} onChange={onInputchange} value={quantity !== 0 ? quantity : ""}></input>
                <button className="btn" onClick={onClickadd}>+</button>
                </center>
            </div>
            <div className='card-footer'>
                <center>
                <button className={btnText === 'Add to cart' ? "btn btn-outline" : "btn"}  type="submit" onClick={onClicksubmit} >{btnText}</button>
                </center>
            </div>
        </div>
        
    )
}

export default Card

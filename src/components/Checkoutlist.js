import React from 'react'
import { removeFromStorage } from './removeitemFromstorage'
function Checkoutlist(props) {
    const removeFromCart = (order) => {
        removeFromStorage("orders",order)
    }
    return (
        <div className='checkout-header'>
            <div className='checkoutlist-body'>
            <h3 >{props.order.item.name}</h3>
            <p>{props.order.item.dis_price * props.order.quantity}</p>
            <p>{props.order.quantity} kg</p>
            <img src="http://cdn.onlinewebfonts.com/svg/download_416864.png" alt="delete" onClick={()=>removeFromCart(props.order)}/>
            </div>
        </div>
    )
}

export default Checkoutlist

import React from 'react'
import {Link} from 'react-router-dom'
import FlyingSanta from '../pages/FlyingSanta'
function OrderSuccess() {
    const redirect = () => {
        window.location.href = '/'
    }
    setInterval(redirect, 50000)
    return (
        <div >
            <FlyingSanta />
            <div >
            Your order has been placed successfully.
            You will recieve a call from our nearest store as soon as possible.
            you will be redirected to the home page in 5 seconds.
            else please click <a href="/">here</a> to go to the home page.
            Happy Shopping!
            </div>
        </div>
    )
}

export default OrderSuccess

import React from 'react'
import firebase from '../Firebase'
import { doc, onSnapshot } from "firebase/firestore";
import Card from './Card';
import Loader1 from './Loader';
function Items() {
    const [loading, setloading] = React.useState(true)
    const [items, setitems] = React.useState([{0:{dis_price: "100",
    id: "0",
    image : "",
    name: "Chocolate Cake",
    org_price: "90"}},])
    var new_items = []
           if(items.length === 1){
            const unsub =  onSnapshot(doc(firebase, "cakes", "cakes"), (doc) => {
                setitems(doc.data())
                setloading(false)
            });}
            console.table(items)
            console.log("items",Object.values(items))
            console.log("new_items",new_items)
            new_items = new_items.concat(Object.values(items))
            console.log("new_items",new_items) 
            //new_items = Object.values(new_items)

    return (
        <div className='card-grid'>
         {loading ? <div style={{textAlign : "center"}}><Loader1/></div> :
               new_items[0].map((item,index) => {
                    return(
                        <Card key={index} item={item} />
               )    
                }
                ) 
         }
        </div>
    )
}

export default Items

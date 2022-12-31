import { useEffect } from "react";
import { useState } from "react"

import Button from 'react-bootstrap/Button';

const ItemCount =({stock = 0, initial= 1, onAdd}) =>{
     const [count, setCount] = useState(0);

     useEffect(() => {
        setCount(initial);
     },[]);

     const increment = () => {
        if(count < stock) {
            setCount(count + 1);
        }
     }

     const decrement = () => {
        if (count > initial + 1){
            setCount(count - 1);
        }
     }

     return(
        <>
        <div className="botonMasyMenos">
        <button onClick={increment} variant="dark" className="botonCarrito">+</button>  
           <p className="numeroContador"> {count}  </p>
        <button onClick={decrement} variant="dark" className="botonCarrito">-</button>  
        
        
        
        {
         
                stock && count
                
                ? <Button onClick={() => onAdd(count) } variant="dark" className="añadirAlcarritoBtn" > Añadir al carrito</Button> 
                : <button disabled variant="dark" className="añadirAlcarritoBtn" > Añadir al carrito</button> 
               
            }
            </div>
        </>
     );
}

export default ItemCount;
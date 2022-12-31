import { collection, doc, setDoc} from "firebase/firestore"
import { db } from "../src/utils/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { updateDoc,increment, } from "firebase/firestore";
import Swal from "sweetalert2";



const Cart = () => {
    const acceder = useContext(CartContext);

    const createOrder = () =>{
        const orden= {
            buyer: {
               name: "Lionel Andres Messi",
               email:"Lionel@gmail.com",
               phone:"123456789",
            },
            date:serverTimestamp(),
            items: acceder.cartList.map(item =>({
                id:item.idItem,
                title:item.nombre,
                price:item.precio,
                qty:item.qtyItem,
            })),
            total:acceder.CalculoTotal()
        }
       

        
        const createOrderInFS = async  () =>{
            const newOrderRef = doc(collection(db,"ordenes"))
            await setDoc(newOrderRef,orden);
            return newOrderRef
        }
        createOrderInFS()
         .then(result => {
            Swal.fire({
                text:("tu orden "+ result.id + " ha sido creada"),
                icon:"success",
            })
            acceder.cartList.forEach(async(item)=>{
                const itemRef = doc(db,"productos", item.idItem);
                await updateDoc(itemRef, {
                    stock:increment (-item.qtyItem)
                });
            })
            acceder.borrarTodo()
         })
         .catch(err=> console.log(err))
         
    }

    return (
        <>
            <h1 className="TituloCarrito">Carrito</h1>
            {
                (acceder.cartList.length > 0)
                ?<button onClick={acceder.borrarTodo} className="botonEliminarTodo">Eliminar Todo</button>
                :<h3 className="CarritoVacio">Tu carrito esta vacio</h3>
            }
            <ul>
                {
                   acceder.cartList.length > 0 &&
                   
                    acceder.cartList.map(item=> 
                    <li key={item.id} className=""> 
                    <img src={item.imagen} alt="" className="imagenCarrito" />
                         <p className="textoCarrito"> <b>"{item.nombre}"</b>
                        <b className="cantidad"> |  Cantidad:</b>{item.qtyItem} 
                         <b className="precioCarrito"> | Precio:</b>${acceder.totalPorItem(item.idItem)}</p> 
                     
                    <button onClick={()=> acceder.delThis(item.id)} className="botonEliminar">Eliminar</button>
                    <hr className="divisor"/>
                    </li>  )
                    
                
                }
            </ul>
           
                {
                    acceder.cartList.length > 0 &&
                <div className="CartaFinalizarContainer">
                    <h3 className="cartaFinalizarHeader">Compra Final</h3>
                    <p className="subTotal">Subtotal: {acceder.subTotal()}$</p>
                    <p className="Total">Total: {acceder.CalculoTotal()}$</p>
                    <button onClick={createOrder} className="FinalizarCompra">FINALIZAR COMPRA</button>
                    <hr className="divisor"/>
                </div>
                }
            
            
        </>
    );
}

export default Cart;
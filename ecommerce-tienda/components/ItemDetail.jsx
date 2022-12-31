
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CartContext } from "./CartContext";
import ItemCount from "./ItemCount";

const ItemDetail = ({item}) =>{
    const [itemCount, setItemCount] = useState(0);
    const acceder = useContext(CartContext);

    const onAdd = (qty) =>{
        setItemCount(qty);

        acceder.addToCart(item, qty);
        
    }
    return (

        <>
        <div className="ventanaDetalles">
        <h1 className="tituloDetalles">{item.nombre}</h1>
        <div className="hola">
        <img src={item.imagen} alt="" className="imagenDetalles" />
        <h3 className="textoDetalles">{item.descripcion}</h3>
        </div>
        <h3 className="precioDetalle">{item.precio}$</h3>
        <h2 className="stock">Unidades en stock {item.stock}</h2>
        </div>

        
        {
            
            itemCount === 0
            ? <ItemCount stock={item.stock} initial={itemCount} onAdd={onAdd} />
            : <Link to='/Cart'><button className="botonVerCarrito" onClick={()=>
                Swal.fire({
                    icon:"success",
                    text:'Tu rpoducto ha sido agregado',
                }
                )} 
                >Ver Carrito</button></Link>
            
        }
       </> 
    
    )
}

export default ItemDetail;
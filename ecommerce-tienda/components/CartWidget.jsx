import { useContext } from "react";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

const CartWidget = ()=>{
    const context = useContext(CartContext)

    const qtyTotal = context.calculoQty()
    return(
        <Link to="/Cart" className="carritoIcon">
        <div>
        <BsCart2 className="carrito" contador={60}/>
        {qtyTotal > 0 && <div className="contadorCarrito">{qtyTotal}</div>}
        </div>
        </Link>
    )
}

export default CartWidget;
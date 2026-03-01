'use client';
import React, {useState} from "react";

export const Header = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
    user,
    onLogout,
    setShowInvoice,

}) => {
        const [active, setActive] = useState(false);

        //donde se confirama antes de eliminar un articulo del carrito
        const onDeleteProduct = product => {
            const confirmDelete = window.confirm(`¿Seguro que deseas quitar ${product.title}?`);

            if(confirmDelete)
            {
                const results = allProducts.filter(item =>item.id !== product.id);
                setTotal(total - product.price * product.quantity);
                setCountProducts(countProducts - product.quantity);
                setAllProducts(results);
            }
        };

        //pidiendo confirmacion por medio de windows.confirm (si/no) para vaciar el carrito
        //window.confirm devuelve un booleano segun lo la eleccion (si -> true / no -> false)
        const onClearCart = () => {
            const confirmEmpty = window.confirm('¿Seguro que deseas vaciar todo el carrito?');
            if(confirmEmpty)
            {
                //si se decidio vaciar todo el carrito, cambiamos el estado del carrito
                //vaciando todo su contenido 
                setAllProducts([]);
                setTotal(0);
                setCountProducts(0);
            }
        };

        // se añade la funcionalidad del boton Finalizar Compra del Header
        const onCheckout = () => {
        if (allProducts.length === 0) 
        {
            alert("El carrito está vacío");
            return;
        }
        
        const confirmCheckout = window.confirm("¿Deseas finalizar la compra y mostrar la factura?");
        if (confirmCheckout) 
        {
            setShowInvoice(true); // si (window.confirm) == true, entonces muestra la factura
        }
    };

        return (
            <header>
                <div className="container-navbar">
                    <div className="user-info">
                        <span>Bienvenido, <strong>{user.name}</strong></span>
                        <button onClick={onLogout} className="btn-logout">Cerrar Sesion</button>
                    </div>
                    <div className="container-icon">
                        
                        <div className="container-cart-icon" onClick={()=> setActive(!active)}>
                            <span className="icon-cart-emoji">🛒</span>
                            <div className="count-products">
                                <span id="contador-productos">{countProducts}</span>
                            </div>
                        </div>
                        {/* condicional if con operador ternario para el estado del carrito
                        ? (true) con articulos   : (false) sin articulos */}
                        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                            {allProducts.length ? (
                                <>
                                    <div className="row-products">
                                        {allProducts.map(product => 
                                        (
                                            <div className="cart-product" key={product.id}>
                                                {/* mostrando la imagen a la izquierda del nombre en el carrito*/}
                                                <img src={product.urlImage} alt={product.title}
                                                    style={{width: '50px', height: '50px', objectFit: 'contain', marginRight: '10px'}}
                                                />
											<div className="info-cart-product">
												<span className="cantidad-producto-carrito">{product.quantity}</span>
												<p className="titulo-producto-carrito">{product.title}</p>
												<span className="precio-producto-carrito">${product.price}</span>
											</div>
											<span className="icon-close" 
                                                onClick={() => onDeleteProduct(product)}>❌
                                            </span>
										</div>
									))}
								</div>

								<div className="cart-total">
                                    <h3>Total:</h3>
                                    <span className="total-pagar">${total}</span>
                                </div>

                                {/*botones de Finalizar compra y vaciar carrito*/}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <button className="btn-checkout" onClick={onCheckout}>
                                        Finalizar Compra
                                    </button>
                                    <button className="btn-clear-all" onClick={onClearCart}>
                                        Vaciar Carrito
                                    </button>
                                </div>
							</>
						) : (
							<p className="cart-empty">El carrito está vacío</p>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
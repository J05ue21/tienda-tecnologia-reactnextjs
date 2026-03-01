import React from 'react';

export const Invoice = ({ user, allProducts, total, onNewPurchase }) => {
    //este componente hace un resumen de todos los useState actuales como:
    //usuario logueado, productos agregados (cantidad), precio, subtotal y total de la compra
    //También añade ñla fecha convirtiendo el objeto Date a una cadena con el formato de la PC local (.toLocalDate...)
    //imprme una tabla, en el tbody imprime el array allProducts.map(), realizando calculos como
    // Subtotal(item.price * item.quantity)
    //<tr key={item.id}>, item.id es el identificador del metodo .map() para indicarle al DOM virtual a qué elemento se refiere
    //ademas se agrega un boton de Nueva compra con el mismo usuario logueado

    return (
        <div className="invoice-container">
            <div className="invoice-card">
                <div className="invoice-header">
                    <h1>Factura de Compra</h1>
                    <p>CompuTechStoreSV</p>
                </div>
                
                <div className="invoice-details">
                    <p><strong>Cliente:</strong> {user.name}</p>
                    <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                </div>
                
                <table className="invoice-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cant.</th>
                            <th>Precio</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map(item => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price}</td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                <div className="invoice-footer">
                    <h3>Total a Pagar: ${total}</h3>
                    <p>¡Gracias por comprar en tu tienda CompuTechStoreSV!</p>
                    <button onClick={onNewPurchase} className="btn-new-purchase">Realizar otra compra
                    </button>
                </div>
            </div>
        </div>
    );
};
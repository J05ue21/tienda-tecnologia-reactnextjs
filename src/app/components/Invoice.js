export const Invoice = ({ user, allProducts, total, onNewPurchase }) => {
    //este componente hace un resumen de todos los useState actuales como:
    //usuario logueado, productos agregados (cantidad), precio, subtotal y total de la compra
    //También añade ñla fecha convirtiendo el objeto Date a una cadena con el formato de la PC local (.toLocalDate...)
    //imprme una tabla, en el tbody imprime el array allProducts.map(), realizando calculos como
    // Subtotal(item.price * item.quantity)
    //ademas se agrega un boton de Nueva compra con el mismo usuario logueado

    return (
        <div className="invoice-container">
            <div className="invoice-card">
                <h1>Factura de Compra</h1>
                <p><strong>Cliente:</strong> {user.name}</p>
                <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
                <hr />
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
                <hr />
                <h2 className="invoice-total">Total Pagado: ${total}</h2>
                <button onClick={onNewPurchase} className="btn-invoice">Nueva Compra</button>
            </div>
        </div>
    );
};
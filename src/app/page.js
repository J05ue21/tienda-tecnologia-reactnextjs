'use client';

import { useState } from 'react'; //estados del usuarios (logueado) al navegar
import { users } from './data'; // fichero que contiene usuarios de prueba de login
import Login from './components/Login'; // componente Login
import { Header } from './components/Header'; // componente Header
import { ProductList } from './components/ProductList'; //Componente ProducList para listar articulos
import { Invoice } from './components/Invoice';//importamos el componente que genera la factura


export default function Home()
{
  // estados del carrito de compras del usuario actual
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal]=useState(0);
  const [countProducts, setCountProducts]=useState(0);

  //estaso del login, si es 'null' es porque aun no ha iniciado sedion
  const [activeUser, setActiveUser]=useState(null);

  //se agreaga para mostrar la factura o la tienda, una vez finalizada la 'compra' no puede añadir
  //más articulos, hasta que presione el boton Nueva Compra, es decir, te devuelve al listado de articulos

  const [showInvoice, setShowInvoice] = useState(false);

  //validando el usuario que intenta hacer login
  const handleLogin=(username, password)=>{
    const found = users.find
    (
      (usuario)=>usuario.username === username && usuario.password === password 
      //usuario es el alias que se usa para representar al usuario del data.js mientars los compara con el que ingrese en el formulario
      //tambien usamos triple === para comparar que sean del mismo valor y del mismo tipo de dato
    );

    if(found){
      setActiveUser(found);
    }
    else{
      alert('El Usuario o contraseña incorrectos, Intente nuevamente')
    }
  };

  //bloque para acciones luego de dar click al boton Cerrar Sesion, actualiza los estados
  const handleLogout = ()=>{
    setActiveUser(null);
    setShowInvoice(false);
    setAllProducts([]); //carrito se queda vacio
  };

  //función para el boton Nueva Compra del componente Invoice, es como aparece justo despues de iniciar sesion

  const handleNewPurchase = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
    setShowInvoice(false); //aun no se muestra factura, hasta que se presione el boton finalizar compra
                            //que está en Header.js
  };

  return (
    <main>
      
      {!activeUser ? ( 
        <Login onLogin={handleLogin} />
      ) : showInvoice ? (
        //utilizando el operador ternario con doble condicion. ? si es verdadero : si es falso
        //(si activeUser es true && showInvoice es true), entonces se muestras factura...
        <Invoice 
          user={activeUser} 
          allProducts={allProducts} 
          total={total} 
          onNewPurchase={handleNewPurchase} 
        />
      ) : (
        //(si activeUser es true && showInvoice es false), se muestra la tienda normalmente
        <>
          <Header
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
            user={activeUser}
            onLogout={handleLogout}

            setShowInvoice={setShowInvoice}//se agrega la funcion para renderizar la Factura desde el Header
          />
          <ProductList
            allProducts={allProducts}
            setAllProducts={setAllProducts}
            total={total}
            setTotal={setTotal}
            countProducts={countProducts}
            setCountProducts={setCountProducts}
          />
        </>
      
      )}
    </main>
  );
}
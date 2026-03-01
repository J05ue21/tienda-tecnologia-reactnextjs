'use client';

import { useState } from 'react'; //estados del usuarios (logueado) al navegar
import { users } from './data'; // fichero que contiene usuarios de prueba de login
import Login from './components/Login'; // componente Login
import { Header } from './components/Header'; // componente Header
import { ProductList } from './components/ProductList'; //Componente ProducList para listar articulos

export default function Home()
{
  // estados del carrito de compras del usuario actual
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal]=useState(0);
  const [countProducts, setCountProducts]=useState(0);

  //estaso del login, si es 'null' es porque aun no ha iniciado sedion
  const [activeUser, setActiveUser]=useState(null);

  //validando el usuario que intenta hacer login
  const handleLogin=(username, password)=>{
    const found = users.find
    (
      (u)=>u.username === username && u.password === password
    );

    if(found){
      setActiveUser(found);
    }
    else{
      alert('El Usuario o contraseña incorrectos, Intente nuevamente')
    }
  };

  const handleLogout = ()=>{
    setActiveUser(null);
  };

  return (
    <main>
      
      {activeUser ? (
        //utilizando el operador ternario ? si es verdadero : si es falso
        //si activeUser es true, se muestras Header y ProducList...
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
      ) : (
        // si activeUser es FALSE, se mostrara el componente Login ya que no hay usuario logueado aun
        <Login onLogin={handleLogin}
        />
      )}
    </main>
  );
}
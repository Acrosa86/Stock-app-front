import { useState } from 'react';
import './App.css';

const App = () => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  
  const handleNameChange = (e) => {
    const name = e.target.value
    setProductName(name)
  }

  const handlePriceChange = (e) => {
    const price = e.target.value
    setProductPrice(price)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('http://localhost:8080/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: productName,
        price: productPrice,
      }),
    })
  }


console.log({productName})
console.log({productPrice})
  return (
    <div className="App">
        <h1>Nuevo Producto</h1>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleNameChange}
            value={productName} 
            type='text' 
            name='name' 
            placeholder='Nombre del Producto...'
          />
          <input 
            onChange={handlePriceChange}
            value={productPrice} 
            type='number' 
            name='price'
            placeholder='Precio del Producto...'
          />
          <button>Crear Producto</button>
        </form>
    </div>
  );
}

export default App;

import { useState } from 'react';
import './App.css';


const initialState = { name: '', price: 0 }
const App = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState(initialState)

  const handleChange = (e) => {
    const fieldName = e.target.name
    const fieldValue = e.target.value
    
    setProduct({...product, [fieldName]: fieldValue })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!product.name){
      console.log('Tienes que llenar el campo nombre')
      return
    }

    setIsLoading(true)

    fetch('http://localhost:8080/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.ok) {console.log("Producto creado con exito")
      setProduct(initialState)
      
      } else {
        console.log(data.message)
      }
      setIsLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
    })
  }


console.log({product})

  return (
    <div className="App">
        <h1>Nuevo Producto</h1>
        <form onSubmit={handleSubmit}>
          <input 
            onChange={handleChange}
            value={product.name} 
            type='text' 
            name='name' 
            placeholder='Nombre del Producto...'
          />
          <input 
            onChange={handleChange}
            value={product.price} 
            type='number' 
            name='price'
            placeholder='Precio del Producto...'
          />
          <button>
            {
              isLoading ? 'Creando Producto...' : 'Crear Producto'
            }
            </button>
        </form>
    </div>
  );
}

export default App;

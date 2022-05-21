import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    {name: 'Product1', price: 100.00, key:"1"},
    {name: 'Product2', price: 200.00, key:"2"},
  ]);

  // Add a product to the products list
  const addProduct = () => {
    setProducts(prods => [...prods, ({
      name: `Product${prods.length+1}`, 
      price: (prods.length+1)*100.00, 
      key:`${(prods.length+1)}`})
    ])
  };

  // fetch data from api
  const fetchProducts = async () => {
    console.log("REQUESTED");
    try {
      const req = await fetch('http://localhost:5000/api/products');
      const resp = await req.json();
      setProducts(resp);
    } catch(e){
      console.log(e);
    }
  };

  // Call for data from server, no dependencies
  useEffect(()=>{
    fetchProducts();
  }, [])

  return (
    <div>
      <h1>Restore</h1>
      <ul>
        {products.map(prod => (
          <li key={prod.key}>
            <div> <b>Name:</b> {prod.name} </div> 
            <div> <b>Price:</b> {prod.price} </div> 
          </li>
        ))}
      </ul>
      <button onClick={addProduct}> Add product </button>
    </div>
  );
}

export default App;

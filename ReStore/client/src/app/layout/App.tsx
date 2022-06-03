import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "../models/product";
import Catalog from "../features/catalog/Catalog";
import Header from "./Header";
import { Container, CssBaseline } from "@mui/material";


function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // Add a product to the products list
  const addProduct = () => {
    setProducts(prevState => [...prevState, {
      name: `Product${prevState.length+1}`, 
      price: (prevState.length+1)*100.00, 
      id:prevState.length+1,
      description: "some description",
      pictureUrl: "http://picsum.photo/200",
      brand: "some brand"
    }])
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
      <CssBaseline />
      <Header />
      <Container>
        <Catalog products={products} addProduct={addProduct} />
      </Container>
    </div>
  );
}

export default App;

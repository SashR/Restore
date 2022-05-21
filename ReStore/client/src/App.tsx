import "./App.css";

const products = [
  {name: 'Product1', price: 100.00, key:"1"},
  {name: 'Product2', price: 200.00, key:"2"},
];

function App() {
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
    </div>
  );
}

export default App;

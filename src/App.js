import logo from './logo.svg';
import './App.css';
import Items from './components/Items';
import Header from './components/Header';
import Cart from './components/Cart';


function App() {
  return (
    <div className="App">
      <Header />
      <Items />
      <Cart/>
    </div>
  );
}

export default App;

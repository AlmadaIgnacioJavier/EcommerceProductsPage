// src/App.jsx
import ProductList from './components/products/productList';
import Navbar from './components/nav/navBar';
import CartModal from './components/cart/cartDrawer';

function App() {
  return (
    <div className="mt-16">
      <Navbar />
      <ProductList />
      <CartModal />
    </div>
  );
}

export default App;

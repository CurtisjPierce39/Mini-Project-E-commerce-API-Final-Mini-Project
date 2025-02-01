// import { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import CustomerList from './components/CustomerList';
import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import CustomerFormWrapper from './components/CustomerFormWrapper';
import { Route, Routes } from 'react-router-dom';
import './AppStyles.css';
import ProductForm from './components/ProductForm';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage';
import OrderForm from './components/OrderForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/products');
        setProducts(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};


  const handleEditProduct = (product) => {
    setSelectedProduct(product)
  };
  
  const handleProductUpdated = () => {
    fetchProducts();
    setSelectedProduct(null);
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };
  const handleEditOrder = (order) => {
    setSelectedOrder(order)
  };
  
  const handleOrderUpdated = () => {
    fetchOrders();
    setSelectedOrder(null);
  };

  const handleOrderDeleted = () => {
    fetchOrders();
  };

  return (
    <div className='app-container'>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-customer/" element={<CustomerFormWrapper />} />
        <Route path="/edit-customer/:id" element={<CustomerFormWrapper />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/add-order" element={<OrderForm />} />
        <Route path="/add-product" element={<ProductForm selectedProduct={selectedProduct} onProductUpdated={handleProductUpdated}/>} />
        <Route path='edit-product/:id' element={<ProductForm />} />
        <Route path='/products' element={<ProductList products={products} onEditProduct={handleEditProduct} onProductDeleted={handleProductDeleted}/>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}


export default App;
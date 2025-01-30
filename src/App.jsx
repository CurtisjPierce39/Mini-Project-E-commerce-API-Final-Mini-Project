// import { Component } from 'react';
import NavigationBar from './components/NavigationBar';
import CustomerList from './components/CustomerList';
// import OrderList from './components/OrderList';
import ProductList from './components/ProductList';
import CustomerFormWrapper from './components/CustomerFormWrapper';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './AppStyles.css';
import ProductForm from './components/ProductForm';
import NotFound from './components/NotFound';
import HomePage from './components/HomePage';

function App() {
    return (
      <div className='app-container'>
          <NavigationBar/>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add-customer/" element={<CustomerFormWrapper />} />
              <Route path="/edit-customer/:id" element={<CustomerFormWrapper />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/add-product" element={<ProductForm />} />
              <Route path='edit-product/:id' element={<ProductForm />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
      </div>
    );
  }


export default App;
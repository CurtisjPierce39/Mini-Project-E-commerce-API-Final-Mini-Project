import { Component } from 'react';
import CustomerList from './components/CustomerList';
// import OrderList from './components/OrderList';
// import ProductList from './components/ProductList';
import CustomerForm from './components/CustomerForm'
// import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './AppStyles.css';
// import ProductForm from './components/ProductForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null,
      // selectedOrderId: null
    };
  }

  handleCustomerSelect = (customerId) => {
    this.setState({ selectedCustomerId: customerId });
  }

  updateCustomerList = () => {
    this.customerListRef.fetchCustomers();
  };


  // handleOrderSelect = (orderId) => {
  //   this.setState({ selectedOrderId: orderId })
  // }


  render() {
    const { selectedCustomerId } = this.state

    return (
      <div className='app-container'>
        <h1>Our Customers</h1>
        <CustomerForm customerId={selectedCustomerId} onUpdateCustomerList={this.updateCustomerList} />
        {/* <ProductForm /> */}
        <CustomerList ref={ref => this.customerListRef = ref} onCustomerSelect={this.handleCustomerSelect} />
        {/* {selectedCustomerId && (
          <OrderList
              customerId={selectedCustomerId}
              onOrderSelect={this.handleOrderSelect}
          />
        )}
        {selectedOrderId && (
          <ProductList orderId={selectedOrderId} />
        )} */}
      </div>
    );
  }
}

export default App;
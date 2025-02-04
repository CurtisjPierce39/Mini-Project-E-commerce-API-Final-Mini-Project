import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import { Button, Alert, Container, ListGroup , Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            selectedOrderId: null,
            error: null
        };
    };


    componentDidMount() {
        this.fetchOrders();
    }

    fetchOrders = () => {
        axios.get('http://127.0.0.1:5000/orders')
            .then(response => {
                this.setState({ orders: response.data })

            })
            .catch(error => {
                console.error('Error fetching data:', error)
                this.setState({ error: 'Error fetching orders. Please try again later.' });
            });
    }

    selectOrders = (id) => {
        this.setState({ selectedOrderId: id });
        this.props.onOrderSelect(id);
    }

    deleteOrder = (orderId) => {
        axios.delete(`http://127.0.0.1:5000/orders/${orderId}`)
            .then(() => {
                this.fetchOrders();
            })
            .catch(error => {
                console.error('Error deleting order:', error);
                this.setState({ error: 'Error deleting order. Please try again.' });
            });
    }

    render() {

        const { orders, error } = this.state;

        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Order Date</th>
                        <th>Customer Name</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.orderDate}</td>
                            <td>{order.customerName}</td>
                            <td>{order.productName}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
}
OrderList.propTypes = {
    onOrderSelect: func
}

export default OrderList
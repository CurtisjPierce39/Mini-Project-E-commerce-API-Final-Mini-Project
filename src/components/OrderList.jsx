import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import { Button, Alert, Container, ListGroup } from "react-bootstrap";


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
            <Container>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className='mt-3 mb-3 text-center'>Orders</h2>
                <ListGroup>
                    {orders.map(order => (
                        <ListGroup.Item key={order.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                            <Link to={`/edit-order/${order.id}`} className='text-primary'>{order.date}<br></br>{order.customer_id}<br></br>{order.product_id}</Link>
                            <Button variant='danger' size='sm' onClick={() => this.deleteOrder(order.id)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

OrderList.propTypes = {
    onOrderSelect: func
}

export default OrderList
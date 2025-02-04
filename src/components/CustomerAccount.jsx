import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { func } from "prop-types";
import { Button, Alert, Container, ListGroup } from "react-bootstrap";

class CustomerAccountList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerAccounts: [],
            selectedCustomerAccountId: null,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCustomerAccounts();
    }

    fetchCustomerAccounts = () => {
        axios.get('http://127.0.0.1:5000/customer_account')
            .then(response => {
                this.setState({ customerAccounts: response.data })
            })
            .catch(error => {
                console.error('Error fetching data:', error)
                this.setState({ error: 'Error fetching customer accounts. Please try again later.' });
            });
    }

    selectCustomerAccount = (id) => {
        this.setState({ selectedCustomerAccountId: id });
        this.props.onCustomerAccountSelect(id);
    }

    deleteCustomerAccount = (customerAccountId) => {
        axios.delete(`http://127.0.0.1:5000/customer_account/${customerAccountId}`)
            .then(() => {
                this.fetchCustomerAccounts();
            })
            .catch(error => {
                console.error('Error deleting customer account:', error);
                this.setState({ error: 'Error deleting customer account. Please try again.' });
            });
    }

    render() {
        const { customerAccounts, error } = this.state;

        return (
            <Container>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h2 className='mt-3 mb-3 text-center'>Customers</h2>
                <ListGroup>
                    {customerAccounts.map(customerAccount => (
                        <ListGroup.Item key={customerAccount.id} className='d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded'>
                            (ID:{customerAccount.id})<br></br>{customerAccount.password}<br></br>{customerAccount.username}<br></br>
                            <Button variant='danger' size='sm' onClick={() => this.deleteCustomerAccount(customerAccount.id)}>Delete</Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        );
    }
}

CustomerAccountList.propTypes = {
    onCustomerAccountSelect: func
}

export default CustomerAccountList;
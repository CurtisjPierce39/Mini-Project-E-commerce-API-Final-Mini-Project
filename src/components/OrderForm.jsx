import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { object, func } from "prop-types";
import { Form, Button, Alert, Modal, Spinner, Row, Col } from "react-bootstrap";
import axios from "axios";

const OrderForm = () => {
    const [customerName, setCustomerName] = useState('')
    const [orderItems, setOrderItems] = useState({ name: '', quantity: 1 });
    const [products, setProducts] = useState([{ name: '', quantity: 1 }]);
    const [errors, setErrors] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/orders/${id}`)
                .then(response => {
                    setOrder(response.data);
                })
                .catch(error => setErrorMessage(error.message));
        }
    }, [id]);

    const validateForm = () => {
        let errors = {};
        if (!order.name) errors.name = 'Customer name is required';
        if (!order.products) errors.product = 'Product name is required';
        if (!order.quantity || order.quantity <= 0) errors.quantity = 'Quantity must be a positive number';
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        setSubmitting(true);
        try {
            if (id) {
                await axios.put(`http://127.0.0.1:5000/orders/${id}`, order);
            } else {
                await axios.post('http://127.0.0.1:5000/orders', order);
            }
            setShowSuccessModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setSubmitting(false);
        }
        console.log('Order submitted:', { customerName, products });
    };

    const handleCustomerNameChange = (event) => {
        setCustomerName(event.target.value);
    };

    const addProduct = () => {
        setProducts([...products, { name: '', quantity: 1 }]);
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...products];
        updatedProducts[index][field] = value;
        setProducts(updatedProducts);
    };

    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setOrder(prevOrder => ({
    //         ...prevOrder,
    //         [name]: value
    //     }));
    // };

    const handleClose = () => {
        setShowSuccessModal(false);
        setOrder({ name: '', product: '' });
        setSubmitting(false);
        navigate('/orders');
    };

    if (isSubmitting) return <p>Submitting order data...</p>;

    return (
        <>

            <Form onSubmit={handleSubmit}>
                <h2>Order Management</h2>
                <h3>{id ? 'Edit' : 'Add'} Order</h3>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="orderName">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        name="customerName"
                        value={customerName}
                        onChange={handleCustomerNameChange}
                        isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
                    </Form.Control.Feedback>
                </Form.Group>

                {products.map((product, index) => (
                    <Row key={index}>
                        <Col>
                            <Form.Group controlId={`productName-${index}`}>
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={product.name}
                                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId={`productQuantity-${index}`}>
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value, 10) || 1)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                ))}
                <Button onClick={addProduct}>Add Product</Button>
                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Spinner as="span" animation="border" size="sm" /> : 'Submit'}
                </Button>
            </Form>

            <Modal show={showSuccessModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Order has been successfully {id ? 'updated' : 'added'}!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

OrderForm.propTypes = {
    selectedOrder: object,
    onOrderUpdated: func
}

export default OrderForm
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">E-Commerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink as={NavLink} to="/" activeclassname="active">
                    Home
                    </NavLink>
                    <Nav.Link as={NavLink} to="/add-customer" activeclassname="active">
                    Add Customer
                    </Nav.Link>                    
                    <Nav.Link as={NavLink} to="/customers" activeclassname="active">
                    Customers
                    </Nav.Link>                    
                    <Nav.Link as={NavLink} to="/add-product" activeclassname="active">
                    Add Product
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/products" activeclassname="active">
                    Products
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders" activeclassname="active">
                    Orders
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/add-order" activeclassname="active">
                    Order Form
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;
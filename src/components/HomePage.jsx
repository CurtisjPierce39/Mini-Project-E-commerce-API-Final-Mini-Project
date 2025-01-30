import { Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Welcome to our E-Commerce App!</h1>
            <p>This is the place to find all your needs at one click!</p>
            <img src="./src/components/img/e-commerce.jpg" className="img-fluid" alt="e-commerce image" /><br></br>
            <Button variant="primary" onClick={() => navigate(`/products`)} className="me-2">Shop Now!</Button>

        </div>
        )
}

export default HomePage;
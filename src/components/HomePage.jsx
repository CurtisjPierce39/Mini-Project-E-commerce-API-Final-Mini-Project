import { Button } from "react-bootstrap";

function HomePage() {
    return (
        <div>
            <h1>Welcome to our E-Commerce App!</h1>
            <p>This is the place to find all your needs at one click!</p>
            <img src="./src/components/img/e-commerce.jpg" className="img-fluid" alt="e-commerce image" /><br></br>
            <Button variant='btn btn-primary' type="submit">Shop Now!!</Button>

        </div>
        )
}

export default HomePage;
import React, {useRef} from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'

const Login = ({onIdSubmit}) => {

    //state variable to store the input ID 
    const idRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault();

        onIdSubmit(idRef.current.value);
    }

    //create a random Id for the new user 
    const createNewId = () => { 
        onIdSubmit(uuidV4())
    }
    return (
    <Container className="align-items-center d-flex" style={{height:'100vh'}}>
        <Form className="w-100" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Enter your ID</Form.Label>
                <Form.Control type="text" ref={idRef} required></Form.Control>
            </Form.Group>
            <Button type="submit" className="mr-5">Login</Button>
            <Button variant="secondary" onClick={createNewId}>Create a new ID</Button>
        </Form>
    </Container>
    )
}

export default Login

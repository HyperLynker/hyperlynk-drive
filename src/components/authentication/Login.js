import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"
import CenteredContainer from './CenteredContainer'
import lifestorelogo from './lifestorelogo.png'

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError ] = useState('')
    const [loading, setLoading ] = useState(false)
    const history = useHistory()

    async function handleSubmit(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true) 
            await login(emailRef.current.value, passwordRef.current.value)
            setLoading(false)  
            history.push('/')
        } catch {
            setLoading(false)  
            setError('Failed to login')
        }
   }



    return (
        <CenteredContainer>         
           <Card>
               <Card.Body>
                   <h2 className="text-center mb-4"><img src={lifestorelogo} width="350" alt="login" /></h2>
                   {error && <Alert variant="danger">{error}</Alert>}
                   <Form onSubmit={handleSubmit}>
                       <Form.Group id="email">
                            <Form.Label>DeskPass Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                       </Form.Group>
                       <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                       </Form.Group>
                       <Button disabled={loading} className="w-100" type="submit">
                        Log in with Deskpass
                       </Button>
                   </Form>
                   <div className="w-100 text-center mt-3">
                       <Link to="/forgot-password">Forgot Password?</Link>
                   </div>
               </Card.Body>
           </Card>
           <div className="w-100 text-center mt-2">
               Need an account? <Link to="/signup">Sign up</Link>
           </div>
        </CenteredContainer> 
    )
}

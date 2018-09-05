import './Auth.css'
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import { browserHistory } from 'react-router'
import { api } from '../../services/api'
import { isAuthenticated, logOut } from '../auth/auth'
import { setUserData, getUserData, setToken, getToken } from '../../utils/sessionStorages'

import { toast, ToastContainer } from 'react-toastify';
import logo from '../../assets/imgs/logo2.png'

export default class Auth extends Component {
    state = { register : '', password: '' }

    async componentWillMount() {
        await isAuthenticated()
        await logOut();
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    errorMessage = (message) => {
        toast.error(message , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        })
    }

    handleSubmit = async () => {
        const { register, password } = this.state
        const { history } = this.props;

        try {
            const response = await api.post('/authenticate', {
                register: register,
                password: password
            }) 

            

            setToken(response.data.token)
            setUserData(response.data.user)
            console.log(response)

            const authenticated = await isAuthenticated()

            console.log(authenticated);
            
            if(authenticated === true) {
                return history.push('/home')
            }

            if(authenticated !== true ) {
                console.log('chegou')
                // sessionStorage.clear()
                this.errorMessage('Você não está autorizado a acessar o sistema')
                return this.setState({ register: '', password: ''})
            }
                      
        } catch (error) {
            const message  = error.response.data.error
            this.errorMessage(message)
            this.setState({ register: '', password: ''})
        }
    }

    renderForm = () => {
        return(
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Form.Input icon='user' size='large' label={<p className='label' >Matricula</p>} placeholder='Digite sua matricula' name='register' onChange={this.handleChange} value={ this.state.register}/>
                    </Form.Field>
                    <Form.Field>
                        <Form.Input icon='lock' size='large' type='password' label={<p  className='label' >Senha</p>} placeholder='Digite sua senha' name='password' onChange={this.handleChange} value={ this.state.password}/>
                    </Form.Field>
                    <Form.Button fluid size='large' content='Enviar' positive />
                </Form>
            </div>
        )
    }

    render() {
        return (
            <div className="wrapper">
                <div className="boxContent">
                    <div className="logoContent">
                        <img src={logo}/>
                    </div>
                    <div className="formContent">
                        { this.renderForm() }
                    </div>
                </div>
                <ToastContainer autoClose={false} />
            </div>
            // <div>
            //     {/* <Link to="/">
            //         Inicio
            //     </Link>  */}
            // </div>
        );
    }
}
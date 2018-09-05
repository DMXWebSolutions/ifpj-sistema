import './Nav.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { logOut } from '../auth/auth'
import { getUserData } from '../../utils/sessionStorages'
import MyUserOptions from '../user/MyUserOptions'
import { Image } from 'semantic-ui-react'

const trigger = (
    <div className='user-profile'>
      <Image circular={true} size={'tiny'} src={'https://randomuser.me/api/portraits/women/90.jpg'} /> 
      {'faker user'}
    </div>
)

const AuthorizationLink = props => {
    if(props.profile === props.authorize){
        return(
            <div>
                {props.children}
            </div>
        )
    } else {
        return false
    }
}


export default class NavMenu extends Component {
    state = {}

    async componentDidMount() {
        this.setState({profile: ''})
        const user  = await getUserData()
        if(user !== undefined) {
            const profile = await user.profiles
            const name = await user.name
            this.setState({ name, user, profile }, () => this.forceUpdate())
        } else {
            return logOut()
        }
    }

    renderNavBar() {
        const { profile, name  } = this.state
        return(
            <aside className="menu-area">


                <div className="user-box">
                    <MyUserOptions trigger={trigger}/>
                </div>

                <nav className="menu">
                    <Link to="/home">
                        <i className="fa fa-home"></i> Inicio
                    </Link>

                    <AuthorizationLink profile={profile} authorize={'ADMIN'}>
                        <Link to="/users">
                            <i className="fa fa-users"></i>Usuarios
                        </Link>
                    </AuthorizationLink>

                    <Link to="/notifications">
                        <i className="fa fa-bell"></i>Notificações
                    </Link>
                    <Link to="/login">
                        <i className="fas fa-user-tie" onClick={() => logOut() }></i> Sair
                    </Link>
                    {/* <Link to="/alunos">
                        <i className="fas fa-user-graduate"></i> Alunos
                    </Link>
                    <Link to="/disciplinas">
                        <i className="fas fa-graduation-cap"></i>Disciplinas
                    </Link>   */}
                </nav>
            </aside>
        )
    }

    render() {
        return (
            this.renderNavBar()
        )
    }
}
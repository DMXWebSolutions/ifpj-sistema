
import React from 'react'
import { Dropdown, Image } from 'semantic-ui-react'


const options = [
  { key: 'informações', text: 'Conta', icon: 'user' },
  { key: 'settings', text: 'Notificações', icon: 'settings' },
  { key: 'sign-out', text: 'Sair', icon: 'sign out' },
]

const MyUserOptions = (props) => (
  <Dropdown trigger={props.trigger} options={options} pointing='top left' icon={null} />
)

export default MyUserOptions
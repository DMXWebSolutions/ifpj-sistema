import React from 'react';
import  { Redirect } from 'react-router-dom'

export const isAuthenticated = async () => {
    
    try {
        const token = await sessionStorage.getItem('token')
        const user = await JSON.parse(sessionStorage.getItem('user')) 

        if((token && user !== undefined) && (user.profiles === 'ADMIN'))
            return true

        if((token && user !== undefined) && (user.profiles === 'PROFESSOR'))
            return true
    
        if((token && user !== undefined) && (user.profiles === ('ALUNO' || ' ')))
            return false
    } catch(error) {
        console.log(error)
        return false
    }
}


export const logOut = async () => {
    await sessionStorage.clear()

    return <Redirect to='/login'  />
}
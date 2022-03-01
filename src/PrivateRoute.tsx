import React from 'react';
import {Navigate } from 'react-router-dom'

interface Props {
  children: JSX.Element
}

export function PrivateRoute({ children}:Props) {

    const logged = {
        isLoggedIn: !!localStorage.getItem('isLogged')
    };

    if(!logged.isLoggedIn){
      return <Navigate to="/signin" />;
    }

    return children
    
  
}
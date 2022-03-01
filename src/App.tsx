import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Signup from './components/Signup'
import Signin from './components/Signin'
import { PrivateRoute } from './PrivateRoute'
import Galleries from './components/Galleries'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route element={<Layout />}>
                    <Route path='/galleries/:id' element={
                        <PrivateRoute>
                            <Galleries />
                        </PrivateRoute>} />
                    <Route path='/galleries' element={<PrivateRoute><Galleries /></PrivateRoute>} />
                </Route>
                <Route path="*" element={<Signin />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App

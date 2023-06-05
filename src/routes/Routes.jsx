import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import Home from '../pages/home/Home'
import Cadastros from '../pages/cadastros/Cadastros'
import Cliente from '../pages/cliente/Cliente'
import Setor from '../pages/setor/Setor'
import DI from '../pages/di/DI'

export default function InjetaqRoutes({ children }) {
	return (
		<>
			<Router>
				<NavBar /> {children}
				<Routes>
					<Route
						path='/'
						element={<Home />}
					/>
					<Route
						path='/cadastros'
						element={<Cadastros />}
					/>
					<Route
						path='/cadastros/cliente'
						element={<Cliente />}
					/>
					<Route
						path='/cadastros/setor'
						element={<Setor />}
					/>
					<Route
						path='/cadastros/di'
						element={<DI />}
					/>
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

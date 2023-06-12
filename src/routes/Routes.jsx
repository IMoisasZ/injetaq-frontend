/** @format */

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from '../components/navBar/NavBar'
import Footer from '../components/footer/Footer'
import Home from '../pages/home/Home'
import Cadastros from '../pages/cadastros/Cadastros'
import Cliente from '../pages/cliente/Cliente'
import Supplier from '../pages/supplier/Supplier'
import Sector from '../pages/sector/Sector'
import DI from '../pages/di/DI'
import AlertaQualidade from '../pages/alertaQualidade/AlertaQualidade'

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
						path='/cadastros/fornecedor'
						element={<Supplier />}
					/>
					<Route
						path='/cadastros/setor'
						element={<Sector />}
					/>
					<Route
						path='/cadastros/di'
						element={<DI />}
					/>
					<Route
						path='/cadastros/alerta_qualidade'
						element={<AlertaQualidade />}
					/>
				</Routes>
				<Footer />
			</Router>
		</>
	)
}

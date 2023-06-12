/** @format */

import React from 'react'
import { Link } from 'react-router-dom'
import MyContainer from '../../components/container/Container'

const cadastros = [
	{ id: 1, namePage: 'Usuário', link: '/cadastros/usuario' },
	{ id: 2, namePage: 'Cliente', link: '/cadastros/cliente' },
	{ id: 3, namePage: 'Fornecedor', link: '/cadastros/fornecedor' },
	{ id: 4, namePage: 'Setor', link: '/cadastros/setor' },
	{ id: 5, namePage: 'DI', link: '/cadastros/di' },
	{
		id: 6,
		namePage: 'Alerta da Qualidade',
		link: '/cadastros/alerta_qualidade',
	},
	{ id: 7, namePage: 'RNC', link: '/cadastros/rnc' },
]

export default function Cadastros() {
	return (
		<MyContainer>
			<h1>Cadastros</h1>
			<div>
				<ul>
					{cadastros.map((page) => {
						return (
							<Link to={page.link}>
								<li key={page.id}>{page.namePage}</li>
							</Link>
						)
					})}
				</ul>
			</div>
		</MyContainer>
	)
}

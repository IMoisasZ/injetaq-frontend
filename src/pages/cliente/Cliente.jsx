import React, { useEffect, useState } from 'react'
import MyContainer from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import CheckBox from '../../components/checkBox/CheckBox'
import MyButton from '../../components/button/Button'
import api from '../../api/api'
import Table from '../../components/table/Table'
import ButtonTable from '../../components/button/ButtonTable'
import Message from '../../components/message/Message'
import style from './Cliente.module.css'

export default function Cliente() {
	const [id, setId] = useState('')
	const [description, setDescription] = useState('')
	const [activate, setActivate] = useState(true)
	const [message, setMessage] = useState('')
	const [listClients, setListClients] = useState([])
	const [nameButton, setNameButton] = useState('Cadastrar')

	// add or alter client
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (nameButton === 'Cadastrar') {
			try {
				await api.post(`/cliente/add`, {
					description,
					activate,
				})
				setMessage({ type: 'success', msg: 'Cliente incluído com sucesso!' })
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log({ error })
				error.response.data.erros === 'Validation error'
					? setMessage({ type: 'error', msg: 'Cliente já cadastrado!' })
					: setMessage({ type: 'error', msg: error.response.data.msg })
				console.log({ error })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		} else {
			try {
				await api.patch(`/cliente/update`, {
					id,
					description,
					activate,
				})
				setMessage({ type: 'alter', msg: 'Cliente alterado com sucesso!' })
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log({ error })
				error.response.data.erros === 'Validation error'
					? setMessage({ type: 'error', msg: 'Cliente já cadastrado!' })
					: setMessage({ type: 'error', msg: error.response.data.msg })
				console.log({ error })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		}
	}

	// clear fields
	const handleClear = () => {
		setId('')
		setDescription('')
		setActivate(true)
		setMessage('')
		allClientes()
		setNameButton('Cadastrar')
	}

	// data to do editing
	const handleEdit = (id) => {
		const dataEdit = listClients.find((cli) => cli.id === id)
		setId(id)
		setDescription(dataEdit.description)
		setActivate(dataEdit.activate)
		setNameButton('Editar')
	}

	// disable or enable a client
	const disableEnableCliente = async (data) => {
		await api.put(`/cliente/update`, {
			id: data.id,
			activate: !data.activate,
		})
		await allClientes()
	}

	// function to load all clients
	const allClientes = async () => {
		try {
			const response = await api.get(`/cliente/data`)
			setListClients(response.data)
		} catch (error) {
			setMessage(error.response.data.erros)
		}
	}

	// use efect to execute function all clients
	useEffect(() => {
		allClientes()
	})

	// header to table of clients
	const header = ['ID', 'Cliente', 'Ativo', 'Ações']

	return (
		<MyContainer>
			<h1 className={style.title}>Cliente</h1>
			<Form
				handleOnSubmit={handleSubmit}
				flexDirection='row'>
				<Input
					value={description}
					handleOnChange={(e) => setDescription(e.target.value)}
					label='Cliente'
					width='50%'
					margin='0 2% 0 0'
				/>
				<CheckBox
					nameCheckBox='Ativo?'
					value={activate}
					toggleOnChange={() => setActivate(!activate)}
					margin='0 2% 0 0'
				/>
				<MyButton
					nameBtn={nameButton}
					type='submit'
					backgroundColor={nameButton === 'Editar' && 'orange'}
				/>
			</Form>
			{message && <Message message={message} />}

			<Table
				header={header}
				width='67.5%'>
				{listClients.map((data) => {
					return (
						<tr key={data.id}>
							<td>{data.id}</td>
							<td>{data.description}</td>
							<td>{data.activate ? 'Sim' : 'Não'}</td>
							<div className={style.divBtn}>
								<td>
									<ButtonTable
										typeButton={data.activate ? 'checked' : 'unchecked'}
										handleOnClick={() => disableEnableCliente(data)}
										title={
											data.activate
												? `Clique para desativar o cliente ${data.description}!`
												: `Clique para ativar o cliente ${data.description}!`
										}
									/>
								</td>
								<td>
									<ButtonTable
										typeButton='edit'
										handleOnClick={() => handleEdit(data.id)}
										title={`Clique para editar o cliente ${data.description}!`}
									/>
								</td>
							</div>
						</tr>
					)
				})}
			</Table>
		</MyContainer>
	)
}

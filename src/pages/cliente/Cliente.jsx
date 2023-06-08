/** @format */

import React, { useEffect, useState } from 'react'
import MyContainer from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import CheckBox from '../../components/checkBox/CheckBox'
import MyButton from '../../components/button/Button'
import Modal from '../../components/modal/Modal'
import api from '../../api/api'
import Table from '../../components/table/Table'
import ButtonTable from '../../components/button/ButtonTable'
import Message from '../../components/message/Message'
import style from './Cliente.module.css'
import { all } from 'axios'

export default function Cliente({ handleModal }) {
	const [id, setId] = useState('')
	const [contactId, setContactId] = useState('')
	const [description, setDescription] = useState('')
	const [activate, setActivate] = useState(true)
	const [message, setMessage] = useState('')
	const [messageContact, setMessageContact] = useState('')
	const [listClients, setListClients] = useState([])
	const [nameButton, setNameButton] = useState('Cadastrar')
	const [listContactClients, setListContactClients] = useState([])
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [colorBtn, setColorBtn] = useState('contact')

	const user = 1

	// add or alter client
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (nameButton === 'Cadastrar') {
			try {
				await api.post(`/cliente/add`, {
					user_id: user,
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
					user_id: user,
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
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		}
	}

	// clear fields
	const handleClear = () => {
		setId('')
		setContactId('')
		setDescription('')
		setActivate(true)
		setMessage('')
		setMessageContact('')
		allClientes()
		allContactsClients()
		setNameButton('Cadastrar')
		setName('')
		setEmail('')
		setPhone('')
		setColorBtn('contact-add')
	}

	// data to do editing
	const handleEdit = (id) => {
		const dataEdit = listClients.find((cli) => cli.id === id)
		setId(id)
		setDescription(dataEdit.description)
		setActivate(dataEdit.activate)
		setNameButton('Editar')
	}

	const handleEditContact = (data) => {
		setId(data.client_id)
		setContactId(data.id)
		setName(data.name)
		setEmail(data.email)
		setPhone(data.phone)
		setColorBtn('contact-edit')
	}

	// disable or enable a client
	const disableEnableCliente = async (data) => {
		await api.put(`/cliente/update`, {
			id: data.id,
			activate: !data.activate,
		})
		await allClientes()
	}

	console.log(colorBtn)

	// function to load all clients
	const allClientes = async () => {
		try {
			const response = await api.get(`/cliente/data`)
			setListClients(response.data)
		} catch (error) {
			setMessage(error.response.data.erros)
		}
	}

	const allContactsClients = async () => {
		try {
			const response = await api.get(`/contact_client/data`)
			setListContactClients(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	// use efect to execute function all clients
	useEffect(() => {
		allClientes()
		allContactsClients()
	}, [])

	// function to see all contacts of client
	const handleContact = async (e, client_id) => {
		e.preventDefault()
		if (colorBtn === 'contact-add') {
			try {
				await api.post(`/contact_client/add`, {
					client_id,
					name,
					email,
					phone,
				})
				allContactsClients()
				setMessageContact({
					type: 'success',
					msg: 'Contato inserido com sucesso!',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessageContact({ type: 'error', msg: 'Contato já cadastrado!' })
					: setMessageContact({ type: 'error', msg: error.response.data.msg })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		} else {
			try {
				await api.patch(`/contact_client/update`, {
					id,
					name,
					email,
					phone,
				})
				allContactsClients()
				setMessageContact({
					type: 'edit',
					msg: 'Contato editado com sucesso!',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessageContact({ type: 'error', msg: 'Contato já cadastrado!' })
					: setMessageContact({ type: 'error', msg: error.response.data.msg })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		}
	}

	const handleDelete = async (id) => {
		try {
			await api.delete(`/contact_client/delete/${id}`)
			setMessageContact({
				type: 'success',
				msg: 'Contato deletado com sucesso!',
			})
			setTimeout(() => {
				handleClear()
			}, 2000)
		} catch (error) {
			console.log({ error })
		}
	}

	// header to table of clients
	const header = ['ID', 'Cliente', 'Ativo', 'Ações']

	// header to table of contacts clients
	const headerContacts = ['ID', 'Nome', 'Email', 'Telefone', 'Ações']

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
					width='53%'
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
				width='67.5%'
				numberColAction={3}>
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
								<td>
									<Modal
										cliente={data.description}
										titleModal='Contato Clientes'
										textModal=''
										width='100%'
										handleClear={handleClear}>
										<Form
											flexDirection='column'
											justifyContent='space-between'
											alignItems='center'
											width='100%'
											handleOnSubmit={(e) => handleContact(e, data.id)}>
											<div style={{ width: '100%' }}>
												<Input
													label='Cliente'
													disabled={true}
													value={data.description}
													width='100%'
												/>
												<section
													style={{
														display: 'flex',
														justifyContent: 'space-between',
														alignItems: 'center',
														width: '100%',
													}}>
													<Input
														label='Nome'
														disabled={false}
														value={name}
														handleOnChange={(e) => setName(e.target.value)}
														width='100%'
														margin='0 0.5% 0 0 '
													/>
													<Input
														label='Email'
														disabled={false}
														type='email'
														value={email}
														handleOnChange={(e) => setEmail(e.target.value)}
														width='100%'
														margin='0 0.5% 0 0 '
													/>
													<Input
														label='Telefone'
														disabled={false}
														value={phone}
														handleOnChange={(e) => setPhone(e.target.value)}
														width='100%'
													/>

													<ButtonTable
														typeButton={colorBtn}
														type='submit'
													/>
												</section>
											</div>
										</Form>
										<div style={{ width: '100%' }}>
											<Table header={headerContacts}>
												{listContactClients
													.filter((it) => it.client_id === data.id)
													.map((item) => {
														return (
															<tr key={item.id}>
																<td>{item.id}</td>
																<td>{item.name}</td>
																<td>{item.email}</td>
																<td>{item.phone}</td>
																<td>
																	<ButtonTable
																		typeButton='edit'
																		title={`Editar o contato ${item.name}`}
																		handleOnClick={() =>
																			handleEditContact(item)
																		}
																	/>
																</td>
																<td>
																	<ButtonTable
																		typeButton='delete'
																		title={`Deletar o Cliente ${item.name}`}
																		handleOnClick={() => handleDelete(item.id)}
																	/>
																</td>
															</tr>
														)
													})}
											</Table>
											{messageContact && <Message message={messageContact} />}
										</div>
									</Modal>
								</td>
							</div>
						</tr>
					)
				})}
			</Table>
		</MyContainer>
	)
}

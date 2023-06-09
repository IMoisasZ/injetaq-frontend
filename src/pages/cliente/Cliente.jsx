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
	const [colorBtn, setColorBtn] = useState('contact-add')
	const [activateContact, setActivateContact] = useState(true)

	const user = 1

	// add or alter client
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (nameButton === 'Cadastrar') {
			try {
				await api.post(`/client/add`, {
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
				await api.patch(`/client/update`, {
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
		setActivateContact(data.activate)
	}

	// disable or enable a client
	const disableEnableCliente = async (data) => {
		await api.put(`/client/update`, {
			id: data.id,
			activate: !data.activate,
		})
		allClientes()
	}

	// function to load all clients
	const allClientes = async () => {
		try {
			const response = await api.get(`/client/data`)
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
					activate: activateContact,
					main: true,
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
					id: contactId,
					name,
					email,
					phone,
					activate: activateContact,
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

	const handleDisableEnableContactClient = async (item) => {
		try {
			await api.put(`/contact_client/update`, {
				id: item.id,
				activate: !item.activate,
			})
			allContactsClients()
			handleClear()
		} catch (error) {
			console.log({ error })

			setMessageContact({ type: 'error', msg: error.response.data.erros })

			setTimeout(() => {
				handleClear()
			}, 2000)
		}
	}

	const handleMain = async (item) => {
		try {
			await api.put(`/contact_client/main/update`, {
				id: item.id,
				main: !item.main,
			})
			allContactsClients()
			handleClear()
		} catch (error) {
			console.log(error)

			setMessageContact({ type: 'error', msg: error.response.data.erros })

			setTimeout(() => {
				handleClear()
			}, 2000)
		}
	}

	// header to table of clients
	const header = ['ID', 'Cliente', 'Ativo', 'Ações']

	// header to table of contacts clients
	const headerContacts = [
		'ID',
		'Nome',
		'Email',
		'Telefone',
		'Principal',
		'Ativo',
		'Ações',
	]

	return (
		<MyContainer>
			<h1 className={style.title}>Cliente</h1>
			<Form
				handleOnSubmit={handleSubmit}
				flexDirection='row'
				width='100%'>
				<Input
					value={description}
					handleOnChange={(e) => setDescription(e.target.value)}
					label='Cliente'
					width='80%'
					margin='0 2% 0 0'
				/>
				<CheckBox
					nameCheckBox='Ativo?'
					value={activate}
					toggleOnChange={() => setActivate(!activate)}
					margin='0 2% 0 0'
					width='10%'
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
				width='100%'
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
										titleBtnModal='Contato dos clientes'
										typeBtnTable='contact'
										textModal=''
										width='100%'
										handleClear={handleClear}>
										<Form
											flexDirection='column'
											justifyContent='space-between'
											alignItems='center'
											width='100%'
											margin='1% 0 0 0'
											handleOnSubmit={(e) => handleContact(e, data.id)}>
											<Input
												label='Cliente'
												disabled={true}
												value={data.description}
												width='100%'
											/>
											<section className={style.sectionFormContact}>
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

												<CheckBox
													nameCheckBox='Ativo'
													value={activateContact}
													toggleOnChange={() =>
														setActivateContact(!activateContact)
													}
													width='10%'
													margin='0 0 0 2%'
												/>

												<ButtonTable
													typeButton={colorBtn}
													type='submit'
												/>
											</section>
										</Form>
										<div className={style.divTableContact}>
											<Table
												header={headerContacts}
												numberColAction={3}>
												{listContactClients
													.filter((it) => it.client_id === data.id)
													.map((item) => {
														return (
															<tr key={item.id}>
																<td>{item.id}</td>
																<td>{item.name}</td>
																<td>{item.email}</td>
																<td>{item.phone}</td>
																<td>{item.main ? 'Sim' : 'Não'}</td>
																<td>{item.activate ? 'Sim' : 'Não'}</td>
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
																		typeButton={
																			item.activate ? 'checked' : 'unchecked'
																		}
																		title={
																			item.activate
																				? `Clique aqui para desativar o contato ${item.name}`
																				: `Clique aqui para ativar o contato ${item.name}`
																		}
																		handleOnClick={() =>
																			handleDisableEnableContactClient(item)
																		}
																	/>
																</td>
																<td>
																	<ButtonTable
																		typeButton={item.main ? 'main' : 'not-main'}
																		title={
																			item.main
																				? `Clique aqui para tirar o contato ${item.name} de principal!`
																				: `Clique aqui para passar o contato ${item.name} para principal!`
																		}
																		handleOnClick={() => handleMain(item)}
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

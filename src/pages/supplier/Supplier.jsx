/** @format */

import React, { useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import CheckBox from '../../components/checkBox/CheckBox'
import Button from '../../components/button/Button'
import Table from '../../components/table/Table'
import ButtonTable from '../../components/button/ButtonTable'
import Modal from '../../components/modal/Modal'
import Message from '../../components/message/Message'
import api from '../../api/api'
import style from './Supplier.module.css'

export default function Supplier() {
	const [id, setId] = useState('')
	const [contactId, setContactId] = useState('')
	const [supplier, setSupplier] = useState('')
	const [activate, setActivate] = useState(true)
	const [nameBtn, setNameBtn] = useState('Cadastrar')
	const [listSuppliers, setListSuppliers] = useState([])
	const [message, setMessage] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [activateContact, setActivateContact] = useState(true)
	const [colorBtn, setColorBtn] = useState('contact-add')
	const [messageContact, setMessageContact] = useState('')
	const [listContactSupplier, setListContactSupplier] = useState([])

	const user = 1

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (nameBtn === 'Cadastrar') {
			try {
				await api.post(`/supplier/add`, {
					user_id: user,
					description: supplier,
					activate,
				})
				setMessage({ type: 'success', msg: 'Fornecedor incluído com sucesso!' })
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessage({ type: 'error', msg: 'Fornecedor já cadastrado!' })
					: setMessage({ type: 'error', msg: error.response.data.msg })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		} else {
			try {
				await api.patch(`/supplier/update`, {
					id,
					user_id: user,
					description: supplier,
					activate,
				})
				setMessage({ type: 'edit', msg: `Fornecedor editado com sucesso!` })
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessage({ type: 'error', msg: 'Fornecedor já cadastrado!' })
					: setMessage({ type: 'error', msg: error.response.data.msg })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		}
	}

	const allSuppliers = async () => {
		try {
			const response = await api.get(`/supplier/data`)
			setListSuppliers(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	const allContactSupplier = async () => {
		try {
			const response = await api.get(`/contact_supplier/data`)
			setListContactSupplier(response.data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		allSuppliers()
		allContactSupplier()
	}, [])

	const handleClear = () => {
		setId('')
		setContactId('')
		setSupplier('')
		setActivate(true)
		setNameBtn('Cadastrar')
		allSuppliers()
		setMessage('')
		setName('')
		setEmail('')
		setPhone('')
		setActivateContact(true)
		setColorBtn('contact-add')
		setMessageContact('')
		allContactSupplier()
	}

	const handleDisableEnableSupplier = async (data) => {
		try {
			await api.put(`/supplier/update`, {
				id: data.id,
				activate: !data.activate,
			})
			allSuppliers()
			handleClear()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEdit = (data) => {
		setId(data.id)
		setSupplier(data.description)
		setActivate(data.activate)
		setNameBtn('Editar')
	}

	const handleDisableEnableContact = async (id, activate) => {
		try {
			await api.put(`/contact_supplier/update`, {
				id,
				activate: !activate,
			})
			handleClear()
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditContact = (data) => {
		setId(data.supplier_id)
		setContactId(data.id)
		setName(data.name)
		setEmail(data.email)
		setPhone(data.phone)
		setActivateContact(data.activate)
		setColorBtn('contact-edit')
	}

	const handleSubmitContact = async (e, supplier_id) => {
		e.preventDefault()
		if (colorBtn === 'contact-add') {
			try {
				await api.post(`/contact_supplier/add`, {
					user_id: user,
					supplier_id,
					name,
					email,
					phone,
					activate: activateContact,
				})
				setMessageContact({
					type: 'success',
					msg: 'Contato incluído com sucesso!',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessageContact({
							type: 'error',
							msg: 'Fornecedor já cadastrado!',
					  })
					: setMessageContact({ type: 'error', msg: error.response.data.msg })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		} else {
			try {
				await api.patch(`/contact_supplier/update`, {
					id: contactId,
					user_id: user,
					supplier_id: id,
					name,
					email,
					phone,
					activate: activateContact,
				})
				setMessageContact({
					type: 'alter',
					msg: 'Contato alterado com sucesso!',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessageContact({
							type: 'error',
							msg: 'Fornecedor já cadastrado!',
					  })
					: setMessageContact({ type: 'error', msg: error.response.data.msg })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		}
	}

	const handleMain = () => {
		try {
		} catch (error) {
			console.log(error)
		}
	}

	const headerSupplier = ['ID', 'Fornecedor', 'Ativo', 'Ações']

	const headerContactSupplier = [
		'ID',
		'Nome',
		'Email',
		'Telefone',
		'Ativo',
		'Ações',
	]

	return (
		<Container>
			<h1 className={style.title}>Fornecedor</h1>
			<Form handleOnSubmit={(e) => handleSubmit(e)}>
				<Input
					disabled={false}
					label='Fornecedor'
					value={supplier}
					handleOnChange={(e) => setSupplier(e.target.value)}
					width='100%'
				/>
				<CheckBox
					nameCheckBox='Ativo'
					value={activate}
					toggleOnChange={() => setActivate(!activate)}
					width='10%'
				/>
				<Button
					nameBtn={nameBtn}
					type='submit'
					backgroundColor={nameBtn !== 'Cadastrar' && '#FFA500'}
				/>
			</Form>
			<Table
				header={headerSupplier}
				numberColAction={3}>
				{listSuppliers.map((it) => {
					return (
						<tr key={it.id}>
							<td>{it.id}</td>
							<td>{it.description}</td>
							<td>{it.activate ? 'Sim' : 'Não'}</td>
							<td>
								<ButtonTable
									typeButton={it.activate ? 'checked' : 'unchecked'}
									title={
										it.activate
											? `CLique aqui para desativar o fornecedor ${it.description}`
											: `Clique aqui para ativar o fornecedor ${it.description}`
									}
									handleOnClick={() => handleDisableEnableSupplier(it)}
								/>
							</td>
							<td>
								<ButtonTable
									typeButton='edit'
									title={`Clique aqui para editar o fornecedor ${it.description}`}
									handleOnClick={() => handleEdit(it)}
								/>
							</td>
							<td>
								<Modal
									titleModal='Contato Fornecedor'
									typeBtnTable='contact'
									textModal=''
									width='100%'
									handleClear={handleClear}
									titleBtnModal={`Verificar os contatos do fornecedor ${it.description}`}>
									<Form
										margin='1% 0 0 0'
										flexDirection='column'
										handleOnSubmit={(e) => handleSubmitContact(e, it.id)}>
										<Input
											disabled={true}
											label='Fornecedor'
											value={it.description}
											width='100%'
										/>
										<section className={style.sectionFormContact}>
											<Input
												disabled={false}
												label='Nome'
												value={name}
												handleOnChange={(e) => setName(e.target.value)}
												width='100%'
												margin='0 0.5% 0 0'
											/>
											<Input
												disabled={false}
												label='Email'
												value={email}
												handleOnChange={(e) => setEmail(e.target.value)}
												width='100%'
												margin='0 0.5% 0 0'
											/>
											<Input
												disabled={false}
												label='Telefone'
												value={phone}
												handleOnChange={(e) => setPhone(e.target.value)}
												width='100%'
											/>
											<CheckBox
												value={activateContact}
												toggleOnChange={() =>
													setActivateContact(!activateContact)
												}
												nameCheckBox='Ativo'
												width='10%'
												margin='0 1% 0 2%'
											/>
											<ButtonTable
												typeButton={colorBtn}
												title={
													colorBtn === 'contact-add'
														? 'Clique para cadastrar o contato!'
														: 'Clique para editar o contato!'
												}
												type='submit'
											/>
										</section>
										<Table
											header={headerContactSupplier}
											width='100%'>
											{listContactSupplier
												.filter((item) => item.supplier_id === it.id)
												.map((data) => {
													return (
														<tr key={data.id}>
															<td>{data.id}</td>
															<td>{data.name}</td>
															<td>{data.email}</td>
															<td>{data.phone}</td>
															<td>{data.activate ? 'Sim' : 'Não'}</td>
															<td>
																<ButtonTable
																	typeButton={
																		data.activate ? 'checked' : 'unchecked'
																	}
																	title={
																		data.activate
																			? `Clique aqui para desativar o contato ${data.name}`
																			: `Clique aqui para ativar o contato ${data.name}`
																	}
																	handleOnClick={() =>
																		handleDisableEnableContact(
																			data.id,
																			data.activate
																		)
																	}
																/>
															</td>
															<td>
																<ButtonTable
																	typeButton='edit'
																	title={`Clique aqui para editar o contato ${data.name}`}
																	handleOnClick={() => handleEditContact(data)}
																/>
															</td>
															<td>
																<ButtonTable
																	typeButton={data.main ? 'main' : 'not-main'}
																	title={
																		data.main
																			? `Clique aqui para tirar o contato ${data.name} de principal!`
																			: `Clique aqui para passar o contato ${data.name} para principal!`
																	}
																	handleOnClick={() => handleMain(data)}
																/>
															</td>
														</tr>
													)
												})}
										</Table>
										{messageContact && (
											<Message
												message={messageContact}
												width='50%'
											/>
										)}
									</Form>
								</Modal>
							</td>
						</tr>
					)
				})}
			</Table>
			{message && <Message message={message} />}
		</Container>
	)
}

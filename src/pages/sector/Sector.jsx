/** @format */

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
import Modal from '../../components/modal/Modal'
import style from './Sector.module.css'

export default function Setor() {
	const [id, setId] = useState('')
	const [responsableId, setResponsableId] = useState('')
	const [description, setDescription] = useState('')
	const [activate, setActivate] = useState(true)
	const [message, setMessage] = useState('')
	const [listSetores, setListSetores] = useState([])
	const [nameButton, setNameButton] = useState('Cadastrar')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [activateResponsable, setActivateResponsable] = useState(true)
	const [listResponsables, setListResponsables] = useState([])
	const [messageResponsable, setMessageResponsable] = useState('')
	const [colorBtn, setColorBtn] = useState('contact-add')
	const [main, setMain] = useState(false)

	const user = 1

	// add or alter setor
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (nameButton === 'Cadastrar') {
			try {
				await api.post(`/sector/add`, {
					user_id: user,
					description,
					activate,
				})
				setMessage({ type: 'success', msg: 'Setor incluído com sucesso!' })
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log({ error })
				error.response.data.erros === 'Validation error'
					? setMessage({ type: 'error', msg: 'Setor já cadastrado!' })
					: setMessage({ type: 'error', msg: error.response.data.msg })
				console.log({ error })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		} else {
			try {
				await api.patch(`/sector/update`, {
					id,
					user_id: user,
					description,
					activate,
				})
				setMessage({ type: 'alter', msg: 'Setor alterado com sucesso!' })
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log({ error })
				error.response.data.erros === 'Validation error'
					? setMessage({ type: 'error', msg: 'Setor já cadastrado!' })
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
		allSetores()
		setNameButton('Cadastrar')
		setName('')
		setEmail('')
		setActivateResponsable(true)
		allResponsablesSector()
		setMessageResponsable('')
		setResponsableId('')
		setColorBtn('contact-add')
		setMain(false)
	}

	// data to do editing
	const handleEdit = (id) => {
		const dataEdit = listSetores.find((set) => set.id === id)
		setId(id)
		setDescription(dataEdit.description)
		setActivate(dataEdit.activate)
		setNameButton('Editar')
	}

	// disable or enable a setor
	const disableEnableSetor = async (data) => {
		await api.put(`/sector/update`, {
			id: data.id,
			activate: !data.activate,
		})
		await allSetores()
	}

	// function to load all setores
	const allSetores = async () => {
		try {
			const response = await api.get(`/sector/data`)
			setListSetores(response.data)
		} catch (error) {
			setMessage(error.response.data.erros)
		}
	}

	// function to load all responsables
	const allResponsablesSector = async () => {
		try {
			const responsable = await api.get(`/responsable_sector/data`)
			setListResponsables(responsable.data)
		} catch (error) {
			console.log(error)
		}
	}

	// use efect to execute function all setores
	useEffect(() => {
		allSetores()
		allResponsablesSector()
	}, [])

	// header to table of setores
	const header = ['ID', 'Setor', 'Ativo', 'Ações']

	const handleSubmitResponsables = async (e, sector_id) => {
		e.preventDefault()
		if (colorBtn === 'contact-add') {
			try {
				const response = await api.post(`/responsable_sector/add`, {
					user_id: user,
					sector_id,
					name,
					email,
					activate: activateResponsable,
					main: true,
				})
				setMessageResponsable({
					type: 'success',
					msg: 'Responsável incluído com sucesso!',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessageResponsable({
							type: 'error',
							msg: 'Contato já cadastrado!',
					  })
					: setMessageResponsable({
							type: 'error',
							msg: error.response.data.msg,
					  })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		} else {
			try {
				await api.patch(`/responsable_sector/update`, {
					id: responsableId,
					sector_id: id,
					name,
					email,
					activate: activateResponsable,
					main,
				})
				setMessageResponsable({
					type: 'edit',
					msg: 'Responsável alterado com sucesso!',
				})
				setTimeout(() => {
					handleClear()
				}, 2000)
			} catch (error) {
				console.log(error)
				error.response.data.erros === 'Validation error'
					? setMessageResponsable({
							type: 'error',
							msg: 'Contato já cadastrado!',
					  })
					: setMessageResponsable({
							type: 'error',
							msg: error.response.data.msg,
					  })
				setTimeout(() => {
					handleClear()
				}, 2000)
			}
		}
	}

	// disable or enable responsable
	const toogleResponsable = async (id, activate) => {
		try {
			await api.put(`/responsable_sector/update`, {
				id,
				activate: !activate,
			})
			allResponsablesSector()
			handleClear()
		} catch (error) {
			console.log(error)
			setMessageResponsable({ type: 'error', msg: error.response.data.erros })
			setTimeout(() => {
				handleClear()
			}, 2000)
		}
	}

	// edit responsable
	const handleEditResponsable = (data) => {
		setId(data.sector_id)
		setResponsableId(data.id)
		setName(data.name)
		setEmail(data.email)
		setActivateResponsable(data.activate)
		setColorBtn('contact-edit')
	}

	const handleMain = async (id, main) => {
		try {
			await api.put(`/responsable_sector/main/update`, {
				id,
				main,
			})
			// allResponsablesSector()
			handleClear()
		} catch (error) {
			console.log(error)
			setMessageResponsable({ type: 'error', msg: error.response.data.erros })
			setTimeout(() => {
				handleClear()
			}, 2000)
		}
	}

	// header to table of responsables sector
	const headerResponsable = [
		'ID',
		'Nome',
		'Email',
		'Principal',
		'Ativo',
		'Ações',
	]
	return (
		<MyContainer>
			<h1 className={style.title}>Setor</h1>
			<Form
				handleOnSubmit={handleSubmit}
				flexDirection='row'>
				<Input
					value={description}
					handleOnChange={(e) => setDescription(e.target.value)}
					label='Setor'
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
				{listSetores.map((data) => {
					return (
						<tr key={data.id}>
							<td>{data.id}</td>
							<td>{data.description}</td>
							<td>{data.activate ? 'Sim' : 'Não'}</td>
							<div className={style.divBtn}>
								<td>
									<ButtonTable
										typeButton={data.activate ? 'checked' : 'unchecked'}
										handleOnClick={() => disableEnableSetor(data)}
										title={
											data.activate
												? `Clique para desativar o setor ${data.description}!`
												: `Clique para ativar o setor ${data.description}!`
										}
									/>
								</td>
								<td>
									<ButtonTable
										typeButton='edit'
										handleOnClick={() => handleEdit(data.id)}
										title={`Clique para editar o setor ${data.description}!`}
									/>
								</td>
								<td>
									<Modal
										titleModal='Responsáveis Setor'
										textModal=''
										width='100%'
										handleClear={handleClear}>
										<Form
											margin='1% 0 0 0'
											flexDirection='column'
											handleOnSubmit={(e) =>
												handleSubmitResponsables(e, data.id)
											}>
											<Input
												disabled={true}
												label='Setor'
												value={data.description}
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
													type='email'
													width='100%'
												/>
												<CheckBox
													nameCheckBox='Ativo'
													value={activateResponsable}
													toggleOnChange={() =>
														setActivateResponsable(!activateResponsable)
													}
													width='10%'
													margin='0 3%'
												/>
												<ButtonTable
													typeButton={
														colorBtn === 'contact-add'
															? 'contact-add'
															: 'contact-edit'
													}
													type='submit'
												/>
											</section>
										</Form>
										<Table
											header={headerResponsable}
											numberColAction={3}>
											{listResponsables
												.filter((it) => it.sector_id === data.id)
												.map((item) => {
													return (
														<tr key={item.id}>
															<td>{item.id}</td>
															<td>{item.name}</td>
															<td>{item.email}</td>
															<td>{item.main ? 'Sim' : 'Não'}</td>
															<td>{item.activate ? 'Sim' : 'Não'}</td>
															<td>
																<ButtonTable
																	typeButton={
																		item.activate ? 'checked' : 'unchecked'
																	}
																	title={
																		item.activate
																			? `Clique para desativar o responsavel ${item.name}`
																			: `Clique para ativar o responsavel ${item.name}`
																	}
																	handleOnClick={() =>
																		toogleResponsable(item.id, item.activate)
																	}
																/>
															</td>
															<td>
																<ButtonTable
																	typeButton='edit'
																	title={`Clique para editar o responsavel ${item.name}`}
																	handleOnClick={() =>
																		handleEditResponsable(item)
																	}
																/>
															</td>
															<td>
																<ButtonTable
																	typeButton={item.main ? 'main' : 'not-main'}
																	title={
																		item.amin
																			? `Clique para tirar o responsável ${item.name} de PRINCIPAL`
																			: `Clique para colocar o responsável ${item.name} como PRINCIPAL`
																	}
																	handleOnClick={() =>
																		handleMain(item.id, !item.main)
																	}
																/>
															</td>
														</tr>
													)
												})}
										</Table>
										{messageResponsable && (
											<Message message={messageResponsable} />
										)}
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

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
import style from './Setor.module.css'

export default function Setor() {
	const [id, setId] = useState('')
	const [description, setDescription] = useState('')
	const [activate, setActivate] = useState(true)
	const [message, setMessage] = useState('')
	const [listSetores, setListSetores] = useState([])
	const [nameButton, setNameButton] = useState('Cadastrar')

	// add or alter setor
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (nameButton === 'Cadastrar') {
			try {
				await api.post(`/setor/add`, {
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
				await api.patch(`/setor/update`, {
					id,
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
		await api.put(`/setor/update`, {
			id: data.id,
			activate: !data.activate,
		})
		await allSetores()
	}

	// function to load all setores
	const allSetores = async () => {
		try {
			const response = await api.get(`/setor/data`)
			setListSetores(response.data)
		} catch (error) {
			setMessage(error.response.data.erros)
		}
	}

	// use efect to execute function all setores
	useEffect(() => {
		allSetores()
	})

	// header to table of setores
	const header = ['ID', 'Setor', 'Ativo', 'Ações']

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
							</div>
						</tr>
					)
				})}
			</Table>
		</MyContainer>
	)
}

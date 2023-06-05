import React, { useEffect, useState } from 'react'
import MyContainer from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import Select from '../../components/select/Select'
import MenuItem from '@mui/material/MenuItem'
import Message from '../../components/message/Message'
import MyButton from '../../components/button/Button'
import { FaSave } from 'react-icons/fa'
import { BiTimer } from 'react-icons/bi'
import { BsBoxFill } from 'react-icons/bs'
import { MdAssignmentAdd } from 'react-icons/md'
import { FiList } from 'react-icons/fi'
import { FaExchangeAlt } from 'react-icons/fa'
import style from './DI.module.css'

import api from '../../api/api'

export default function DI() {
	const [di, setDi] = useState('')
	const [op, setOp] = useState('')
	const [description, setDescription] = useState('')
	const [number, setNumber] = useState('')
	const [partName, setPartName] = useState('')
	const [partNumber, setPartNumber] = useState('')
	const [orderNumber, setOrderNumber] = useState('')
	const [budget, setBudget] = useState('')
	const [statusDiId, setStatusDiId] = useState('')
	const [cliente, setCliente] = useState('')
	const [listClients, setListClients] = useState([])
	const [previusStartDate, setPreviusStartDate] = useState('')
	const [labelPreviusStartDate, setLabelPreviusStartDate] = useState('')
	const [previsuEndDate, setPreviusEndDate] = useState('')
	const [labelPreviusEndDate, setLabelPreviusEndDate] = useState('')
	const [message, setMessage] = useState('')
	const [listDi, setListDi] = useState([])
	const [lastDiAdd, setLastDiAdd] = useState('')

	const allClients = async () => {
		try {
			const response = await api.get(`/cliente/data`)
			setListClients(response.data)
		} catch (error) {
			console.log({ error })
		}
	}

	const lastDi = async () => {
		const response = await api.get(`/di/data`)
		setListDi(response.data)
	}

	useEffect(() => {
		allClients()
		lastDi()
	}, [])

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await api.post(`/di/add`, {
				di: 9999999,
				op,
				description,
				number,
				partNumber,
				partName,
				client_id: cliente,
				previusStartData: previusStartDate,
				previsuEndData: previsuEndDate,
				orderNumber,
				budget,
				status_di_id: 1,
			})
			setMessage({ type: 'success', msg: 'DI incluída com sucesso!' })
		} catch (error) {
			console.log(error)
			setMessage({ type: 'error', msg: error.response.data.msg })
		}
		setTimeout(() => {
			setMessage('')
		}, 2000)
	}

	return (
		<MyContainer>
			<h1 className={style.title}>DI</h1>
			<Form
				flexDirection='column'
				handleOnSubmit={(e) => handleSubmit(e)}>
				<section className={style.sectionButtons}>
					<button
						className={style.btn}
						type='submit'
						title='Salvar'>
						<FaSave className={style.icon} />
					</button>

					<button
						className={style.btn}
						type='button'
						title='Horas previstas'>
						<BiTimer className={style.icon} />
					</button>
					<button
						className={style.btn}
						type='button'
						title='Matéria prima/Serviço previstas'>
						<BsBoxFill className={style.icon} />
					</button>
					<button
						className={style.btn}
						type='button'
						title='Comentários'>
						<MdAssignmentAdd className={style.icon} />
					</button>
					<button
						className={style.btn}
						type='button'
						title='Indice de DI'>
						<FiList className={style.icon} />
					</button>
					<button
						className={style.btn}
						type='button'
						title='Alterar status da DI'>
						<FaExchangeAlt className={style.icon} />
					</button>
				</section>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
						margin: '0 0 1% 0',
					}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'flex-start',
							justifyContent: 'flex-start',
							width: '100%',
						}}>
						<Input
							label='DI'
							type='number'
							disabled={true}
							value={di}
							width='30%'
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							width: '100%',
						}}>
						<Input
							label='Número do pedido'
							type='text'
							disabled={true}
							value={orderNumber}
							width='30%'
						/>
						<Input
							label='Número do orçamento'
							type='text'
							disabled={true}
							value={budget}
							width='30%'
						/>
						<Input
							label='Status DI'
							type='text'
							disabled={true}
							value={statusDiId}
							width='30%'
						/>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
						margin: '0 0 1% 0',
					}}>
					<Input
						label='OP'
						type='text'
						disabled={false}
						value={op}
						width='100%'
						handleOnChange={(e) => setOp(e.currentTarget.value)}
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Descrição'
						type='text'
						disabled={false}
						value={description}
						width='100%'
						handleOnChange={(e) => setDescription(e.currentTarget.value)}
					/>
				</div>
				<div
					style={{
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between',
						margin: '0 0 1% 0',
					}}>
					<Input
						label='Número'
						type='text'
						disabled={false}
						value={number}
						width='100%'
						handleOnChange={(e) => setNumber(e.currentTarget.value)}
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Nome da peça'
						type='text'
						disabled={false}
						value={partName}
						width='100%'
						handleOnChange={(e) => setPartName(e.currentTarget.value)}
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Número da peça'
						type='text'
						disabled={false}
						value={partNumber}
						width='100%'
						handleOnChange={(e) => setPartNumber(e.currentTarget.value)}
					/>
				</div>
				<div style={{ display: 'flex', width: '100%' }}>
					<Select
						label='Cliente'
						value={cliente}
						handleOnChange={(e) => setCliente(e.target.value)}
						width='30%'
						margin='0 0.5% 0 0'>
						{listClients.map((item) => {
							return (
								<MenuItem
									key={item.id}
									value={item.id}>
									{item.description}
								</MenuItem>
							)
						})}
					</Select>

					<Input
						label={labelPreviusStartDate}
						type='date'
						disabled={false}
						value={previusStartDate}
						width='20%'
						margin='0 0.5% 0 0'
						handleOnChange={(e) => setPreviusStartDate(e.currentTarget.value)}
						handleOnFocus={() =>
							setLabelPreviusStartDate('Data de início (previsão)')
						}
						handleOnBlur={() => setLabelPreviusStartDate('')}
					/>
					<Input
						label={labelPreviusEndDate}
						type='date'
						disabled={false}
						value={previsuEndDate}
						width='20%'
						handleOnChange={(e) => setPreviusEndDate(e.currentTarget.value)}
						handleOnFocus={() =>
							setLabelPreviusEndDate('Data de término (previsão)')
						}
						handleOnBlur={() => setLabelPreviusEndDate('')}
					/>
				</div>
				{message && <Message message={message} />}
			</Form>
		</MyContainer>
	)
}

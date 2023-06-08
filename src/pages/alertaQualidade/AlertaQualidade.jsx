/** @format */

import React, { useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import MySelect from '../../components/select/Select'
import { MenuItem } from '@mui/material'
import TextArea from '../../components/textArea/TextArea'
import api from '../../api/api'

export default function AlertaQualidade() {
	const [numberAlert, setNumberAlert] = useState('')
	const [date, setDate] = useState('')
	const [status, setStatus] = useState('')
	const [di, setDi] = useState('')
	const [listDi, setListDi] = useState([])
	const [op, setOp] = useState('')
	const [descriptionDi, setDescriptionDi] = useState('')
	const [number, setNumber] = useState('')
	const [partName, setPartName] = useState('')
	const [partNumber, setPartNumber] = useState('')
	const [client, setClient] = useState('')
	const [responsable, setresponsable] = useState('')

	// download all DI's included
	const allDis = async () => {
		try {
			const response = await api.get(`/di/data`)
			setListDi(response.data)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		allDis()
	}, [])

	// load data of DI's
	useEffect(() => {
		if (di) {
			const dataDi = listDi.find((item) => item.id === di)
			setOp(dataDi.op)
			setDescriptionDi(dataDi.description)
			setPartName(dataDi.partName)
			setPartNumber(dataDi.partNumber)
			setNumber(dataDi.number)
			setClient(dataDi.cliente.description)
		}
	}, [di, listDi])

	// include alert
	const handleSubmit = (e) => {
		try {
			e.preventDefault()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<Container>
			<h1 style={{ textAlign: 'center' }}>Alerta da Qualidade</h1>
			<Form
				handleOnSubmit={handleSubmit}
				flexDirection='column'>
				<section
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						width: '100%',
						margin: '0 0 1% 0',
					}}>
					<Input
						label='Numero Alerta'
						disabled={true}
						value={numberAlert}
						margin='0 0.5% 0 0'
						width='10%'
					/>
					<Input
						label='Data de Emissão'
						disabled={true}
						value={date}
						margin='0 0.5% 0 0'
						width='10%'
					/>
					<Input
						label='Status Alerta'
						disabled={true}
						value={status}
						width='15%'
					/>
				</section>
				<section
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
						margin: '0 0 1% 0',
					}}>
					<MySelect
						label='DI'
						value={di}
						handleOnChange={(e) => setDi(e.target.value)}
						width='10%'
						margin='0 0.5% 0 0'>
						{listDi.map((item) => {
							return (
								<MenuItem
									key={item.id}
									value={item.id}>
									{item.di}
								</MenuItem>
							)
						})}
					</MySelect>
					<Input
						label='OP'
						disabled={true}
						value={op}
						width='10%'
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Descrição'
						disabled={true}
						value={descriptionDi}
						width='60%'
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Numero'
						disabled={true}
						value={number}
						width='20%'
					/>
				</section>
				<section
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
						margin: '0 0 1% 0',
					}}>
					<Input
						label='Nome da peça'
						disabled={true}
						value={partName}
						width='40%'
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Numero da peça'
						disabled={true}
						value={partNumber}
						width='40%'
						margin='0 0.5% 0 0'
					/>
					<Input
						label='Cliente'
						disabled={true}
						value={client}
						width='20%'
					/>
				</section>
				<section
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						alignItems: 'center',
						width: '100%',
					}}>
					<MySelect
						label='Responsáveis'
						value={responsable}
						handleOnChange={(e) => setresponsable(e.target.value)}
						width='30%'>
						<MenuItem>Responsáveis</MenuItem>
					</MySelect>
				</section>
				<TextArea />
			</Form>
		</Container>
	)
}

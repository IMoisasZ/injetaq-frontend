/** @format */

import React, { useEffect, useState } from 'react'
import Container from '../../components/container/Container'
import Form from '../../components/form/Form'
import Input from '../../components/input/Input'
import MySelect from '../../components/select/Select'
import { MenuItem } from '@mui/material'
import TextArea from '../../components/textArea/TextArea'
import RadioButton from '../../components/radioButton/RadioButton'
import Modal from '../../components/modal/Modal'
import api from '../../api/api'
import style from './QualityAlert.module.css'

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
	const [contact, setContact] = useState('')
	const [email, setEmail] = useState('')
	const [radioButton, setRadioButton] = useState('')
	const [listClient, setListClient] = useState([])
	const [listSupplier, setListSupplier] = useState([])
	const [listSector, setListSector] = useState([])
	const [file, setFile] = useState('')
	const [descriptionFile, setDescriptionFile] = useState('')
	const [listImg, setListImg] = useState([])

	// download all DI's included
	const allDis = async () => {
		try {
			const response = await api.get(`/di/data?alert${true}`)
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
			setClient(dataDi.Client.description)
		}
	}, [di, listDi])

	useEffect(() => {
		let dataResponsable = ''
		if (responsable) {
			if (radioButton === 'cliente') {
				dataResponsable = listClient.find((it) => it.id === responsable)
				setContact(dataResponsable.ContactClients[0].name)
				setEmail(dataResponsable.ContactClients[0].email)
			} else if (radioButton === 'fornecedor') {
				dataResponsable = listSupplier.find((it) => it.id === responsable)
				setContact(dataResponsable.contact_suppliers[0].name)
				setEmail(dataResponsable.contact_suppliers[0].email)
			} else {
				dataResponsable = listSector.find((it) => it.id === responsable)
				setContact(dataResponsable.responsable_sectors[0].name)
				setEmail(dataResponsable.responsable_sectors[0].email)
			}
		}
	}, [responsable, radioButton, listClient, listSector, listSupplier])

	// include alert
	const handleSubmit = (e) => {
		try {
			e.preventDefault()
		} catch (error) {
			console.log(error)
		}
	}

	const radio = [
		{
			value: 'cliente',
			label: 'Cliente',
		},
		{
			value: 'fornecedor',
			label: 'Fornecedor',
		},
		{
			value: 'setor',
			label: 'Setor',
		},
	]

	const dataRadioButton = async (radioBtn) => {
		const storageClient = localStorage.getItem('clients')
		const storageSupplier = localStorage.getItem('supplier')
		const storageSector = localStorage.getItem('sector')
		switch (radioBtn) {
			case 'cliente':
				if (storageClient) {
					setListClient(JSON.parse(storageClient))
				} else {
					const { data } = await api.get(`/client/data`)
					setListClient(data)
					localStorage.setItem('clients', JSON.stringify(data))
				}
				break
			case 'fornecedor':
				if (storageSupplier) {
					setListSupplier(JSON.parse(storageSupplier))
				} else {
					const { data } = await api.get(`/supplier/data`)
					setListSupplier(data)
					localStorage.setItem('supplier', JSON.stringify(data))
				}
				break
			case 'setor':
				if (storageSector) {
					setListSector(JSON.parse(storageSector))
				} else {
					const { data } = await api.get(`/sector/data`)
					setListSector(data)
					localStorage.setItem('sector', JSON.stringify(data))
				}
				break

			default:
				break
		}
	}

	const handleRadioButton = (e) => {
		const radioBtn = e.target.value
		dataRadioButton(radioBtn)
		setRadioButton(radioBtn)
	}

	const handleImage = async () => {
		try {
			const data = new FormData()
			data.append('file', file)
			data.append('alert_id', null)
			data.append('rnc_id', null)
			data.append('description', descriptionFile)
			await api.post(`/images/add`, data)
			allImages()
		} catch (error) {
			console.log(error)
		}
	}

	const allImages = async () => {
		try {
			const response = await api.get(`/images/data`)
			console.log(response.data)
			setListImg(response.data)
		} catch (error) {
			throw error
		}
	}

	useState(() => {
		allImages()
	}, [])

	const handleClear = () => {}

	return (
		<Container>
			<h1 style={{ textAlign: 'center', margin: '0' }}>Alerta da Qualidade</h1>
			<Form
				handleOnSubmit={handleSubmit}
				flexDirection='column'>
				<section
					style={{
						display: 'flex',
						justifyContent: 'flex-end',
						alignItems: 'center',
						width: '100%',
						margin: '0 0 0 0',
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
						margin: '0.5% 0 0% 0',
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
						margin: '0.5% 0 0% 0',
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
						justifyContent: 'space-between',
						alignItems: 'center',
						width: '100%',
						margin: '0.5% 0 0 0',
					}}>
					<div
						style={{
							width: '100%',
							margin: '0 0.5% 0 0',
							border: '1px solid #c0c0c0',
							borderRadius: '0.3em',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}>
						<RadioButton
							width='100%'
							options={radio}
							nameRadioGroup={`Causador - ${radioButton.toUpperCase()}`}
							defaultValue=''
							handleOnChange={(e) => handleRadioButton(e)}
						/>
					</div>
					<MySelect
						label={
							radioButton === 'cliente'
								? 'Cliente'
								: radioButton === 'fornecedor'
								? 'Fornecedor'
								: 'Setor'
						}
						value={responsable}
						handleOnChange={(e) => setresponsable(e.target.value)}
						width='100%'
						margin='0 0.5% 0 0'>
						{radioButton === 'cliente'
							? listClient.map((it) => {
									return (
										<MenuItem
											key={it.id}
											value={it.id}>
											{it.description}
										</MenuItem>
									)
							  })
							: radioButton === 'fornecedor'
							? listSupplier.map((it) => {
									return (
										<MenuItem
											key={it.id}
											value={it.id}>
											{it.description}
										</MenuItem>
									)
							  })
							: radioButton === 'setor'
							? listSector.map((it) => {
									return (
										<MenuItem
											key={it.id}
											value={it.id}>
											{it.description}
										</MenuItem>
									)
							  })
							: ''}
					</MySelect>
					<Input
						width='100%'
						margin='0 0.5% 0 0'
						disabled={true}
						value={contact}
						label={
							radioButton === 'cliente' || radioButton === 'fornecedor'
								? 'Contato'
								: radioButton === 'setor'
								? 'Responsável'
								: ''
						}
					/>
					<Input
						width='100%'
						disabled={true}
						value={email}
						label='Email'
					/>
				</section>
				<section style={{ width: '100%' }}>
					<TextArea
						margin='0.5% 0 0 0'
						label='Descrição da alerta'
					/>
				</section>

				<section className={style.sectionForm}>
					<form
						onSubmit={handleImage}
						encType='multipart/form-data'
						className={style.formImg}>
						<div
							style={{
								display: 'flex',
								flexDirection: 'column',
								width: '100%',
							}}>
							<p>Incluir Imagens</p>
							<input
								name='file'
								onChange={(e) => setFile(e.target.files[0])}
								type='file'
							/>

							<Input
								disabled={false}
								value={descriptionFile}
								handleOnChange={(e) => setDescriptionFile(e.target.value)}
								width='40%'
								margin='0.5% 0 0 0'
							/>
						</div>
						<button onClick={handleImage}>Incluir Imagens</button>
					</form>

					<Modal
						typeBtnTable='edit'
						handleClear={handleClear}
						titleModal='Images da alerta'
						textModal=''
						fullModal={false}>
						<div className={style.divModal}>
							{listImg.map((i) => {
								return (
									<div className={style.containerImg}>
										<img
											className={style.img}
											src={`${i.url_default}${i.name}`}
											alt='img'
										/>
										<p className={style.textImg}>{i.description}</p>
									</div>
								)
							})}
						</div>
					</Modal>
				</section>
			</Form>
		</Container>
	)
}

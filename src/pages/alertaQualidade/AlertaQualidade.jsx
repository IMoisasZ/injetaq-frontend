/** @format */

import React, { useState } from 'react'
import Container from '../../components/container/Container'
import Input from '../../components/input/Input'
import MySelect from '../../components/select/Select'
import { MenuItem } from '@mui/material'
import TextArea from '../../components/textArea/TextArea'

export default function AlertaQualidade() {
	const [numberAlert, setNumberAlert] = useState('')
	const [status, setStatus] = useState('')
	const [di, setDi] = useState('')
	const [responsable, setresponsable] = useState('')
	return (
		<Container>
			<h1>Alerta da Qualidade</h1>
			<section>
				<Input
					label='Numero Alerta'
					disabled={true}
					value={numberAlert}
				/>
				<Input
					label='Data de Emissão'
					disabled={true}
					value={numberAlert}
				/>
				<Input
					label='Status Alerta'
					disabled={true}
					value={numberAlert}
				/>
				<MySelect
					label='DI'
					value={di}
					handleOnChange={(e) => setDi(e.target.value)}>
					<MenuItem>DI's</MenuItem>
				</MySelect>
				<Input
					label='OP'
					disabled={true}
					value={numberAlert}
				/>
				<MySelect
					label='Responsáveis'
					value={responsable}
					handleOnChange={(e) => setresponsable(e.target.value)}>
					<MenuItem>Responsáveis</MenuItem>
				</MySelect>
				<TextArea />
			</section>
		</Container>
	)
}

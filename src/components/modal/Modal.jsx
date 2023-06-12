/** @format */

import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ButtonTable from '../button/ButtonTable'

export default function FormDialog({
	cliente,
	titleModal,
	textModal = 'Write the text about the modal',
	children,
	width = '100%',
	typeBtnTable = 'contact',
	handleClear,
	titleBtnModal,
}) {
	console.log(typeBtnTable)
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
		handleClear()
	}

	return (
		<div style={{ width }}>
			<ButtonTable
				handleOnClick={handleClickOpen}
				typeButton={typeBtnTable}
				title={titleBtnModal}
			/>
			<Dialog
				open={open}
				onClose={handleClose}
				fullWidth={true}
				maxWidth='lg'>
				<DialogTitle>{titleModal}</DialogTitle>
				<DialogContent>
					<DialogContentText>{textModal}</DialogContentText>
					{children}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Sair</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

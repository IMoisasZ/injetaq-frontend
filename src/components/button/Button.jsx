import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

export default function MyButton({
	variant = 'contained',
	nameBtn = 'name btn',
	handleOnClick = null,
	type = 'button',
	backgroundColor,
}) {
	return (
		<Stack
			spacing={2}
			direction='row'>
			<Button
				style={{ backgroundColor }}
				variant={variant}
				onClick={handleOnClick}
				type={type}>
				{nameBtn}
			</Button>
		</Stack>
	)
}

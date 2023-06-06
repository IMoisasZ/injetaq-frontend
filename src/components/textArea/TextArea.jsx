/** @format */

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function TextArea() {
	return (
		<Box
			component='form'
			sx={{
				'& .MuiTextField-root': { m: 0, width: '100%' },
			}}
			noValidate
			autoComplete='off'>
			<TextField
				id='outlined-multiline-flexible'
				label='Multiline'
				multiline
				maxRows={4}
			/>
		</Box>
	)
}

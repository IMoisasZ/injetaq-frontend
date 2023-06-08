/** @format */

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function TextArea() {
	return (
		<Box>
			<TextField
				id='outlined-multiline-flexible'
				label='Multiline'
				multiline
				maxRows={4}
			/>
		</Box>
	)
}

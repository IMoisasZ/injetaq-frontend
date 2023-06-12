/** @format */

import * as React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function TextArea({
	handleChage,
	value,
	width = '100%',
	margin,
	label = 'name text area',
}) {
	return (
		<Box style={{ width: '100%', margin }}>
			<TextField
				id='outlined-multiline-flexible'
				label={label}
				multiline
				maxRows={4}
				onChange={handleChage}
				value={value}
				style={{ width }}
			/>
		</Box>
	)
}

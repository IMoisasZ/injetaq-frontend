import * as React from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export default function MySelect({
	handleOnChange,
	value,
	label,
	children,
	width,
	margin = '0',
}) {
	return (
		<FormControl
			fullWidth
			style={{ width, margin }}>
			<InputLabel id={label}>{label}</InputLabel>
			<Select
				labelId={label}
				id={label}
				value={value}
				label={label}
				onChange={handleOnChange}>
				{children}
			</Select>
		</FormControl>
	)
}

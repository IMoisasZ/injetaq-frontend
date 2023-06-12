/** @format */

import React from 'react'
import TextField from '@mui/material/TextField'

export default function BasicTextFields({
	variant = 'outlined',
	label = 'title input',
	value = '',
	handleOnChange = null,
	type = 'text',
	width = '20%',
	margin,
	disabled = false,
	handleOnFocus = null,
	handleOnBlur = null,
	height,
	name,
}) {
	return (
		<TextField
			id={label}
			label={label}
			variant={variant}
			name={name}
			type={type}
			value={value}
			onChange={handleOnChange}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			style={{ width, margin, height }}
			disabled={disabled}
		/>
	)
}

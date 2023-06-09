import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import style from './CheckBox.module.css'

export default function CheckBox({
	nameCheckBox = 'name checkbox',
	value = false,
	toggleOnChange = null,
	justifyContent = 'center',
	alignItems = 'center',
	flexDirection = 'row',
	margin,
	width = '100%',
}) {
	return (
		<div
			className={style.containerCheckBox}
			style={{
				flexDirection,
				justifyContent,
				alignItems,
				margin,
				width,
			}}>
			<p>{nameCheckBox}</p>
			<Checkbox
				value={value}
				onChange={toggleOnChange}
				checked={value && true}
			/>
		</div>
	)
}

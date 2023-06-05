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
}) {
	return (
		<div
			className={style.containerCheckBox}
			style={{
				flexDirection,
				justifyContent,
				alignItems,
				margin,
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

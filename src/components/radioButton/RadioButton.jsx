import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import style from './RadioButton.module.css'

export default function RadioButton({
	options,
	defaultValue,
	nameRadioGroup,
	handleOnChange,
	flexDirection = 'row',
	width,
}) {
	return (
		<FormControl className={style.container}>
			<FormLabel
				id='demo-radio-buttons-group-label'
				className={style.title}>
				{nameRadioGroup}
			</FormLabel>
			<RadioGroup
				className={style.radioGroup}
				style={{ flexDirection, width }}
				aria-labelledby='demo-radio-buttons-group-label'
				defaultValue={defaultValue}
				name='radio-buttons-group'>
				{options.map((item, index) => {
					return (
						<FormControlLabel
							key={index}
							value={item.value}
							control={<Radio />}
							label={item.value.toUpperCase()}
							onChange={handleOnChange}
						/>
					)
				})}
				{/* <FormControlLabel
					value='male'
					control={<Radio />}
					label='Male'
				/>
				<FormControlLabel
					value='other'
					control={<Radio />}
					label='Other'
				/> */}
			</RadioGroup>
		</FormControl>
	)
}

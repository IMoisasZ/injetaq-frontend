import React from 'react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import EditIcon from '@mui/icons-material/Edit'
import style from './ButtonTable.module.css'

export default function ButtonTable({
	typeButton,
	handleOnClick = null,
	title = 'title button',
}) {
	return (
		<>
			{typeButton === 'checked' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type='button'
					title={title}>
					<RadioButtonCheckedIcon className={style.checkedIcon} />
				</button>
			)}
			{typeButton === 'unchecked' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type='button'
					title={title}>
					<RadioButtonUncheckedIcon className={style.uncheckedIcon} />
				</button>
			)}
			{typeButton === 'edit' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type='button'
					title={title}>
					<EditIcon className={style.editIcon} />
				</button>
			)}
		</>
	)
}

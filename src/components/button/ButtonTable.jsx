/** @format */

import React from 'react'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import EditIcon from '@mui/icons-material/Edit'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MoodIcon from '@mui/icons-material/Mood'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import style from './ButtonTable.module.css'

export default function ButtonTable({
	typeButton,
	handleOnClick = null,
	title = 'title button',
	type = 'button',
}) {
	return (
		<>
			{typeButton === 'checked' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<RadioButtonCheckedIcon className={style.checkedIcon} />
				</button>
			)}
			{typeButton === 'unchecked' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<RadioButtonUncheckedIcon className={style.uncheckedIcon} />
				</button>
			)}
			{typeButton === 'edit' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<EditIcon className={style.editIcon} />
				</button>
			)}
			{typeButton === 'contact' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<PermContactCalendarIcon className={style.contact} />
				</button>
			)}
			{typeButton === 'contact-add' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<PersonAddIcon className={style.contactAdd} />
				</button>
			)}
			{typeButton === 'contact-edit' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<PersonAddIcon className={style.contactEdit} />
				</button>
			)}
			{typeButton === 'delete' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<DeleteForeverIcon className={style.delete} />
				</button>
			)}
			{typeButton === 'main' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<MoodIcon className={style.main} />
				</button>
			)}
			{typeButton === 'not-main' && (
				<button
					className={style.button}
					onClick={handleOnClick}
					type={type}
					title={title}>
					<SentimentDissatisfiedIcon className={style.notMain} />
				</button>
			)}
		</>
	)
}

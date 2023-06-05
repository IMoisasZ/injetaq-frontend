import React from 'react'
import Progress from '../progress/Progress'
import style from './Message.module.css'

export default function Message({ message }) {
	return (
		<div className={style.containerMessage}>
			<p
				className={
					message.type === 'success'
						? style.success
						: message.type === 'error'
						? style.error
						: style.alter
				}>
				{message.msg}
			</p>
			<Progress
				color={
					message.type === 'success'
						? 'success'
						: message.type === 'error'
						? 'error'
						: 'warning'
				}
			/>
		</div>
	)
}

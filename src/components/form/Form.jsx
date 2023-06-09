/** @format */

import React from 'react'

export default function Form({
	handleOnSubmit,
	children,
	display = 'flex',
	flexDirection = 'row',
	justifyContent = 'center',
	alignItems = 'center',
	width,
	margin,
}) {
	return (
		<form
			onSubmit={handleOnSubmit}
			style={{
				display,
				flexDirection,
				justifyContent,
				alignItems,
				width,
				margin,
			}}>
			{children}
		</form>
	)
}

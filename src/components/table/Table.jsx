/** @format */

import React from 'react'
import style from './Table.module.css'

export default function Table({
	header,
	numberColAction = 2,
	children,
	width = '100%',
	marginDiv = '0 auto',
	marginTable = '2% 0 0 0',
}) {
	return (
		<div style={{ width, margin: marginDiv, overflowY: 'auto' }}>
			<table
				className={style.table}
				style={{
					margin: marginTable,
				}}>
				<thead>
					<tr style={{ textAlign: 'center' }}>
						{header.map((head, index) => {
							return head === 'Ações' ? (
								<th
									key={index}
									colSpan={numberColAction}>
									{head}
								</th>
							) : (
								<th key={index}>{head}</th>
							)
						})}
					</tr>
				</thead>
				<tbody className={style.tBody}>{children}</tbody>
			</table>
		</div>
	)
}

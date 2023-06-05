import * as React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function Progress({ color }) {
	return (
		<Box sx={{ display: 'flex' }}>
			<CircularProgress
				color={color}
				size={20}
			/>
		</Box>
	)
}

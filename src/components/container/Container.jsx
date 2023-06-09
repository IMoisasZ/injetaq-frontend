/** @format */

import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function MyContainer({ children, backgroundColor }) {
	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				maxWidth
				style={{ backgroundColor }}>
				<Box sx={{ height: '78vh', width: '100%' }}>{children}</Box>
			</Container>
		</React.Fragment>
	)
}

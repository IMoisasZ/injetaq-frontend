import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import style from './Footer.module.css'

export default function NavBar() {
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar>
					<Typography className={style.footerText}>
						INJETAQ INDÚSTRIA E COMÉRCIO LTDA
					</Typography>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

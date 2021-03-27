import React, { Component, useState } from "react";
import { Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Shadow from './Shadow'

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	title: {
	  flexGrow: 1,
	},
}));

const Login = ({ onSet }) => {
	const classes = useStyles();

	const [text, setText] = useState('');
  
	const onSubmit = (e) => {
	  e.preventDefault()
  
	  if (!text) {
		alert('Username is required!')
		return
	  }
  
	  onSet(text)
  
	  setText('')
	}  

	return (
		<>
			<Shadow />
			<div className="pass">
				<Paper elevation={3}>

				<form onSubmit={onSubmit}>
					<div className="message">
						
						<TextField id="login" label="Type in Your username" 
						value={text} onChange={(e) => setText(e.target.value)}
						variant="outlined" className={classes.root} />

						<Button
							variant="contained"
							color="primary"
							startIcon={<ArrowForwardIcon />}
						/>
						
					</div>
				</form>

				</Paper>
			</div>
		</>
	)
}

export default Login

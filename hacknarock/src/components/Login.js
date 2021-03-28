import React, { useState } from "react";
import { Paper, TextField } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Shadow from './Shadow'

const Login = ({ onSet }) => {
	const [text, setText] = useState('');
  
	const onSubmit = (e) => {
	  e.preventDefault()
  
	  if (!text) {
		alert('Username is required!')
		return
	  } else if (text.length < 5) {
		alert('Username must be at least 5 character!')
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
						variant="outlined" className="flex-grow" />

						<Button
							variant="contained"
							color="primary"
							type="submit"
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

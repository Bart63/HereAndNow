import { Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SendIcon from '@material-ui/icons/Send';
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

const Password = () => {
	const classes = useStyles();

	return (
		<>
			<Shadow />
			<div className="pass">
				<Paper elevation={3}>

					<div className="message">
						<TextField id="pss" label="Password to room" variant="outlined" type="password" className={classes.root} />

						<Button
							variant="contained"
							color="primary"
							startIcon={<LockOpenIcon />}
						/>
					</div>

				</Paper>
			</div>
		</>
	)
}

export default Password

import { Paper, TextField } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Button from '@material-ui/core/Button';
import Shadow from './Shadow'

const Password = () => {
	const classes = useStyles();

	return (
		<>
			<Shadow />
			<div className="pass">
				<Paper elevation={3}>

					<div className="message">
						<TextField id="pss" label="Password to room" variant="outlined" type="password" className="flex-grow" />

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

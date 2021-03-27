import { Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Shadow from './Shadow'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(0),
	},
	title: {
	  flexGrow: 1,
	},
}));

const Chat = () => {
	const classes = useStyles();

	return (
		<>
		    <Shadow />
			<div className="chat">
				<Paper elevation={3}>

					<div className="top">
						<div className={classes.root}>
						<AppBar position="static">
							<Toolbar>
								<Typography variant="h6" className={classes.title}>
									Chat
								</Typography>
								<IconButton edge="start" color="inherit" aria-label="menu" className={classes.menuButton}>
									<CloseIcon />
								</IconButton>
							</Toolbar>
						</AppBar>
						</div>
					</div>

					<div className="content"></div>

					<div className="message">

						<TextField id="msg" label="Aa" variant="outlined" />

					</div>

				</Paper>
			</div>
		</>
	)
}

export default Chat

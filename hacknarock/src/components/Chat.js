import { Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import Shadow from './Shadow'
import Message from './Message'

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
								<IconButton edge="center" color="inherit" aria-label="close" className={classes.menuButton}>
									<CloseIcon />
								</IconButton>
							</Toolbar>
						</AppBar>
						</div>
					</div>

					<div className="content">

						<Message />
						<Message />
						<Message />
						<Message />
						<Message />
						<Message />
						<Message />
						<Message />
						<Message />

					</div>

					<div className="message">

						<TextField id="msg" label="Aa" variant="outlined" className={classes.root} />
						<IconButton edge="center" color="primary" aria-label="send" className={classes.menuButton}>
							<SendIcon />
						</IconButton>
					</div>

				</Paper>
			</div>
		</>
	)
}

export default Chat

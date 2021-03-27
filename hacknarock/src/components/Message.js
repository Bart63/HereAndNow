import { Paper } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: 10
	},
	msg: {
		flexGrow: 1,
		padding: 10,
		color: 'white'
	}
}));

const Message = (props) => {
	const classes = useStyles();

	return (

		<div className={classes.root}>
			<div>Anonymous:</div>
			<Paper className={classes.msg} elevation={1} style={{backgroundColor: '#757ce8'}}>

				Hello!

			</Paper>
			<div className="date">11-20-2020</div>
		</div>
	)
}

export default Message

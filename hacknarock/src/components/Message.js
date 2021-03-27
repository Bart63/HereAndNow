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

		<div key={props.id} className={classes.root}>
			<div>{props.author}</div>
			<Paper className={classes.msg} elevation={1} style={{backgroundColor: '#757ce8'}}>
				{props.msg}
			</Paper>
			<div className="date">{props.date}</div>
		</div>
	)
}

export default Message

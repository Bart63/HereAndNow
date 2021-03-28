import React, { useState, useEffect } from "react";
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

	const [userName, setUser] = useState('');

	useEffect(() => {
		const getUser = async (id) => {
			const userFromServer = await fetchUserName(id);
			if (userFromServer) setUser(userFromServer);
		};

		getUser(props.author)
	}, []);

	const fetchUserName = async (id) => {
		const res = await fetch("http://localhost:5000/users/" + id);
		const data = await res.json();
		return data;
	};

	return (

		<div key={props.id} className={classes.root}>
			<div>{userName}</div>
			<Paper className={classes.msg} elevation={1} style={{backgroundColor: '#757ce8'}}>
				{props.msg}
			</Paper>
			<div className="date">{props.date}</div>
		</div>
	)
}

export default Message

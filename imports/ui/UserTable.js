import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles(() => ({
	container: {
		padding: 16,
		margin: 16,
	},
}));


const UserTable = ({ users = [], loading, handleRemoveUser }) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper} className={classes.container}>
			<Typography variant="h6">
				Users
			</Typography>
			{loading ? (
				<CircularProgress />
			) : (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Email</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((user) => (
							<TableRow key={user._id}>
								<TableCell component="th" scope="row">
									{user.firstName} {user.lastName}
								</TableCell>
								<TableCell>{user.emails[0].address}</TableCell>
								<TableCell>
									<IconButton color="secondary" onClick={handleRemoveUser(user._id)}>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</TableContainer>
	);
};

export default UserTable;

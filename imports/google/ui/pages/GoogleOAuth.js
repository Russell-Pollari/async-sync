import React, { useState, useEffect } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import CircularProgress from '@material-ui/core/CircularProgress';

import { saveToken } from '/imports/google/methods/google.saveToken';

const GoogleOAuth = () => {
	const [loading, setLoading] = useState(true);
	const { search } = useLocation();

	useEffect(() => {
		const { code } = queryString.parse(search);
		saveToken.call({ code }, (err) => {
			if (err) {
				alert(err);
			} else {
				setLoading(false);
			}
		});
	}, [search]);

	return (
		<div>
			{loading ? (
				<div>
					<CircularProgress />
					Authenticating
				</div>
			) : (
				<Redirect to="/" />
			)}
		</div>
	);
};

export default GoogleOAuth;

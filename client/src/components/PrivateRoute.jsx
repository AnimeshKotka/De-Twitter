import React, { useContext } from 'react';
import { UserContext } from '../providers/userContext';
import ConnectWallet from './ConnectWallet';

const PrivateRoute = ({ children }) => {
	const { currentAccount } = useContext(UserContext);

	return currentAccount ? children : <ConnectWallet />;
};

export default PrivateRoute;

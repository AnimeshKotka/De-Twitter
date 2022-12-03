import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import MyTweets from './pages/MyTweets';
import UpdateTweet from './pages/UpdateTweet';
import UserProfile from './pages/UserProfile';
import { UserContext } from './providers/userContext';
import Identicon from "identicon.js";

const App = () => {
	const { isCorrectNetwork } = useContext(UserContext);

	if (!window.ethereum) {
		return (
			<div className="w-full h-screen flex justify-center items-center">
				<h1 className="text-2xl text-black text-center font-bold">
					Metamask or other EIP-1102 / EIP-1193 compliant wallet not found,
					<br />
					Please install Metamask
				</h1>
			</div>
		);
	}

	if (!isCorrectNetwork) {
		return (
			<div className="w-full h-screen flex justify-center items-center">
				<h1 className="text-2xl text-black text-center font-bold">
					Please switch to{' '}
					<span className="text-indigo-700">Mumbai testnet</span> to view the
					Daap
				</h1>
			</div>
		);
	}

	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					</PrivateRoute>
				}
			/>
			<Route
				path="/update/:tweetId"
				element={
					<PrivateRoute>
						<ProtectedRoute>
							<UpdateTweet />
						</ProtectedRoute>
					</PrivateRoute>
				}
			/>
			<Route
				path="/users/:userAddress"
				element={
					<PrivateRoute>
						<UserProfile />
					</PrivateRoute>
				}
			/>
			<Route
				path="/myTweets"
				element={
					<PrivateRoute>
						<ProtectedRoute>
							<MyTweets />
						</ProtectedRoute>
					</PrivateRoute>
				}
			/>
		</Routes>
	);
};

export default App;

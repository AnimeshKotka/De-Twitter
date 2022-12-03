import React, { useContext } from 'react';
import { UserContext } from '../providers/userContext';

const ConnectWallet = () => {
	const { connectWallet } = useContext(UserContext);

	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-4">
			<div className="bg-white shadow-md flex flex-col items-center justify-center rounded-md m-8 p-4 xl:w-6/12 space-y-3 w-11/12">
				<h1 className="text-3xl font-semibold">Welcome to De-Tweetiter 🚀</h1>
				<p className="text-center text-lg text-black">
					{' '}
					Let the world know your thoughts
				</p>
				<button
					className="h-10 px-6 font-semibold rounded-md bg-indigo-500 text-white"
					onClick={connectWallet}
				>
					Connect Wallet 🚀
				</button>
			</div>
		</div>
	);
};

export default ConnectWallet;

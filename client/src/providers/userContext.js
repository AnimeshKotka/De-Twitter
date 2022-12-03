import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getContractReadOnly, getContractWrite, handleErr } from '../utils';
import toast from 'react-hot-toast';

export const UserContext = React.createContext();

const { ethereum } = window;

export const UserProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [tweets, setTweets] = useState([]);
	const [myTweets, setMyTweets] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({ method: 'eth_accounts' });

			if (accounts.length > 0) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log('NO accoutns found');
			}
			console.log(accounts);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const connectWallet = async () => {
		try {
			console.log('Connetct called ');
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log(accounts);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const getUser = async () => {
		const contract = getContractReadOnly();
		const user = await contract.getUser(currentAccount);
		setCurrentUser(user);
		return user;
	};

	const createUser = async (username, name, avatar) => {
		if (!username || !name) {
			toast.error('Username and name must not be empty');
			return;
		}

		if (!avatar) {
			avatar =
				'https://external-preview.redd.it/RNHBb73nQjSDez_ZxyzDTA3inn0E0G670g29PqEdJbI.jpg?auto=webp&s=3e648825a26d115990fb327986c37e51e023fb0b';
		}

		const contract = getContractWrite();

		const tx = await toast.promise(
			contract.signUp(username, name, avatar),
			{
				loading: 'Creating user',
				success: 'Successfully registered!',
				error: handleErr,
			},
			{
				success: {
					icon: '🥳',
				},
			}
		);

		await toast.promise(tx.wait(), {
			loading: 'Minning transaction, Hold tight!',
			success: 'Minned successfully !',
			error: 'please wait 5 min and try again',
		});

		getUser();
	};

	const getAllTweet = async () => {
		const contract = getContractReadOnly();

		setLoading(true);

		const dweets = await contract.GetAllDeTwittes();
		let populateAuthor = [];

		populateAuthor = await Promise.all(
			dweets.map(async (tweet) => {
				const user = await contract.getUser(tweet.owner);
				return {
					author: user,
					timestamp: tweet.timestamp,
					content: tweet.post,
					id: tweet.post_id,
					likeCount: tweet.like_count,
					dislikeCount: tweet.dislike_count
				};
			})
		);

		console.log(populateAuthor);
		setTweets(populateAuthor);
		setLoading(false);
	};

	const postTweet = async (tweet) => {
		const contract = getContractWrite();
		console.log(tweet);
		const tx = await toast.promise(
			contract.AddNewDeTwitt(tweet),
			{
				loading: 'Publishing your tweet',
				success: 'Your Tweet is published!',
				error: handleErr,
			},
			{
				success: {
					icon: '🚀',
				},
			}
		);

		await toast.promise(tx.wait(), {
			loading: 'Minning transaction, Hold tight!',
			success: 'Minned successfully !',
			error: 'please wait 5 min and try again',
		});

		getAllTweet();
	};

	const deleteTweet = async (tweetId) => {
		const contract = getContractWrite();
		const tx = await contract.deleteTweet(tweetId);
		await tx.wait();
		getAllTweet();
	};

	const fetchMyTweets = async () => {
		setLoading(true);
		const contract = getContractReadOnly();
		const allTweets = await contract.getCreatedTweets(currentAccount);
		let populateAuthor = await Promise.all(
			allTweets.map(async (tweet) => {
				const user = await contract.getUser(tweet.author);
				return {
					author: user,
					timestamp: tweet.timestamp,
					content: tweet.content,
					id: tweet.id,
				};
			})
		);

		setMyTweets(populateAuthor);
		setLoading(false);
	};

	useEffect(() => {
		if (ethereum) {
			const getChain = async () => {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const { chainId } = await provider.getNetwork(provider);
				console.log('CHAIN ID : ', chainId);
				setIsCorrectNetwork(chainId === 31337 || chainId === 5);
			};

			ethereum.on('accountsChanged', (accounts) => {
				setCurrentAccount(accounts[0]);
			});
			ethereum.on('networkChanged', function (networkId) {
				window.location.reload();
			});
			checkIfWalletIsConnected();
			getAllTweet();
			getChain();
		}
	}, []);

	useEffect(() => {
		if (currentAccount) {
			getUser();
		}
	}, [currentAccount]);

	return (
		<UserContext.Provider
			value={{
				connectWallet,
				currentAccount,
				loading,
				isCorrectNetwork,
				createUser,
				currentUser,
				postTweet,
				getAllTweet,
				tweets,
				deleteTweet,
				fetchMyTweets,
				myTweets,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/userContext';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import uuid from 'react-uuid';
import moment from 'moment';
import Card from '../components/Card';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const SignUp = () => {
	const {
		createUser,
		loading: loadingTweets,
		tweets,
	} = useContext(UserContext);

	const [userName, setUserName] = useState('');
	const [fullName, setFullName] = useState('');
	const [loading, setLoading] = useState('');
	const [imgLink, setimgLink] = useState('');

	const handleImage = async (e) => {
		if (!e.target.files[0]) {
			console.log('No file uploaded');
			return;
		}
		const file = e.target.files[0];
		console.log('Image', file);
		try {
			setLoading('Uploading Image...');
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			console.log('url--', url);
			setLoading('');
			setimgLink(url);
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	};

	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-4">
			<div className="bg-white shadow-md flex flex-col items-center justify-center rounded-md m-8 p-4 xl:w-6/12 space-y-3 w-11/12">
				<h1 className="text-3xl font-semibold">Welcome to De-Tweet 🚀</h1>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Your Username <sup className="text-red-500 font-semibold">*</sup>
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="Username"
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="fullName"
					>
						Full Name <sup className="text-red-500 font-semibold">*</sup>
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="fullName"
						type="text"
						placeholder="Full Name"
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2 text-center"
						htmlFor="fullName"
					>
						Avatar
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="fullName"
						type="file"
						accept="image/*"
						onChange={handleImage}
					/>
					{imgLink && (
						<img
							src={imgLink}
							alt="ipfs image"
							className="w-12 h-12 rounded-full my-2"
						/>
					)}
				</div>
				<button
					className="h-10 px-6 font-semibold rounded-md bg-indigo-500 text-white disabled:opacity-60"
					onClick={() => createUser(userName, fullName, imgLink)}
					disabled={loading}
				>
					{loading ? loading : 'Sign Up'}
				</button>
			</div>
			{loadingTweets ? (
				<h1 className="text-3xl font-semibold text-gray-700">Loading...</h1>
			) : (
				tweets
					?.map((tweet, index) => (
						<Card
							message={tweet.content}
							timeStamp={moment(tweet.timestamp.toString() * 1000).fromNow()}
							author={tweet.author}
							key={uuid()}
							tweetId={tweet.id}
						/>
					))
					.reverse()
			)}
		</div>
	);
};

export default SignUp;

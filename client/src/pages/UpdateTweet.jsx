import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../providers/userContext';
import { getContractWrite, handleErr } from '../utils';

const UpdateTweet = () => {
	const { tweetId } = useParams();

	const [content, setContent] = useState('');
	const navigate = useNavigate();

	const updateTweet = async () => {
		const contract = getContractWrite();

		const tx = await toast.promise(
			contract.updateTweet(tweetId, content),
			{
				loading: 'Updating your tweet',
				success: 'Your Tweet is updated!',
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

		navigate('/');
	};

	useEffect(() => {
		const fetchTweet = async () => {
			const contract = getContractWrite();
			const currentTweet = await contract.idToTweet(tweetId);
			setContent(currentTweet.content);
		};

		fetchTweet();
	}, []);

	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-4">
			<div className="bg-white shadow-md flex flex-col items-center justify-center rounded-md m-8 p-4 xl:w-6/12 space-y-3 w-11/12">
				<h1 className="text-3xl font-semibold">Update Tweet</h1>
				<div className="mb-4">
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="fullName"
						type="text"
						placeholder="update tweet"
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<div className="flex space-x-2">
					<Link to="/">
						<button className="h-10 px-6 font-semibold rounded-md bg-green-400 text-white">
							back
						</button>
					</Link>
					<button
						className="h-10 px-6 font-semibold rounded-md bg-indigo-500 text-white"
						onClick={updateTweet}
					>
						update
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateTweet;

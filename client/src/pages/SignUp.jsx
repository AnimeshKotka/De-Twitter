import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/userContext';
import uuid from 'react-uuid';
import moment from 'moment';
import Card from '../components/Card';


const SignUp = () => {
	const {
		createUser,
		loading: loadingTweets,
		tweets,
	} = useContext(UserContext);

	const [userName, setUserName] = useState('');
	const [fullName, setFullName] = useState('');
	const [loading] = useState('');
	const [imgLink] = useState('');



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

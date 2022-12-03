import React, { useContext, useState } from 'react';
import { UserContext } from '../providers/userContext';
import moment from 'moment';
import Card from '../components/Card';
import uuid from 'react-uuid';

const Home = () => {
	const { postTweet, currentUser, tweets, loading } = useContext(UserContext);
	const [tweet, setTweet] = useState('');

	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-4">
			<div className="bg-white shadow-md flex flex-col items-center justify-center rounded-md m-8 mt-1 p-4 xl:w-6/12 space-y-3 w-11/12">
				<h1 className="text-3xl font-semibold">Welcome to De-Tweet 🚀</h1>
				<p className="text-center text-lg text-black">
					{' '}
					Let the world know your thoughts
				</p>
				{currentUser && (
					<form>
						<div className="my-4">
							<input
								className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								id="message"
								type="text"
								placeholder="Message"
								onChange={(e) => setTweet(e.target.value)}
							/>
						</div>
					</form>
				)}
				<button
					className="h-10 px-6 font-semibold rounded-md bg-indigo-500 text-white"
					onClick={() => postTweet(tweet)}
				>
					Tweet 🚀
				</button>
			</div>
			{loading ? (
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
							likeCount={tweet.likeCount.toString()}
							dislikeCount={tweet.dislikeCount.toString()}
						/>
					))
					.reverse()
			)}
		</div>
	);
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-1">
			<div className="bg-white shadow-md flex items-center justify-around rounded-md mt-2 mb-0 p-4 xl:w-6/12 w-11/12">
				<Link to="/">
					<p className="text-xl text-indigo-500 font-semibold">Home</p>
				</Link>
				<Link to="/myTweets">
					<p className="text-xl text-indigo-500 font-semibold">My Tweet</p>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;

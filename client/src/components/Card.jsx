import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../providers/userContext";
import { truncateEthAddress } from "../utils";
import Identicon from "identicon.js";

import { IconButton } from "rsuite";
import { Admin, Menu, ArrowUp, Edit, Search } from '@rsuite/icons';
import {  FaRegThumbsUp, FaRegThumbsDown, FaRegTrashAlt } from 'react-icons/fa';

// Import the default CSS
import "rsuite/dist/rsuite.min.css";


const Card = ({ message, timeStamp, author, tweetId, likeCount, dislikeCount }) => {
	const { currentUser, deleteTweet, likeTweet } = useContext(UserContext);
	const ButtonStyle = { margin: "0px 10px" };
	return (
		<div className="bg-white shadow-md xl:w-6/12 w-11/12 rounded-md p-4 text-gray-500 font-semibold hover:shadow-lg space-y-2">
			<div className="border border-gray-400 lg:border lg:border-gray-400 bg-white rounded lg:rounded p-4 flex flex-col justify-between leading-normal">
				<div className="mb-3">
					<p className="text-gray-700 text-base">{message}</p>
				</div>
				<div className=" d-flex flex-row">
					<div className="flex items-center">
						<img
							className="w-10 h-10 rounded-full mr-4"
							src={`data:image/png;base64,${new Identicon(
								author.user_address,
								30
							  ).toString()}`}
							alt="Avatar"
						/>
						<div className="text-sm">
							<Link to={`/users/${author.user_address}`}>
								<p className="text-gray-900 leading-none text-sm">
									@{author.username}
								</p>
								<p className="text-gray-600 text-xs">
									{truncateEthAddress(author.user_address)}
								</p>
							</Link>
							<p className="text-gray-600 text-xs">{timeStamp}</p>
							
						</div>
					</div>
					<div className="flex flex-row items-center">
					<IconButton onClick={() => likeTweet(tweetId)} icon={<FaRegThumbsUp />} color="cyan" 
                appearance="primary" style={ButtonStyle} ></IconButton>
					<p className="px-2 py-1">{likeCount}</p>
					<IconButton icon={<FaRegThumbsDown />} color="cyan" 
                appearance="primary" style={ButtonStyle} ></IconButton>
					<p className="px-2 py-1">{dislikeCount}</p>
					{author.user_address === currentUser.user_address && (
							<div className="flex-row-reverse">
							<Link to={`/update/${tweetId}`}>
							<IconButton icon={<Edit />} color="cyan" 
                appearance="primary" style={ButtonStyle} />
								
							</Link>
							<IconButton icon ={<FaRegTrashAlt/>} style={ButtonStyle} appearance="primary"
								color="red"  className="px-2 py-1 font-semibold rounded-md bg-red-400 text-white"
								onClick={() => deleteTweet(tweetId)}
							/>
								
							
							</div>
					)}
						</div>
				</div>
			</div>
		</div>
	);
};

export default Card;

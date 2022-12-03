import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../providers/userContext";
import { getContractReadOnly } from "../utils";

const UserProfile = () => {
	const { userAddress } = useParams();
	const [currUser, setCurrUser] = useState({});
	const navigate = useNavigate();

	const getUser = async (address) => {
		const contract = getContractReadOnly();
		const user = await contract.getUser(address);
		setCurrUser(user);
	};

	useEffect(() => {
		getUser(userAddress);
	}, [userAddress]);

	return (
		<div className="container mx-auto flex flex-col items-center justify-center space-y-5 pb-4">
			<div className="bg-white shadow-md flex flex-col  justify-center rounded-md m-8 p-4 xl:w-6/12 space-y-3 w-11/12">
				<h1 className="text-3xl font-semibold text-center">
					Welcome to De-Tweet 🚀
				</h1>
				<img
					src={
						currUser.imgURI.includes("external-preview.redd.it")
							? currUser.imgURI
							: `https://ipfs.fleek.co/ipfs/${
									currUser.imgURI.split("ipfs/")[1]
							  }`
					}
					alt="avatar"
					className="w-20 h-30 rounded-full self-center"
				/>
				<div className="mb-4">
					<p
						className="block text-gray-700 text-sm font-bold"
						htmlFor="username"
					>
						User Name
					</p>
					<p>{currUser?.username}</p>
				</div>
				<div className="mb-4">
					<p
						className="block text-gray-700 text-sm font-bold"
						htmlFor="fullName"
					>
						Full Name
					</p>
					<p>{currUser?.name}</p>
				</div>
				<div className="mb-4">
					<p
						className="block text-gray-700 text-sm font-bold"
						htmlFor="fullName"
					>
						Address
					</p>
					<p>{currUser?.userAddress}</p>
				</div>
				<button
					className="h-10 px-6 font-semibold rounded-md bg-green-400 text-white"
					onClick={() => navigate("/")}
				>
					back
				</button>
			</div>
		</div>
	);
};

export default UserProfile;

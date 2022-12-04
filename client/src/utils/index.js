import { ethers } from 'ethers';
import contract from '../contracts';
// import contract from '../contracts/DeTweet.json';

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address) => {
	console.log(address);
	const match = address.match(truncateRegex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

export const getContractReadOnly = () => {

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const chainId = 5;
	// const { chainId } = await provider.getNetwork(provider);
	console.log('CHAIN ID : ', chainId);
	const deCalendContract = new ethers.Contract(
		contract.contractAddresses[chainId][0],
		contract.abi,
		provider
	);
	return deCalendContract;
};

export const getContractWrite = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	// const { chainId } = await provider.getNetwork(provider);
	const chainId = 5;
	console.log('CHAIN ID : ', chainId);
	const signer = provider.getSigner();
	const deCalendContract = new ethers.Contract(
		contract.contractAddresses[chainId][0],
		contract.abi,
		signer
	);
	return deCalendContract;
};

export const handleErr = (err) => {
	let finalErr = 'Unexpected error';
	if (err.code === 4001) {
		let temp = err.message.split(': ');
		finalErr = temp[1].split(".'")[0];
	} else if (err.code === -32603) {
		let temp = err.data.message.split(" '");
		finalErr = temp[1].split(".'")[0];
	}

	return finalErr;
};

import { frontEndContractsFile, frontEndAbiFile } from "../helper-hardhat-config";
import fs from "fs";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const updateUI: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { network, ethers } = hre;
  const chainId = network?.config?.chainId || '31337';

    console.log("Writing to front end...");
    // writing address
    const fundMe = await ethers.getContract("DeTwitter");
    const contractAddresses = JSON.parse(
      fs.readFileSync(frontEndContractsFile, "utf8")
    );
    if (chainId in contractAddresses) {
      if (
        !contractAddresses[network.config.chainId!].includes(fundMe.address)
      ) {
        contractAddresses[network.config.chainId!].push(fundMe.address);
      }
    } else {
      contractAddresses[network.config.chainId!] = [fundMe.address];
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses));
    console.log("Front end written!");

    // writing abi
    fs.writeFileSync(
      frontEndAbiFile,
      fundMe.interface.format(ethers.utils.FormatTypes.json)
    );
  
};
export default updateUI;
updateUI.tags = ["all", "frontend"];

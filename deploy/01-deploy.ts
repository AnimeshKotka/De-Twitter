import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {DeployFunction} from "hardhat-deploy/types"


const deployDeTwitter: DeployFunction  = async function(hre: HardhatRuntimeEnvironment){

    const {deployments, getNamedAccounts, network,ethers } = hre;
    const {deploy, log } = await deployments;
    const {deployer} = await getNamedAccounts();

    const detwittes = await deploy("DeTwitter", {
        from: deployer,
        args: [],
        log: true,
    })
    log(`deployed on ${detwittes.address}`)
    log("----------------------------------------------------")


}
export default deployDeTwitter
deployDeTwitter.tags = ["all", "detwitter"]

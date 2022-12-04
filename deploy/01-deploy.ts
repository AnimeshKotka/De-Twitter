import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
// import verify  from "../utils/verify";
import { run } from "hardhat";
import { developmentChains } from "../helper-hardhat-config"

const deployDeTwitter: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy, log } = await deployments;
  const { deployer } = await getNamedAccounts();

  const detwittes = await deploy("DeTwitter", {
    from: deployer,
    args: [],
    log: true,
  });
  log(`deployed on ${detwittes.address}`);
  log("----------------------------------------------------");

  // Verify the deployment
  console.log("Varifying contract............");
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    // await verify(detwittes.address)
    console.log("Verifying contract...");
    try {
      await run("verify:verify", {
        address: detwittes.address,
        constructorArguments: [],
      });
    } catch (e: any) {
      if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already verified!");
      } else {
        console.log(e);
      }
    }
  }
};
export default deployDeTwitter;
deployDeTwitter.tags = ["all", "detwitter"];

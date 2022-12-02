import { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { DeTwitter } from "../../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("DeTwitter Unit Tests", () => {
  let detwitter: DeTwitter;
  let detwitterContract: DeTwitter;
  let accounts: SignerWithAddress[];
  let userName: string;
  let name: string;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    let { deployer } = await getNamedAccounts();
    await deployments.fixture(["all"]);
    detwitterContract = await ethers.getContract("DeTwitter", accounts[0]);
    detwitter = detwitterContract.connect(accounts[0]);
    userName = "TestUser1";
    name = "Test User";
    await detwitter.signUp(userName, name, "");
  });

  describe("signUp", async () => {
    it("It should return same user name", async () => {
      let gameUserName = await detwitter.getUserNameByAddress(
        accounts[0].address
      );
      assert.equal(userName, gameUserName);
    });

    it("Should throw error of user not already sign in", async () => {
      await expect(detwitter.signUp(userName, name, "")).to.be.revertedWith(
        "DeTitter_AlreadySignIn"
      );
    });

    it("Should throw error of user not already taken", async () => {
      detwitter = detwitterContract.connect(accounts[1]);
      await expect(detwitter.signUp(userName, name, "")).to.be.revertedWith(
        "DeTitter_UserNametaken"
      );
    });
  });

  describe("AddNewDeTwitt", async () => {
    let post: string = "Some Dummy post";

    it("Should return error empty post", async () => {
      await expect(detwitter.AddNewDeTwitt("")).to.be.revertedWith(
        "DeTitter_EmptyContain"
      );
    });

    it("Should return error need to sign it", async () => {
      detwitter = detwitterContract.connect(accounts[3]);
      await expect(detwitter.AddNewDeTwitt(post)).to.be.revertedWith(
        "DeTitter_NotSignIn"
      );
    });

    it("Post Contain should match", async () => {
      detwitter = detwitterContract.connect(accounts[0]);
      await detwitter.AddNewDeTwitt(post);
      let postObj: any = await detwitter.getPostDetails(0);

      let new_post: string = postObj.post;
      let new_like_count: string = postObj.like_count;
      let new_dislike_count: string = postObj.dislike_count;
      await assert.equal(post, new_post);
      await assert.equal(new_like_count.toString(), "0");
      await assert.equal(new_dislike_count.toString(), "0");
    });

    it("Emit event of new twitte", async () => {
      await expect(detwitter.AddNewDeTwitt(post)).to.be.emit(
        detwitter,
        "NewTwitte"
      );
    });
  });

  describe("likeDeTweet", async () => {
    beforeEach(async () => {
      detwitter.AddNewDeTwitt("dummy like post");
    });

    it("it will increase the like count of post", async () => {
      await detwitter.likeDeTweet(0);
      let postObj: any = await detwitter.getPostDetails(0);
      assert.equal(postObj.like_count, 1);
    });

    it("it will throw error not sign it", async () => {
      detwitter = detwitterContract.connect(accounts[1]);
      await expect(detwitter.likeDeTweet(0)).to.be.revertedWith(
        "DeTitter_NotSignIn"
      );
    });
  });
  
  describe("dislikeDeTweet", async () => {
    beforeEach(async () => {
      detwitter.AddNewDeTwitt("dummy like post");
    });

    it("it will increase the like count of post", async () => {
      await detwitter.dislikeDeTweet(0);
      let postObj: any = await detwitter.getPostDetails(0);
      assert.equal(postObj.dislike_count, 1);
    });

    it("it will throw error not sign it", async () => {
      detwitter = detwitterContract.connect(accounts[1]);
      await expect(detwitter.dislikeDeTweet(0)).to.be.revertedWith(
        "DeTitter_NotSignIn"
      );
    });
  });


});

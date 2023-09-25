import { Descriptor } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Descriptor", () => {
  let descriptor: Descriptor;

  let deployer: SignerWithAddress;
  let user: SignerWithAddress;

  const cid = "QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n";

  const constructTokenURI = (tokenId: number) => {
    return (
      '{"name":"Medical DAO NFT ' +
      tokenId +
      '", "description":"Medical DAO NFT ' +
      tokenId +
      ' is a member of the Medical DAO", "image": "' +
      getImage(tokenId) +
      '"}'
    );
  };

  const getImage = (tokenId: number) => {
    return "ipfs://" + cid + "/" + tokenId + ".png";
  };

  const encodeBase64 = (tokenURI: string): string => {
    const jsonString = JSON.stringify(tokenURI);
    return "data:application/json;base64," + btoa(jsonString);
  };

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    ({ descriptor } = await deploy(deployer));
  });

  describe("init variables", () => {
    it("should return the correct cid", async () => {
      expect(await descriptor.getCID()).to.equal(cid);
    });
  });

  describe("setCid", () => {
    it("should revert to set cid if not owner", async () => {
      await expect(
        descriptor.connect(user).setCID("newCid"),
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("should set cid", async () => {
      await descriptor.setCID("newCid");
      expect(await descriptor.cid())
        .to.emit(descriptor, "CIDSet")
        .withArgs("newCid");
    });
  });

  // describe("tokenURI", () => {
  //   it("should return the correct token uri", async () => {
  //     const encodedTokenURI = encodeBase64(constructTokenURI(1));
  //     expect(await descriptor.tokenURI(1)).to.equal(encodedTokenURI);
  //   });
  // });

  describe("getImage", () => {
    it("should return the correct image", async () => {
      expect(await descriptor.getImage(1)).to.equal(getImage(1));
    });
  });
});

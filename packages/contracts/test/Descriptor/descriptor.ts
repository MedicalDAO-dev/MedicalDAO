import { Descriptor } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Buffer } from "buffer";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Descriptor", () => {
  let descriptor: Descriptor;

  let deployer: SignerWithAddress;
  let user: SignerWithAddress;

  const cid = "QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n";

  const getImage = (tokenId: number) => {
    return "ipfs://" + cid + "/" + tokenId + ".png";
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

  describe("tokenURI", () => {
    it("should return the correct token uri", async () => {
      interface Params {
        name: string;
        description: string;
        image: string;
      }

      const calcEncodedMetadata = (tokenId: number): string => {
        const jsonString = `{"name":"Medical DAO NFT ${tokenId}", "description":"Medical DAO NFT ${tokenId} is a member of the Medical DAO", "image": "${getImage(
          tokenId,
        )}"}`;

        const base64EncodedString = Buffer.from(jsonString).toString("base64");

        const resultString =
          "data:application/json;base64," + base64EncodedString;

        return resultString;
      };

      const encodedTokenURI = calcEncodedMetadata(1);
      expect(await descriptor.tokenURI(1)).to.equal(encodedTokenURI);
    });
  });

  describe("getImage", () => {
    it("should return the correct image", async () => {
      expect(await descriptor.getImage(1)).to.equal(getImage(1));
    });

    it("should return the correct image url", async () => {
      expect(await descriptor.getImage(0)).to.equal(
        "ipfs://QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n/0.png",
      );
    });
  });
});

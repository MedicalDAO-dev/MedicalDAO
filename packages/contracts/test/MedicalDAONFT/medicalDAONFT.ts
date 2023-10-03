import { Descriptor, MedicalDAONFT } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Descriptor", () => {
  let descriptor: Descriptor;
  let medicalDAONFT: MedicalDAONFT;

  let deployer: SignerWithAddress;
  let foundersDAO: SignerWithAddress;
  let foundersDAO2: SignerWithAddress;
  let minter: SignerWithAddress;

  beforeEach(async () => {
    [deployer, foundersDAO, foundersDAO2, minter] = await ethers.getSigners();
    ({ descriptor, medicalDAONFT } = await deploy(
      deployer,
      foundersDAO,
      foundersDAO2,
      minter,
    ));
  });

  describe("init variables", () => {
    it("should return the correct foundersDAO address", async () => {
      expect(await medicalDAONFT.foundersDAO()).to.equal(foundersDAO.address);
    });

    it("should return the correct foundersDAO2 address", async () => {
      expect(await medicalDAONFT.foundersDAO2()).to.equal(foundersDAO2.address);
    });

    it("should return the correct minter address", async () => {
      expect(await medicalDAONFT.minter()).to.equal(minter.address);
    });

    it("should return the correct descriptor address", async () => {
      expect(await medicalDAONFT.descriptor()).to.equal(descriptor.address);
    });

    it("should check isMinterLocked false", async () => {
      expect(await medicalDAONFT.isMinterLocked()).to.equal(false);
    });

    it("should check isDescriptorLocked false", async () => {
      expect(await medicalDAONFT.isDescriptorLocked()).to.equal(false);
    });

    it("should return the correct name", async () => {
      expect(await medicalDAONFT.name()).to.equal("MedicalDAO NFT");
    });

    it("should return the correct symbol", async () => {
      expect(await medicalDAONFT.symbol()).to.equal("MD NFT");
    });

    it("should return the correct contractURI", async () => {
      expect(await medicalDAONFT.contractURI()).to.equal(
        "ipfs://QmZi1n79FqWt2tTLwCqiy6nLM6xLGRsEPQ5JmReJQKNNzX",
      );
    });

    it("should return the correct currentTokenId", async () => {
      expect(await medicalDAONFT.getCurrentTokenId()).to.equal(0);
    });
  });
});

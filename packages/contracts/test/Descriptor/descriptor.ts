import { Descriptor } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Descriptor", () => {
  let descriptor: Descriptor;

  let deployer: SignerWithAddress;

  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    ({ descriptor } = await deploy(deployer));
  });

  describe("init variables", () => {
    it("should return the correct cid", async () => {
      expect(await descriptor.cid()).to.equal(
        "QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n",
      );
    });
  });
});

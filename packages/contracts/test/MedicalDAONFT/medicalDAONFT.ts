import { Descriptor, MedicalDAONFT } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("MedicalDAONFT", () => {
  let descriptor: Descriptor;
  let medicalDAONFT: MedicalDAONFT;

  let deployer: SignerWithAddress;
  let foundersDAO: SignerWithAddress;
  let foundersDAO2: SignerWithAddress;
  let minter: SignerWithAddress;
  let user: SignerWithAddress;
  const cid = "QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n";

  const getImage = (tokenId: number) => {
    return "ipfs://" + cid + "/" + tokenId + ".png";
  };

  const calcEncodedMetadata = (tokenId: number): string => {
    const jsonString = `{"name":"Medical DAO NFT ${tokenId}", "description":"Medical DAO NFT ${tokenId} is a member of the Medical DAO", "image": "${getImage(
      tokenId,
    )}"}`;

    const base64EncodedString = Buffer.from(jsonString).toString("base64");

    const resultString = "data:application/json;base64," + base64EncodedString;

    return resultString;
  };

  beforeEach(async () => {
    [deployer, foundersDAO, foundersDAO2, minter, user] =
      await ethers.getSigners();
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
      expect(await medicalDAONFT.getCurrentTokenId()).to.equal(1);
    });

    it("should return the correct owner of tokenId 0", async () => {
      expect(await medicalDAONFT.ownerOf(0)).to.equal(foundersDAO.address);
    });

    it("should return the correct owner of tokenId 1", async () => {
      await expect(medicalDAONFT.ownerOf(1)).to.be.revertedWith(
        "ERC721: owner query for nonexistent token",
      );
    });

    it("should return the correct balance of owner", async () => {
      expect(await medicalDAONFT.balanceOf(deployer.address)).to.equal(0);
    });

    it("should return the correct balance of foundersDAO", async () => {
      expect(await medicalDAONFT.balanceOf(foundersDAO.address)).to.equal(1);
    });

    it("should return the correct balance of foundersDAO2", async () => {
      expect(await medicalDAONFT.balanceOf(foundersDAO2.address)).to.equal(0);
    });

    it("should return the correct balance of minter", async () => {
      expect(await medicalDAONFT.balanceOf(minter.address)).to.equal(0);
    });

    it("should return the correct tokenURI of tokenId 0", async () => {
      const encodedTokenURI = calcEncodedMetadata(0);
      expect(await medicalDAONFT.tokenURI(0)).to.equal(encodedTokenURI);
    });
  });

  describe("setters", async () => {
    describe("setContractURIHash", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          medicalDAONFT.connect(foundersDAO).setContractURIHash("newIpfsUri"),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should set if called by owner", async () => {
        await expect(
          await medicalDAONFT
            .connect(deployer)
            .setContractURIHash("newIpfsUri"),
        )
          .to.emit(medicalDAONFT, "ContractUriUpdated")
          .withArgs("newIpfsUri");
        expect(await medicalDAONFT.contractURI()).to.equal("ipfs://newIpfsUri");
      });
    });

    describe("setFounderDAO", async () => {
      it("should revert if not called by onlyFoundersDAO", async () => {
        await expect(
          medicalDAONFT.connect(deployer).setFoundersDAO(user.address),
        ).to.be.revertedWith("Sender is not the founders DAO");
      });

      it("should set if called by onlyFoundersDAO", async () => {
        await expect(
          await medicalDAONFT.connect(foundersDAO).setFoundersDAO(user.address),
        )
          .to.emit(medicalDAONFT, "FoundersDAOUpdated")
          .withArgs(user.address);
        expect(await medicalDAONFT.foundersDAO()).to.equal(user.address);
      });
    });

    describe("setFounderDAO2", async () => {
      it("should revert if not called by onlyFoundersDAO", async () => {
        await expect(
          medicalDAONFT.connect(deployer).setFoundersDAO2(user.address),
        ).to.be.revertedWith("Sender is not the founders DAO");
      });

      it("should set if called by onlyFoundersDAO", async () => {
        await expect(
          await medicalDAONFT
            .connect(foundersDAO)
            .setFoundersDAO2(user.address),
        )
          .to.emit(medicalDAONFT, "FoundersDAOUpdated2")
          .withArgs(user.address);
        expect(await medicalDAONFT.foundersDAO2()).to.equal(user.address);
      });
    });

    describe("setMinter", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          medicalDAONFT.connect(foundersDAO).setMinter(user.address),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should set if called by owner", async () => {
        await expect(
          await medicalDAONFT.connect(deployer).setMinter(user.address),
        )
          .to.emit(medicalDAONFT, "MinterUpdated")
          .withArgs(user.address);
        expect(await medicalDAONFT.minter()).to.equal(user.address);
      });
    });

    describe("setDescriptor", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          medicalDAONFT.connect(foundersDAO).setDescriptor(user.address),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should set if called by owner", async () => {
        await expect(
          await medicalDAONFT.connect(deployer).setDescriptor(user.address),
        )
          .to.emit(medicalDAONFT, "DescriptorUpdated")
          .withArgs(user.address);
        expect(await medicalDAONFT.descriptor()).to.equal(user.address);
      });
    });
  });

  describe("lockers", async () => {
    describe("lockMinter", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          medicalDAONFT.connect(foundersDAO).lockMinter(),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should lock if called by owner", async () => {
        await expect(
          await medicalDAONFT.connect(deployer).lockMinter(),
        ).to.emit(medicalDAONFT, "MinterLocked");
        expect(await medicalDAONFT.isMinterLocked()).to.equal(true);
      });
    });

    describe("lockDescriptor", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          medicalDAONFT.connect(foundersDAO).lockDescriptor(),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should lock if called by owner", async () => {
        await expect(
          await medicalDAONFT.connect(deployer).lockDescriptor(),
        ).to.emit(medicalDAONFT, "DescriptorLocked");
        expect(await medicalDAONFT.isDescriptorLocked()).to.equal(true);
      });
    });
  });

  describe("Algorithm", async () => {
    describe("checkIncentive", async () => {
      it("should return true if tokenId is 0", async () => {
        expect(await medicalDAONFT.checkIncentive(0)).to.equal(true);
      });

      it("should return false if tokenId is 1", async () => {
        expect(await medicalDAONFT.checkIncentive(1)).to.equal(false);
      });

      it("should return false if tokenId is 9", async () => {
        expect(await medicalDAONFT.checkIncentive(9)).to.equal(false);
      });

      it("should return true if tokenId is 10", async () => {
        expect(await medicalDAONFT.checkIncentive(10)).to.equal(true);
      });

      it("should return false if tokenId is 11", async () => {
        expect(await medicalDAONFT.checkIncentive(11)).to.equal(false);
      });

      it("should return false if tokenId is 19", async () => {
        expect(await medicalDAONFT.checkIncentive(19)).to.equal(false);
      });

      it("should return true if tokenId is 20", async () => {
        expect(await medicalDAONFT.checkIncentive(20)).to.equal(true);
      });

      it("should return false if tokenId is 21", async () => {
        expect(await medicalDAONFT.checkIncentive(21)).to.equal(false);
      });

      it("should return false if tokenId is 1829", async () => {
        expect(await medicalDAONFT.checkIncentive(1829)).to.equal(false);
      });

      it("should return false if tokenId is 1830", async () => {
        expect(await medicalDAONFT.checkIncentive(1830)).to.equal(false);
      });

      it("should return false if tokenId is 1831", async () => {
        expect(await medicalDAONFT.checkIncentive(1831)).to.equal(false);
      });
    });
  });

  describe("mint", async () => {
    it("should revert if not called by minter", async () => {
      await expect(medicalDAONFT.connect(deployer).mint()).to.be.revertedWith(
        "Sender is not the minter",
      );
    });

    it("should mint with no incentive", async () => {
      expect(await medicalDAONFT.getCurrentTokenId()).to.equal(1);
      expect(await descriptor.tokenURI(1)).to.equal(calcEncodedMetadata(1));
      await expect(await medicalDAONFT.connect(minter).mint())
        .to.emit(medicalDAONFT, "TokenCreated")
        .withArgs(1);
      expect(await medicalDAONFT.getCurrentTokenId()).to.equal(2);
      expect(await descriptor.tokenURI(2)).to.equal(calcEncodedMetadata(2));
    });

    it("should mint with incentive", async () => {
      for (let i = 1; i < 10; i++) {
        expect(await medicalDAONFT.getCurrentTokenId()).to.equal(i);
        await expect(await medicalDAONFT.connect(minter).mint()).not.to.be
          .reverted;
        expect(await medicalDAONFT.getCurrentTokenId()).to.equal(i + 1);
      }

      expect(await medicalDAONFT.balanceOf(foundersDAO.address)).to.equal(1);
      expect(await medicalDAONFT.balanceOf(foundersDAO2.address)).to.equal(0);
      expect(await medicalDAONFT.balanceOf(minter.address)).to.equal(9);

      expect(await medicalDAONFT.getCurrentTokenId()).to.equal(10);
      await expect(await medicalDAONFT.connect(minter).mint()).not.to.be
        .reverted;
      expect(await medicalDAONFT.getCurrentTokenId()).to.equal(13);

      expect(await medicalDAONFT.balanceOf(foundersDAO.address)).to.equal(2);
      expect(await medicalDAONFT.balanceOf(foundersDAO2.address)).to.equal(1);
      expect(await medicalDAONFT.balanceOf(minter.address)).to.equal(10);

      expect(await medicalDAONFT.ownerOf(10)).to.equal(foundersDAO.address);
      expect(await medicalDAONFT.ownerOf(11)).to.equal(foundersDAO2.address);
      expect(await medicalDAONFT.ownerOf(12)).to.equal(minter.address);
    });
  });

  describe("burn", async () => {
    beforeEach(async () => {
      await expect(await medicalDAONFT.connect(minter).mint()).not.to.be
        .reverted;
    });

    it("should revert if not called by minter", async () => {
      await expect(medicalDAONFT.connect(deployer).burn(0)).to.be.revertedWith(
        "Sender is not the minter",
      );
    });

    it("should burn if called and owned by minter", async () => {
      expect(await medicalDAONFT.ownerOf(1)).to.equal(minter.address);
      await expect(await medicalDAONFT.connect(minter).burn(1))
        .to.emit(medicalDAONFT, "TokenBurned")
        .withArgs(1);
    });

    it("should burn if called and not owned by minter", async () => {
      await expect(
        await medicalDAONFT
          .connect(minter)
          .transferFrom(minter.address, user.address, 1),
      ).not.to.be.reverted;

      await expect(await medicalDAONFT.connect(minter).burn(1))
        .to.emit(medicalDAONFT, "TokenBurned")
        .withArgs(1);
    });
  });
});

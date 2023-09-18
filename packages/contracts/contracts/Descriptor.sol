// SPDX-License-Identifier: GPL-3.0

// LICENSE
// Descriptor.sol is a modified version of NounsDAO's NounsDescriptorV2.sol
// NounsDescriptorV2.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

/// @title The descriptor

pragma solidity ^0.8.6;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {IDescriptor} from "./interfaces/IDescriptor.sol";
import {NFTDescriptor} from "./libs/NFTDescriptor.sol";

contract Descriptor is IDescriptor, Ownable {
  using Strings for uint256;

  /// @notice initial Base CID
  string public cid = "QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n";

  /**
   * @notice Set the base CID for all token IDs. It is automatically
   * added as a prefix to the value returned in {tokenURI}.
   * @dev This can only be called by the owner.
   */
  function setCID(string calldata _cid) external override onlyOwner {
    cid = _cid;

    emit BaseCIDUpdated(_cid);
  }

  /**
   * @notice Given a token ID and seed, construct a token URI for an official Medical DAO token.
   * @dev The returned value may be a base64 encoded data URI or an API URL.
   */
  function tokenURI(
    uint256 tokenId
  ) external view override returns (string memory) {
    string memory tokenIdString = tokenId.toString();
    NFTDescriptor.TokenURIParams memory params = NFTDescriptor.TokenURIParams({
      name: string.concat("Medical DAO NFT ", tokenIdString),
      description: string.concat(
        "Medical DAO NFT ",
        tokenIdString,
        " is a member of the Medical DAO"
      ),
      image: getImage(tokenId)
    });

    return NFTDescriptor.constructTokenURI(params);
  }

  /**
   * @notice Get an image for use in the ERC721 token URI.
   */
  function getImage(uint256 tokenId) public view returns (string memory) {
    return string.concat("ipfs://", cid, "/", tokenId.toString(), ".png");
  }
}

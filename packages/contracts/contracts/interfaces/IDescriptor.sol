// SPDX-License-Identifier: GPL-3.0

// LICENSE
// IDescriptor.sol is a modified version of NounsDAO's INounsDescriptorV2.sol
// INounsDescriptorV2.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

/// @title Interface for Descriptor

pragma solidity ^0.8.6;

import {IDescriptorMinimal} from "./IDescriptorMinimal.sol";

interface IDescriptor is IDescriptorMinimal {
  event BaseCIDUpdated(string baseCID);

  function setCID(string calldata baseURI) external;

  function tokenURI(
    uint256 tokenId
  ) external view override returns (string memory);

  function getImage(uint256 tokenId) external view returns (string memory);
}

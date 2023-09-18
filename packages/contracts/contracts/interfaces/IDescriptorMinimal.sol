// SPDX-License-Identifier: GPL-3.0

// LICENSE
// IDescriptorMinimal.sol is a modified version of NounsDAO's INounsDescriptorMinimal.sol
// INounsDescriptorMinimal.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

/// @title Common interface for Descriptor versions.

pragma solidity ^0.8.19;

interface IDescriptorMinimal {
  ///
  /// USED BY TOKEN
  ///

  function tokenURI(uint256 tokenId) external view returns (string memory);
}

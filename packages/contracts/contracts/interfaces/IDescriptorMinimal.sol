// SPDX-License-Identifier: GPL-3.0

// LICENSE
// IDescriptorMinimal.sol is a modified version of NounsDAO's INounsDescriptorMinimal.sol
// INounsDescriptorMinimal.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

/// @title Common interface for Descriptor versions.

pragma solidity ^0.8.6;

interface IDescriptorMinimal {
    ///
    /// USED BY TOKEN
    ///

    function tokenURI(uint256 tokenId) external view returns (string memory);

    function dataURI(uint256 tokenId) external view returns (string memory);

    ///
    /// USED BY SEEDER
    ///

    function backgroundCount() external view returns (uint256);

    function bodyCount() external view returns (uint256);

    function accessoryCount() external view returns (uint256);

    function headCount() external view returns (uint256);

    function glassesCount() external view returns (uint256);
}

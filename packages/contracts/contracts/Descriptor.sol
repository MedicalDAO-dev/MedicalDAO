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

    /// @notice Whether or not `tokenURI` should be returned as a data URI (Default: true)
    bool public override isDataURIEnabled = true;

    /// @notice Base URI, used when isDataURIEnabled is false
    string public override baseURI;

    /**
     * @notice Toggle a boolean value which determines if `tokenURI` returns a data URI
     * or an HTTP URL.
     * @dev This can only be called by the owner.
     */
    function toggleDataURIEnabled() external override onlyOwner {
        bool enabled = !isDataURIEnabled;

        isDataURIEnabled = enabled;
        emit DataURIToggled(enabled);
    }

    /**
     * @notice Set the base URI for all token IDs. It is automatically
     * added as a prefix to the value returned in {tokenURI}, or to the
     * token ID if {tokenURI} is empty.
     * @dev This can only be called by the owner.
     */
    function setBaseURI(string calldata _baseURI) external override onlyOwner {
        baseURI = _baseURI;

        emit BaseURIUpdated(_baseURI);
    }

    /**
     * @notice Given a token ID and seed, construct a token URI for an official Medical DAO token.
     * @dev The returned value may be a base64 encoded data URI or an API URL.
     */
    function tokenURI(
        uint256 tokenId
    ) external view override returns (string memory) {
        if (isDataURIEnabled) {
            return dataURI(tokenId);
        }
        return string(abi.encodePacked(baseURI, tokenId.toString()));
    }

    /**
     * @notice Given a token ID and seed, construct a base64 encoded data URI for an official Medical DAO token.
     */
    function dataURI(
        uint256 tokenId
    ) public pure override returns (string memory) {
        string memory tokenIdString = tokenId.toString();
        string memory name = string(
            abi.encodePacked("Medical DAO NFT ", tokenIdString)
        );
        string memory description = string(
            abi.encodePacked(
                "Medical DAO NFT ",
                tokenIdString,
                " is a member of the Medical DAO"
            )
        );

        return genericDataURI(name, description);
    }

    /**
     * @notice Given a name, description, and seed, construct a base64 encoded data URI.
     */
    function genericDataURI(
        string memory name,
        string memory description
    ) public pure override returns (string memory) {
        NFTDescriptor.TokenURIParams memory params = NFTDescriptor
            .TokenURIParams({name: name, description: description});
        return NFTDescriptor.constructTokenURI(params);
    }

    /**
     * @notice Get an image for use in the ERC721 token URI.
     */
    function getImage() external pure returns (string memory image) {
        return NFTDescriptor.getImage();
    }
}

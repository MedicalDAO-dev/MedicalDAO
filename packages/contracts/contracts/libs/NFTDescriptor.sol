// SPDX-License-Identifier: GPL-3.0

// LICENSE
// NFTDescriptor.sol is a modified version of NounsDAO's NFTDescriptorV2.sol
// NFTDescriptorV2.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

/// @title A library used to construct ERC721 token URIs

pragma solidity ^0.8.6;

import {Base64} from "base64-sol/base64.sol";

library NFTDescriptor {
    struct TokenURIParams {
        string name;
        string description;
    }

    /**
     * @notice Construct an ERC721 token URI.
     */
    function constructTokenURI(
        TokenURIParams memory params
    ) public view returns (string memory) {
        string memory image = getImage();

        // prettier-ignore
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked('{"name":"', params.name, '", "description":"', params.description, '", "image": "', 'data:image/svg+xml;base64,', image, '"}')
                    )
                )
            )
        );
    }

    /**
     * @notice Get an image for use in the ERC721 token URI.
     */
    function getImage() public view returns (string memory image) {
        return "";
    }
}

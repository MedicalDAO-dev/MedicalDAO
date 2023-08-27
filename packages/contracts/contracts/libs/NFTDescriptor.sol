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
        string image;
    }

    /**
     * @notice Construct an ERC721 token URI.
     */
    function constructTokenURI(
        TokenURIParams memory params
    ) internal pure returns (string memory) {
        // prettier-ignore
        return string(
            abi.encodePacked(
                'data:application/json;base64,',
                Base64.encode(
                    bytes(
                        abi.encodePacked('{"name":"', params.name, '", "description":"', params.description, '", "image": "ipfs://,', params.image, '"}')
                    )
                )
            )
        );
    }
}

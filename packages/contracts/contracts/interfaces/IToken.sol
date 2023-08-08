// SPDX-License-Identifier: GPL-3.0

// LICENSE
// INounsToken.sol is a modified version of NounsDAO's INounsToken.sol
// INounsToken.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

pragma solidity ^0.8.6;

import {IDescriptorMinimal} from "./IDescriptorMinimal.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IToken is IERC721 {
    event NounCreated(uint256 indexed tokenId);

    event NounBurned(uint256 indexed tokenId);

    event NoundersDAOUpdated(address noundersDAO);

    event NoundersDAOUpdated2(address noundersDAO2);

    event MinterUpdated(address minter);

    event MinterLocked();

    event DescriptorUpdated(IDescriptorMinimal descriptor);

    event DescriptorLocked();

    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;

    function dataURI(uint256 tokenId) external returns (string memory);

    function setNoundersDAO(address noundersDAO) external;

    function setNoundersDAO2(address noundersDAO2) external;

    function setMinter(address minter) external;

    function lockMinter() external;

    function setDescriptor(IDescriptorMinimal descriptor) external;

    function lockDescriptor() external;
}

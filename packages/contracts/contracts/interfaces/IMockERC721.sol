// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IMockERC721 is IERC721 {
    function mint() external returns (uint256);

    function burn(uint256 tokenId) external;

    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

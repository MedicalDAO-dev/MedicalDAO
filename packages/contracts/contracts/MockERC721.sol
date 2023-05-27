// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MockERC721 is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint256 currentTokenId;

    constructor() ERC721("MockERC721", "MTK") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint() public onlyRole(MINTER_ROLE) returns (uint256) {
        uint256 newTokenId = currentTokenId;
        _safeMint(msg.sender, newTokenId);
        ++currentTokenId;
        return newTokenId;
    }

    function burn(uint256 tokenId) public onlyRole(MINTER_ROLE) {
        _burn(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

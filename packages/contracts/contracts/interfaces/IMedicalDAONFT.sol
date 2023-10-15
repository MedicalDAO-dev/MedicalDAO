// SPDX-License-Identifier: GPL-3.0

// LICENSE
// IMedicalDAONFT.sol is a modified version of NounsDAO's INounsToken.sol
// INounsToken.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

pragma solidity ^0.8.19;

import {IDescriptorMinimal} from "./IDescriptorMinimal.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IMedicalDAONFT is IERC721 {
  event TokenCreated(uint256 indexed tokenId);

  event TokenBurned(uint256 indexed tokenId);

  event ContractUriUpdated(string contractUri);

  event FoundersDAOUpdated(address foundersDAO);

  event FoundersDAOUpdated2(address foundersDAO2);

  event MinterUpdated(address minter);

  event MinterLocked();

  event DescriptorUpdated(IDescriptorMinimal descriptor);

  event DescriptorLocked();

  function mint() external returns (uint256, bool);

  function burn(uint256 tokenId) external;

  function contractURI() external view returns (string memory);

  function setContractURIHash(string memory contractURIHash) external;

  function setFoundersDAO(address foundersDAO) external;

  function setFoundersDAO2(address foundersDAO2) external;

  function setMinter(address minter) external;

  function lockMinter() external;

  function setDescriptor(IDescriptorMinimal descriptor) external;

  function lockDescriptor() external;

  function getCurrentTokenId() external view returns (uint256);

  function checkIncentive(uint256 tokenId) external pure returns (bool);
}

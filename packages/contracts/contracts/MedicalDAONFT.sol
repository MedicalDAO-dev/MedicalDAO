// SPDX-License-Identifier: GPL-3.0

// LICENSE
// This is a modified version of NounsDAO's NounsToken.sol
// MedicalDAONFT.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

pragma solidity ^0.8.19;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC721Checkpointable} from "./base/ERC721Checkpointable.sol";
import {IDescriptorMinimal} from "./interfaces/IDescriptorMinimal.sol";
import {IMedicalDAONFT} from "./interfaces/IMedicalDAONFT.sol";
import {ERC721} from "./base/ERC721.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract MedicalDAONFT is IMedicalDAONFT, Ownable, ERC721Checkpointable {
  // The founders DAO address (creators org)
  address public foundersDAO;

  // The founders DAO address 2 (creators org 2)
  address public foundersDAO2;

  // An address who has permissions to mint tokens
  address public minter;

  // The token URI descriptor
  IDescriptorMinimal public descriptor;

  // Whether the minter can be updated
  bool public isMinterLocked;

  // Whether the descriptor can be updated
  bool public isDescriptorLocked;

  // The internal token ID tracker
  uint256 private _currentTokenId;

  // IPFS content hash of contract-level metadata
  string private _contractURIHash =
    "QmZi1n79FqWt2tTLwCqiy6nLM6xLGRsEPQ5JmReJQKNNzX";

  /**
   * @notice Require that the minter has not been locked.
   */
  modifier whenMinterNotLocked() {
    require(!isMinterLocked, "Minter is locked");
    _;
  }

  /**
   * @notice Require that the descriptor has not been locked.
   */
  modifier whenDescriptorNotLocked() {
    require(!isDescriptorLocked, "Descriptor is locked");
    _;
  }

  /**
   * @notice Require that the sender is the founders DAO.
   */
  modifier onlyFoundersDAO() {
    require(msg.sender == foundersDAO, "Sender is not the founders DAO");
    _;
  }

  /**
   * @notice Require that the sender is the minter.
   */
  modifier onlyMinter() {
    require(msg.sender == minter, "Sender is not the minter");
    _;
  }

  constructor(
    address _foundersDAO,
    address _foundersDAO2,
    address _minter,
    IDescriptorMinimal _descriptor
  ) ERC721("MedicalDAO NFT", "MD NFT") {
    foundersDAO = _foundersDAO;
    foundersDAO2 = _foundersDAO2;
    minter = _minter;
    descriptor = _descriptor;
  }

  /**
   * @notice The IPFS URI of contract-level metadata.
   */
  function contractURI() public view returns (string memory) {
    return string(abi.encodePacked("ipfs://", _contractURIHash));
  }

  /**
   * @notice Set the _contractURIHash.
   * @dev Only callable by the owner.
   */
  function setContractURIHash(
    string memory newContractURIHash
  ) external onlyOwner {
    _contractURIHash = newContractURIHash;
  }

  /**
   * @notice Mint a token to the minter, along with a possible founders reward
   * token. Founders reward tokens are minted every 10 tokens, starting at 0,
   * until 183 founder tokens have been minted (5 years w/ 24 hour auctions).
   * @dev Call _mintTo with the to address(es).
   */
  function mint() public override onlyMinter returns (uint256, bool) {
    bool isInsentive = checkInsentive(_currentTokenId);

    if (isInsentive) {
      _mintTo(foundersDAO, _currentTokenId++);
      _mintTo(foundersDAO2, _currentTokenId++);
    }

    uint newTokenId = _mintTo(minter, _currentTokenId++);
    return (newTokenId, isInsentive);
  }

  /**
   * @notice Burn a token.
   */
  function burn(uint256 tokenId) public override onlyMinter {
    _burn(tokenId);
    emit TokenBurned(tokenId);
  }

  /**
   * @notice A distinct Uniform Resource Identifier (URI) for a given asset.
   * @dev See {IERC721Metadata-tokenURI}.
   */
  function tokenURI(
    uint256 tokenId
  ) public view override returns (string memory) {
    require(_exists(tokenId), "MedicalDAONFT: URI query for nonexistent token");
    return descriptor.tokenURI(tokenId);
  }

  /**
   * @notice Set the founders DAO.
   * @dev Only callable by the founders DAO when not locked.
   */
  function setFoundersDAO(
    address _foundersDAO
  ) external override onlyFoundersDAO {
    foundersDAO = _foundersDAO;

    emit FoundersDAOUpdated(_foundersDAO);
  }

  /**
   * @notice Set the founders DAO 2.
   * @dev Only callable by the founders DAO 2 when not locked.
   */
  function setFoundersDAO2(
    address _foundersDAO2
  ) external override onlyFoundersDAO {
    foundersDAO2 = _foundersDAO2;

    emit FoundersDAOUpdated2(_foundersDAO2);
  }

  /**
   * @notice Set the token minter.
   * @dev Only callable by the owner when not locked.
   */
  function setMinter(
    address _minter
  ) external override onlyOwner whenMinterNotLocked {
    minter = _minter;

    emit MinterUpdated(_minter);
  }

  /**
   * @notice Lock the minter.
   * @dev This cannot be reversed and is only callable by the owner when not locked.
   */
  function lockMinter() external override onlyOwner whenMinterNotLocked {
    isMinterLocked = true;

    emit MinterLocked();
  }

  /**
   * @notice Set the token URI descriptor.
   * @dev Only callable by the owner when not locked.
   */
  function setDescriptor(
    IDescriptorMinimal _descriptor
  ) external override onlyOwner whenDescriptorNotLocked {
    descriptor = _descriptor;

    emit DescriptorUpdated(_descriptor);
  }

  /**
   * @notice Lock the descriptor.
   * @dev This cannot be reversed and is only callable by the owner when not locked.
   */
  function lockDescriptor()
    external
    override
    onlyOwner
    whenDescriptorNotLocked
  {
    isDescriptorLocked = true;

    emit DescriptorLocked();
  }

  /**
   * @notice Mint a token with `tokenId` to the provided `to` address.
   */
  function _mintTo(address to, uint256 tokenId) internal returns (uint256) {
    _mint(owner(), to, tokenId);
    emit TokenCreated(tokenId);

    return tokenId;
  }

  function getCurrentTokenId() external view returns (uint256) {
    return _currentTokenId;
  }

  function checkInsentive(uint256 tokenId) public pure returns (bool) {
    return tokenId <= 1820 && tokenId % 10 == 0;
  }
}

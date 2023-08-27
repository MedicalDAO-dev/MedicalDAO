# デプロイについて

## Founder が用意するアドレス

1. `foundersDAO` : Founder のインセンティブ分の NFT の送信先
2. `foundersDAO2` : 後日、別のインセンティブトークンによって購入できる分の NFT の送信先
3. `owner` : DAO の Executor コントラクトの代替。トレジャリーに相当する。
4. `deployer`: 各コントラクトをデプロイするためのアドレス。

## 作業手順

デプロイは各コントラクトの `owner` になる Founder の EOA アドレス No.3 から行う。

1. `Descriptor.sol` のデプロイ

2. `Token.sol` のデプロイ  
   コンストラクタの引数

   - \_foundersDAO: Founder の EOA アドレス No.1
   - \_foundersDAO2: Founder の EOA アドレス No.2
   - \_minter: Founder の EOA アドレス No.3 (後で `AuctionHouse.sol` の Proxy のアドレスをセットする)
   - \_descriptor: `Descriptor.sol` のアドレス

3. `AuctionHouse.sol` のデプロイ

   コンストラクタの引数

   - \_nft: `Token.sol` のアドレス
   - \_weth: WETH のコントラクトアドレス
   - \_timeBuffer: 300
   - \_reservePrice: 1
   - \_minBidIncrementPercentage: 2
   - \_duration: 86400

4. `setMinter()` を実行して `AuctionHouse.sol` の Proxy のアドレスを `Token.sol` の `minter` にセットする
   `setMinter()` の引数
   - \_minter: `AuctionHouse.sol` の Proxy のアドレス

## コントラクトの連携

Nouns 本家の連携は以下のイシューのコメント欄にまとめてあります。
https://github.com/UnyteDAO/MedicalDAO/issues/7

### 1. Descriptor.sol

NFT のメタデータを作成するコントラクト。
`Token.sol` から読み込まれ、切り替えの権限は `Token.sol` の ` owner` である DAO の Executor コントラクトが持つ。
今回は Founder の EOA アドレスとする。

**owner**: Founder の EOA アドレス No.3 ( DAO の Executor コントラクトの代替)

- `baseURI` とオンチェーンメタデータの切り替え

### 2. Token.sol

NFT のコントラクト。

**owner**: Founder の EOA アドレス No.3 ( DAO の Executor コントラクトの代替)

- `minter` のセット
- `descriptor` のセット
- `isMinterLocked` の切り替え
- `isDescriptorLocked` の切り替え

**foundersDAO**: Founder の EOA アドレス 1

### 3. AuctionHouse.sol

**owner**: Founder の EOA アドレス No.3 ( DAO の Executor コントラクトの代替)

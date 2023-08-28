# MedicalDAO

# ディレクトリ構成
モノレポ構成
- packages/interface -> フロントエンド
- packages/contracts -> コントラクト
# 環境
- Node.js v16系
- フロントエンド
  - Next.js (v13)
	  - TypeScript
		- TailwindCSS
	- viem
- バックエンド
  - Next.js
	  - TypeScript
- コントラクト
  - Hardhat
	  - Solidity (v0.8.18)
	  - TypeScript

# Getting Started
## フロントエンド・バックエンド

```bash
cd packages/interface
npm i
npm run dev
```


## コントラクト

```bash
cd packages/contracts
npm i
```

### コントラクトのテストデプロイ
**バージョン3**
```
Descriptor address: 0xA2a79E5fd747756E71333Fd68EA117F6191Ec314
Token address: 0xB0B8D5346A93D73513AFAf165bD882f58055c81B
AuctionHouseProxy address: 0x8469630D9f204b2F55FfABB27eDf9ecb25400763
AuctionHouse implementation address: 0x6AFf29eBd3bE51ced0773FEc596696AF0812C97a
```

# Link
- [MedicalDAO UI モックアップ](https://www.figma.com/file/oUC8oCIcjxOde8ty8XqFe7/MedicalDAO?type=design&node-id=0-1&t=bz75t3gq5WUXDVfk-0)

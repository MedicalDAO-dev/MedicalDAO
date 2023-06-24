# Frontend

MedicalDAOのフロントエンドです。  
[Next.js](https://nextjs.org/)を使用しています。

## ディレクトリ構成
- public -> 公開したいファイルの格納場所
	- images -> 画像
- src -> ソースコードをまとめたディレクトリ
	- components -> 共通コンポーネント
		- elements -> 要素(ex. button, input)
		- layouts -> ページのレイアウト
			- Footer -> フッター
			- Header -> ヘッダー
			- Main -> メイン部分（body）
				- Mainページ名 -> ページごとのメイン部分
	- const -> 定数
	- dev -> 開発版でのみ使用するコンポーネント
	- features -> 機能ごとの独自コンポーネント
		- 機能名 -> 機能別に分ける
			- api -> 機能ごとのAPI関連
				- contracts -> コントラクトAPI
			- components -> 機能ごとの独自コンポーネント置き場
	- hooks -> カスタムフック
	- lib -> 共通機能
	- models -> 状態変数をまとめる
	- pages -> webページ
		- api -> Next.jsのAPI
	- styles -> 共通スタイル(global.cssのみ)
	- stores -> 状態変数の実体
	- types -> 型定義
	- utils -> 便利関数まとめ

## Getting Started

```bash
npm i
npm run dev
```

を実行後、 [http://localhost:3000](http://localhost:3000) にアクセスしてください。

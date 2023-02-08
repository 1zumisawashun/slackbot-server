# slackbot-server

slackbot-server のリポジトリです。

## Overview

本来は slack 通知の検証として使っていたリポジトリだが他の検証も重ねているうちに肥大化してしまった  
現在は LIFF アプリとして活用している  
リポジトリ名が slackbot-server と命名されているが中身は LIFF アプリなので注意  

- slack（Incoming Webhooks）の検証
- liff の検証
- line ログインの検証
- stripe（cloud functions）の検証
- firebase ver9 の検証

※下記 QR コード読み取りで LINE チャネルに遷移できます。  
※LINEチャネルに遷移後「いでよ」メッセージを打つことでLIFFアプリを返答します。

<img width="996" alt="image" src="https://user-images.githubusercontent.com/65071534/217398285-c3fcf34c-944e-47de-8c37-da1713275dfc.png">

## 環境

- react 18.2.0
- firebase 9.15.0
- typescript 4.9.3
- stripe 11.7.0
- @stripe/react-stripe-js 1.16.3
- @stripe/stripe-js 1.46.0

## Installation

- clone

```bash
$ git clone git@github.com:1zumisawashun/slackbot-server.git
$ cd slackbot-server
```

- install

```bash
$ npm install
```

- ローカル開発用 URL を開き動作確認をする

```bash
$ npm run dev
```

http://127.0.0.1:5173/

- 上記の手順で失敗する場合 [Troubleshoot](#Troubleshoot)を確認してください

## How to

- フォーマットを効かせる

```bash
$ npm run lint
```

## Troubleshoot

- なし

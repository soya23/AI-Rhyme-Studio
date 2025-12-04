# 🎤 ラップde老GO (Rap DE Rogo)

## 概要
**「人生、謳歌しよう。思い出をビートに乗せて。」**

シニア世代が歩んできた思い出をラップに変換して残す、Next.js 製のウェブアプリです。思い出メモを入力すると AI が韻を踏んだ歌詞を生成し、クイズで遊びながら言葉を集められます。演歌や童謡を想起させるビートを選び、家族や友人と一緒に “人生アルバム” を楽しめます。

## ✨ 主な特徴
- **AI 作詞サポート**: 思い出を入力すると OpenAI Chat Completions が温かい日本語ラップを提案。
- **韻踏みクイズ**: ターゲット単語から韻を踏む言葉を当てるゲームで、語彙力アップと脳トレを両立。
- **シニアフレンドリーな UI**: 大きめのボタンと高コントラスト配色で操作しやすい画面に設計。
- **人生アルバム**: 生成した歌詞とジャケット画像を保存し、いつでも振り返れるアーカイブを提供。

## 🛠 技術スタック
- **Frontend**: Next.js (App Router) + React + TypeScript
- **Styling**: Tailwind CSS / next/font
- **AI**: OpenAI API（`/app/api/lyric` と `/app/api/rhyme` でサーバーサイド呼び出し）

## 🚀 開発環境
1. 依存関係をインストール  
   ```bash
   npm install
   ```
2. `.env.local` に OpenAI API キーなどを設定（例）
   ```env
   OPENAI_API_KEY=sk-xxxx
   OPENAI_MODEL=gpt-4o-mini
   ```
   OpenAIキーはサーバー環境変数としてのみ使用し、画面上には表示しません。
3. 開発サーバーを起動  
   ```bash
   npm run dev
   ```
   `http://localhost:3000` でアプリと API Routes の両方が動作します。  
4. 本番ビルド  
   ```bash
   npm run build
   npm start
   ```

## 📂 主なディレクトリ
- `app/` — Next.js App Router（ページ、レイアウト、API Routes、グローバル CSS）
- `components/` — UI コンポーネント群
- `services/` — クライアント側で呼び出す API ラッパー
- `constants.ts / types.ts` — 画面構成データと TypeScript 型
- `lib/api.ts` — API Routes で共通利用するヘッダー処理

## 🔐 API キー運用メモ
- 本番デプロイでは Vercel の Project Settings で `OPENAI_API_KEY` を設定してください。
- ローカル検証中にキーを隠したい場合は、画面の入力欄に貼り付けることで `.env.local` がなくても AI 機能を試せます。

---
ご意見・改善案などあればお気軽にどうぞ。楽しいラップ作りを！ 💿

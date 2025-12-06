import type { AppData } from './types';

export const APP_DATA: AppData ={
  "version": "1.0",
  "app": {
    "name": "ラップDE老GO",
    "description": "高齢者が自分の人生や思い出を“ラップ”で表現できるアプリ。AI韻カードを使って家族と一緒に作詞・録音し、“人生アルバム”として残せます。"
  },
  "screens": [
    {
      "id": "home",
      "title": "🎤 ラップDE老GO",
      "text": "ようこそ『ラップDE老GO』へ！\nここでは、あなたの思い出を“韻”に乗せて残すことができます。\n今日はどんな気持ちをラップにしてみますか？",
      "options": [
        {
          "label": "1. ビートをえらぶ",
          "next": "beat_select"
        },
        {
          "label": "2. 歌詞を書いてみる",
          "next": "lyric"
        },
        {
          "label": "3. ラップを録音する",
          "next": "record_select"
        },
        {
          "label": "4. 動画をつくる",
          "next": "video_create_select"
        },
        {
          "label": "5. 思い出アルバムを見る",
          "next": "album"
        }
      ]
    },
    {
      "id": "beat_select",
      "title": "🎧 ビートを選ぶ",
      "text": "気分にぴったりのビートを選びましょう！\nビートを再生して、ノリの合うものを選んでください。",
      "options": [
        {
          "label": "🎶 演歌風ビート（しっとり）",
          "next": "lyric"
        },
        {
          "label": "🥁 ずんどこ風（懐メロテンポ）",
          "next": "lyric"
        },
        {
          "label": "👶 童謡風（かわいい）",
          "next": "lyric"
        },
        {
          "label": "🌸 自由風（おまかせ）",
          "next": "lyric"
        },
        {
          "label": "⬅️ ホームに戻る",
          "next": "home"
        }
      ]
    },
    {
      "id": "lyric",
      "title": "✏️ 歌詞を作成",
      "text": "思い出を歌詞にしてみましょう！\n家族や孫と一緒に考えるのもおすすめです。",
      "ai_prompt": "ユーザーが入力した文章をもとに、懐かしい思い出をテーマにしたラップの1節を日本語で提案してください。生成する歌詞には「Verse 1」のようなセクション名や括弧、ローマ字（例: Yo, Check it out）は含めないでください。",
      "options": [
        {
          "label": "🎙️ 録音する",
          "next": "record_select"
        },
        {
          "label": "⬅️ ホームに戻る",
          "next": "home"
        }
      ]
    },
    {
      "id": "record_select",
      "title": "🎙️ 録音方法を選ぶ",
      "text": "あなたのラップをどうやって形にしますか？\n自分で歌うか、AIに任せるか選べます。",
      "options": [
        {
          "label": "自分で録音する",
          "next": "record"
        },
        {
          "label": "AIに歌ってもらう（デモ）",
          "next": "mv_demo"
        },
        {
          "label": "⬅️ ホームに戻る",
          "next": "home"
        }
      ]
    },
    {
      "id": "record",
      "title": "🎙️ 自分で録音しよう",
      "text": "準備はいいですか？\nビートに合わせて、あなたの人生ラップを録音しましょう！",
      "options": [
        {
          "label": "▶️ 録音開始（デモ）",
          "next": "mv_demo"
        },
        {
          "label": "⬅️ 録音方法を選ぶ",
          "next": "record_select"
        }
      ]
    },
    {
      "id": "video_create_select",
      "title": "🎞️ 動画の作り方を選ぶ",
      "text": "歌詞とビートに合わせる動画をどうやって作りますか？",
      "options": [
        {
          "label": "カメラで新しく撮影する",
          "next": "mv_demo"
        },
        {
          "label": "スマホから写真を選ぶ",
          "next": "mv_demo"
        },
        {
          "label": "AIで動画を生成する（デモ）",
          "next": "mv_demo"
        },
        {
          "label": "⬅️ ホームに戻る",
          "next": "home"
        }
      ]
    },
    {
      "id": "mv_demo",
      "title": "🎞️ MVプレビュー",
      "text": "録音した音声や選んだ写真で、人生MVが完成します（デモ表示）。",
      "options": [
        {
          "label": "🎉 アルバムに保存して完成！",
          "next": "album"
        }
      ]
    },
    {
      "id": "album",
      "title": "📔 思い出アルバム",
      "text": "ここは思い出アルバム。これまで作ったラップが並びます。家族や友達と一緒に聴いて、思い出を語り合いましょう。",
      "options": [
        {
          "label": "▶️ ラップを再生（デモ）",
          "next": "home"
        },
        {
          "label": "📤 家族に共有（デモ）",
          "next": "home"
        },
        {
          "label": "⬅️ ホームに戻る",
          "next": "home"
        }
      ]
    }
  ]
};

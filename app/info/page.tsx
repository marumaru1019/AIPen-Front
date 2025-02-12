"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePreview } from "../PreviewContext";
import {
  Button,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";

// 固定のページ番号（フォームには表示しない）
const getFixedPageNum = (type: string | null) => (type === "ehon" ? 2 : 4);

export default function InfoPage() {
  const router = useRouter();
  const { type, setPreviewHTML } = usePreview();

  // 選択肢（Genre）
  const genreOptions = [
    "ファンタジー",
    "冒険",
    "ミステリー",
    "サイエンスフィクション",
    "ホラー",
    "ラブストーリー",
    "コメディ",
    "歴史",
    "スポーツ",
    "動物",
  ];

  // 選択肢（Style）— 絵本と漫画で異なる
  const styleOptionsEhon = [
    "和風",
    "洋風",
    "モダン",
    "クラシック",
    "カラフル",
    "シンプル",
    "ナチュラル",
    "キュート",
    "ビンテージ",
    "ポップ",
  ];
  const styleOptionsManga = [
    "少女漫画",
    "少年漫画",
    "ギャグ漫画",
    "SF漫画",
    "アクション漫画",
    "ロマンス漫画",
    "ホラー漫画",
    "スポーツ漫画",
    "サスペンス漫画",
    "ファンタジー漫画",
  ];

  const [genre, setGenre] = useState("");
  const [style, setStyle] = useState("");
  const [outline, setOutline] = useState("");
  const [loading, setLoading] = useState(false);

  // アニメーション用：入力フィールドにフォーカスしたら、ふわっと影が広がるイメージ
  const fieldFocusVariants = {
    initial: { boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    focused: { boxShadow: "0px 0px 8px rgba(0,0,0,0.3)" },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fixedPageNum = getFixedPageNum(type);
    const body = {
      panel_num: fixedPageNum,
      commit_outline: outline,
      genre: genre,
      style: style,
    };

    const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendBase) {
      console.error("環境変数 NEXT_PUBLIC_BACKEND_URL が設定されていません");
      alert("サーバ設定エラーです");
      setLoading(false);
      return;
    }

    const endpoint = type === "ehon" ? "/ehon/" : "/manga/";
    const backendUrl = `${backendBase}${endpoint}`;

    // Base64 をUTF-8で正しくデコードする関数
    function base64DecodeUnicode(str: string) {
      return decodeURIComponent(
        Array.prototype.map
          .call(atob(str), (c: string) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
    }

    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error("APIリクエストに失敗しました");
      }
      const data = await res.json();
      const htmlBase64 = data.output_html_base64;
      const decodedHTML = base64DecodeUnicode(htmlBase64);
      setPreviewHTML(decodedHTML);
      router.push("/preview");
    } catch (error: any) {
      console.error(error);
      alert("エラーが発生しました: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/fantasy-forest.png')] bg-cover bg-center flex items-center justify-center p-4">
      <Paper className="p-8 max-w-md w-full rounded-2xl shadow-2xl bg-white bg-opacity-90">
        {/* タイトルをもっとワクワクする文言に変更 */}
        <Typography variant="h4" className="mb-6 text-primary text-center font-bold">
          あなただけの物語を作ろう！
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Genre 選択 */}
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              label="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="rounded-lg"
            >
              {genreOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Style 選択（type によって選択肢を切り替え） */}
          <FormControl variant="outlined" fullWidth required>
            <InputLabel id="style-label">Style</InputLabel>
            <Select
              labelId="style-label"
              label="Style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="rounded-lg"
            >
              {(type === "ehon" ? styleOptionsEhon : styleOptionsManga).map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Outline 入力 */}
          <motion.div
            variants={fieldFocusVariants}
            initial="initial"
            whileFocus="focused"
          >
            <TextField
              label="Outline"
              value={outline}
              onChange={(e) => setOutline(e.target.value)}
              required
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              InputProps={{ className: "rounded-lg" }}
            />
          </motion.div>
          {/* 送信ボタン */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ py: 3, fontSize: "1.25rem", color: "white" }}
              className="rounded-full shadow-xl transition-all duration-300"
            >
              {loading ? "物語を作成中…" : "物語を作る"}
            </Button>
          </motion.div>
        </form>
      </Paper>
    </div>
  );
}

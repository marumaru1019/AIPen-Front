// app/info/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePreview } from "../PreviewContext";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function InfoPage() {
  const router = useRouter();
  const { type, setPreviewHTML } = usePreview();

  // 絵本の場合に必要な情報
  const [panelNum, setPanelNum] = useState(1);
  const [commitOutline, setCommitOutline] = useState("");
  const [genre, setGenre] = useState("");
  const [style, setStyle] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const body = {
      panel_num: panelNum,
      commit_outline: commitOutline,
      genre: genre,
      style: style,
    };

    // バックエンド API のエンドポイント
    const endpoint = type === "ehon" ? "/ehon" : "/manga";
    const backendUrl = `https://app-aipen-dalle-acb3beb7fzgfaxa9.japaneast-01.azurewebsites.net${endpoint}`;

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
      // バックエンドから返ってくるHTMLはBase64エンコードされている前提
      const htmlBase64 = data.output_html_base64;
      const decodedHTML = atob(htmlBase64);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Paper className="p-8 max-w-md w-full rounded-xl shadow-lg">
        <Typography variant="h4" className="mb-6 text-primary text-center">
          必要情報を入力
        </Typography>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField
            label="Panel Number"
            type="number"
            value={panelNum}
            onChange={(e) => setPanelNum(Number(e.target.value))}
            required
            variant="outlined"
            fullWidth
            InputProps={{ className: "rounded-lg" }}
          />
          <TextField
            label="Commit Outline"
            value={commitOutline}
            onChange={(e) => setCommitOutline(e.target.value)}
            required
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            InputProps={{ className: "rounded-lg" }}
          />
          <TextField
            label="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            variant="outlined"
            fullWidth
            InputProps={{ className: "rounded-lg" }}
          />
          <TextField
            label="Style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            required
            variant="outlined"
            fullWidth
            InputProps={{ className: "rounded-lg" }}
          />
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
              {loading ? "生成中..." : "プレビューを作成"}
            </Button>
          </motion.div>
        </form>
      </Paper>
    </div>
  );
}

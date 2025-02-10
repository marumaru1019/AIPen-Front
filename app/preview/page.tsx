"use client";
import { usePreview } from "../PreviewContext";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const { previewHTML, type } = usePreview();
  console.log(type);
  const router = useRouter();

  // type に応じた iframe のサイズを設定する
  // 絵本（ehon）の場合は A4 landscape (幅: 297mm, 高さ: 210mm)
  // 漫画（manga）の場合は A4 portrait (幅: 210mm, 高さ: 297mm)
  const iframeStyle = type === "ehon"
    ? { width: "297mm", height: "210mm" }
    : { width: "210mm", height: "297mm" };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      <Typography variant="h4" className="mb-4 text-primary">
        プレビュー
      </Typography>
      {previewHTML ? (
        <iframe
          title="プレビュー"
          srcDoc={previewHTML}
          className="border-none"
          style={iframeStyle}
        />
      ) : (
        <Typography variant="h6">
          プレビュー情報がありません。再度入力してください。
        </Typography>
      )}
      <Button
        variant="outlined"
        color="secondary"
        className="mt-6 rounded-full"
        onClick={() => router.push("/info")}
      >
        入力に戻る
      </Button>
    </div>
  );
}

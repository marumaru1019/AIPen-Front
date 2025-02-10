// app/preview/page.tsx
"use client";

import { usePreview } from "../PreviewContext";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PreviewPage() {
  const { previewHTML } = usePreview();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      <Typography variant="h4" className="mb-4 text-primary">
        プレビュー
      </Typography>
      {previewHTML ? (
        <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-xl" dangerouslySetInnerHTML={{ __html: previewHTML }} />
      ) : (
        <Typography variant="h6">プレビュー情報がありません。再度入力してください。</Typography>
      )}
      <Button variant="outlined" color="secondary" className="mt-6 rounded-full" onClick={() => router.push("/info")}>
        入力に戻る
      </Button>
    </div>
  );
}

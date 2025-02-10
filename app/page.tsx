// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { usePreview } from "./PreviewContext";
import { Button, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { FaBook, FaComic } from "react-icons/fa";

export default function SelectionPage() {
  const router = useRouter();
  const { setType } = usePreview();

  const handleSelect = (selectedType: string) => {
    setType(selectedType);
    router.push("/info");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Typography variant="h2" className="mb-8 text-primary font-bold">
        どっちを作る？
      </Typography>
      <div className="flex gap-8">
        <Card className="w-64 hover:shadow-2xl transition transform hover:-translate-y-1">
          <CardActionArea onClick={() => handleSelect("ehon")}>
            <CardContent className="flex flex-col items-center">
              <FaBook className="text-6xl text-accent mb-4" />
              <Typography variant="h5" color="primary">絵本を作る</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="w-64 hover:shadow-2xl transition transform hover:-translate-y-1">
          <CardActionArea onClick={() => handleSelect("manga")}>
            <CardContent className="flex flex-col items-center">
              <FaComic className="text-6xl text-accent mb-4" />
              <Typography variant="h5" color="primary">漫画を作る</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

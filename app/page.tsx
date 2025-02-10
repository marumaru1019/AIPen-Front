"use client";

import { useRouter } from "next/navigation";
import { usePreview } from "./PreviewContext";
import { Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import { SiComicfury } from "react-icons/si";

export default function SelectionPage() {
  const router = useRouter();
  const { setType } = usePreview();

  const handleSelect = (selectedType: string) => {
    setType(selectedType);
    router.push("/info");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* 左側：イラストエリア */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 relative">
        {/* /public/child-friendly-book.png を用意してください */}
        <motion.img
          src="/child-friendly-book.png"
          alt="Happy Book Illustration"
          className="w-3/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
      {/* 右側：ボタンエリア（上下に分割） */}
      <div className="w-1/2 flex flex-col">
        {/* 上半分：絵本作成ボタン */}
        <div className="h-1/2 flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-[80%]">
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 3, fontSize: "1.25rem", color: "white" }}
              className="rounded-full shadow-xl transition-all duration-300"
              onClick={() => handleSelect("ehon")}
            >
              <FaBookOpen className="text-3xl mr-2" />
              絵本を作る
            </Button>
          </motion.div>
        </div>
        {/* 下半分：漫画作成ボタン */}
        <div className="h-1/2 flex items-center justify-center bg-gradient-to-r from-yellow-100 to-orange-100">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-[80%]">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              sx={{ py: 3, fontSize: "1.25rem", color: "white" }}
              className="rounded-full shadow-xl transition-all duration-300"
              onClick={() => handleSelect("manga")}
            >
              <SiComicfury className="text-3xl mr-2" />
              漫画を作る
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

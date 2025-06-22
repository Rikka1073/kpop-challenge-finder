"use client";

import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
// import Link from "next/link";
import { useState } from "react";

export default function Search() {
  const [id, setId] = useState("");

  // デモデータ
  // 本来はAPIから取得することを想定
  // ここでは簡単なデモデータを使用
  const demoData = [
    {
      id: 1,
      group: "LE_SSERAFIM",
      song: "UNFORGIVEN",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 2,
      group: "aespa",
      song: "Whiplash",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 3,
      group: "LE_SSERAFIM",
      song: "ANTIFRAGILE",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 4,
      group: "LE_SSERAFIM",
      song: "UNFORGIVEN",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 5,
      group: "aespa",
      song: "supernova",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 6,
      group: "LE_SSERAFIM",
      song: "supernova",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },

    {
      id: 7,
      group: "aespa",
      song: "UNFORGIVEN",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 8,
      group: "LE_SSERAFIM",
      song: "Whiplash",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 9,
      group: "aespa",
      song: "ANTIFRAGILE",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
    {
      id: 10,
      group: "aespa",
      song: "UNFORGIVEN",
      link: "https://www.youtube.com/shorts/GqbK3rcQkg8?feature=share",
    },
  ];

  // デモデータからグループと楽曲のユニークな値を取得
  const uniqueGroups = demoData.filter(
    (item, index, self) => index === self.findIndex((v) => v.group === item.group)
  );

  const uniqueSong = demoData.filter(
    (item, index, self) => index === self.findIndex((v) => v.song === item.song)
  );

  // 選択されたグループまたは楽曲に基づいてデモデータをフィルタリング
  const filteredDemoData = demoData.filter((item) => item.song === id || item.group === id);

  return (
    <>
      <Layout>
        <Header />
        <h2 className="text-4xl font-bold mb-3 text-center text-violet-500">
          ダンスチャレンジ検索
        </h2>
        <div className="text-center mb-6">お気に入りの楽曲やグループを選んで検索しよう！</div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-3">楽曲で検索</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueSong &&
              uniqueSong.map((item) => (
                <Button
                  key={item.id}
                  id="item.id"
                  onClick={() => setId(item.song)}
                  className="rounded-2xl"
                >
                  #{item.song}
                </Button>
              ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold mb-3">グループで検索</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueGroups &&
              uniqueGroups.map((item) => (
                <Button
                  key={item.id}
                  id="item.id"
                  onClick={() => setId(item.group)}
                  className="rounded-2xl"
                >
                  #{item.group}
                </Button>
              ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4 items-center">
            <h3 className="text-2xl font-bold mb-3">検索結果（{filteredDemoData.length}件）</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDemoData &&
              filteredDemoData.map((video) => (
                <div key={video.id} className="mb-4">
                  <VideoCard video={video} />
                </div>
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
}

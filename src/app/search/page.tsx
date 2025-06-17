"use client";

import { Header } from "@/components/common/header";
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
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3">楽曲で検索</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueSong &&
              uniqueSong.map((item) => (
                <Button key={item.id} id="item.id" onClick={() => setId(item.song)}>
                  #{item.song}
                </Button>
              ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-3">グループで検索</h2>
          <div className="flex flex-wrap gap-2">
            {uniqueGroups &&
              uniqueGroups.map((item) => (
                <Button key={item.id} id="item.id" onClick={() => setId(item.group)}>
                  #{item.group}
                </Button>
              ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4 items-center">
            <h2 className="text-2xl font-bold mb-3">結果</h2>
            <p className="text-2xl  mb-3">{filteredDemoData.length}件</p>
          </div>
          {filteredDemoData &&
            filteredDemoData.map((item) => (
              <div key={item.id} className="mb-4">
                <div>{item.song}</div>
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
}

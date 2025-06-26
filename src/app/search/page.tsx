"use client";

import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { fetchSongs } from "@/utils/supabaseFunction";
import { useState } from "react";
import useSWR from "swr";

export default function Search() {
  // 選択されたグループまたは楽曲のIDを管理するための状態
  const [id, setId] = useState("");

  // SWRを使用してデータを取得
  const { data, error, isLoading } = useSWR("songs", fetchSongs);

  if (error) {
    return <div>エラーが発生しました</div>;
  } else if (isLoading || !data) {
    return <div>読み込み中...</div>;
  }

  // デモデータからグループと楽曲のユニークな値を取得
  const uniqueGroups = data.filter(
    (item, index, self) => index === self.findIndex((v) => v.group_name === item.group_name)
  );

  const uniqueSong = data.filter(
    (item, index, self) => index === self.findIndex((v) => v.song_name === item.song_name)
  );

  // 選択されたグループまたは楽曲に基づいてデータをフィルタリング
  const filteredDemoData = data.filter((item) => item.song_name === id || item.group_name === id);
  return (
    <>
      <Layout>
        <Header />
        <h2 className="text-4xl font-bold mb-3 text-center text-violet-500" data-testid="title">
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
                  onClick={() => setId(item.song_name)}
                  className="rounded-2xl"
                >
                  #{item.song_name}
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
                  onClick={() => setId(item.group_name)}
                  className="rounded-2xl"
                >
                  #{item.group_name}
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

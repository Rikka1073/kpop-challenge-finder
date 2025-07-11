"use client";

import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Record, Videos } from "@/types";
import { fetchGroups, fetchSongs, getAllVideos, getMatchedGroupId } from "@/utils/supabaseFunction";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Search() {
  const [selectedItems, setSelectedItems] = useState<Record[]>([]);
  const [filteredData, setFilteredData] = useState<Videos[]>([]);

  // SWRを使用してデータを取得
  const { data: songs, error: songsError, isLoading: songsLoading } = useSWR("songs", fetchSongs);
  const {
    data: videos,
    error: videosError,
    isLoading: videosLoading,
  } = useSWR("videos", getAllVideos);
  const {
    data: groups,
    error: groupsError,
    isLoading: groupsLoading,
  } = useSWR("groups", fetchGroups);

  //初期表示の動画データ
  useEffect(() => {
    if (videos) {
      setFilteredData(videos);
    }
  }, [videos]);

  if (songsError || videosError || groupsError) {
    return <div>エラーが発生しました</div>;
  } else if (songsLoading || videosLoading || groupsLoading || !groups || !songs || !videos) {
    return <div>読み込み中...</div>;
  }

  // データからグループと楽曲のユニークな値を取得;
  const uniqueGroups = groups.filter(
    (item, index, self) => index === self.findIndex((v) => v.group_name === item.group_name)
  );

  const uniqueSong = songs.filter(
    (item, index, self) => index === self.findIndex((v) => v.song_name === item.song_name)
  );

  const onclickButton = async (
    id: string,
    select: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const buttonName = event.currentTarget.name;
    setSelectedItems((prev) => {
      const isSelected = prev.some((item) => item.id === id);
      if (isSelected) {
        // 既に選択されている場合は削除
        const updatedSelectedItems = prev.filter((item) => item.id !== id);
        return updatedSelectedItems;
      } else {
        // 新たに選択する場合は追加
        const updatedSelectedItems = [...prev, { id, name: select }];
        return updatedSelectedItems;
      }
    });

    try {
      const filteredData = await getMatchedGroupId(id, buttonName);
      setFilteredData(filteredData ?? []);
    } catch (error) {
      console.error("Error fetching filtered data:", error);
      setFilteredData([]);
    }
  };

  const onclickClear = () => {
    setSelectedItems([]);
    setFilteredData([]);
  };

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
                  name="songs"
                  onClick={(event) => onclickButton(item.id, item.song_name, event)}
                  className={`rounded-2xl duration-200 hover:shadow-lg transition-all transform hover:scale-105  text-black border border-gray-300 ${
                    selectedItems.some((selected) => selected.id === item.id)
                      ? " bg-purple-400"
                      : "bg-white"
                  }`}
                  variant="default"
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
                  name="groups"
                  onClick={(event) => onclickButton(item.id, item.group_name, event)}
                  className={`rounded-2xl duration-200 hover:shadow-lg transition-all transform hover:scale-105  text-black border border-gray-300 ${
                    selectedItems.some((selected) => selected.id === item.id)
                      ? " bg-purple-400"
                      : "bg-white"
                  }`}
                >
                  #{item.group_name}
                </Button>
              ))}
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="mb-8 bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-bold">選択中の条件</h4>
              <Button
                onClick={onclickClear}
                className="hover:text-red-500 hover:bg-purple-50 font-bold bg-white text-black"
              >
                全てクリア
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedItems &&
                selectedItems.map((selectedItem) => (
                  <div
                    key={selectedItem.id}
                    className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm"
                  >
                    {selectedItem.name}
                  </div>
                ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex justify-between mb-4 items-center">
            <h3 className="text-2xl font-bold mb-3">検索結果（{filteredData.length}件）</h3>
          </div>

          {filteredData && filteredData.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredData.map((video: Videos) => (
                <div key={video.id} className="mb-4">
                  <VideoCard video={video} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10">
              <p className="font-bold text-xl text-center mb-4">
                条件に一致する動画が見つかりませんでした
              </p>
              <p className="font-bold text-md text-center">別の条件で検索してみてください</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

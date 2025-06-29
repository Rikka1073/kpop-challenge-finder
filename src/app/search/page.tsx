"use client";

import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Record, Videos } from "@/types";
import {
  fetchGroups,
  fetchSongs,
  fetchVideoGroups,
  fetchVideoSongs,
  fetchVideoWithTags,
} from "@/utils/supabaseFunction";
import { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";

export default function Search() {
  // 選択されたグループまたは楽曲のIDを管理するための状態
  const [id, setId] = useState("");
  const [selected, setSelected] = useState(false);
  const [record, setRecord] = useState<Record[]>([]);

  // ユニークなIDを生成
  const uniqueId = uuidv4();

  // SWRを使用してデータを取得
  const { data: songs, error: songsError, isLoading: songsLoading } = useSWR("songs", fetchSongs);
  const {
    data: videos,
    error: videosError,
    isLoading: videosLoading,
  } = useSWR("videos", fetchVideoWithTags);
  const {
    data: video_songs,
    error: video_songsError,
    isLoading: video_songsLoading,
  } = useSWR("videos_songs", fetchVideoSongs);
  const {
    data: groups,
    error: groupsError,
    isLoading: groupsLoading,
  } = useSWR("groups", fetchGroups);
  const {
    data: video_groups,
    error: video_groupsError,
    isLoading: video_groupsLoading,
  } = useSWR("videos_groups", fetchVideoGroups);

  if (songsError || videosError || video_songsError || groupsError || video_groupsError) {
    return <div>エラーが発生しました</div>;
  } else if (
    songsLoading ||
    videosLoading ||
    video_songsLoading ||
    groupsLoading ||
    video_groupsLoading ||
    !groups ||
    !video_groups ||
    !songs ||
    !videos ||
    !video_songs
  ) {
    return <div>読み込み中...</div>;
  }

  // データからグループと楽曲のユニークな値を取得;
  const uniqueGroups = groups.filter(
    (item, index, self) => index === self.findIndex((v) => v.group_name === item.group_name)
  );

  const uniqueSong = songs.filter(
    (item, index, self) => index === self.findIndex((v) => v.song_name === item.song_name)
  );

  // 選択されたグループまたは楽曲に基づいてデータをフィルタリング
  const filteredData = videos.filter(
    (video) =>
      video_groups.some((vg) => vg.video_id === video.id && vg.group_id === id) ||
      video_songs.some((vs) => vs.video_id === video.id && vs.song_id === id)
  );

  const onclickButton = (id: string, select: string) => {
    const newRecords = [...record, { id: uniqueId, name: select }];
    setRecord(newRecords);
    setId(id);
    setSelected(true);
  };

  const onclickClear = () => {
    setRecord([]);
    setId("");
    setSelected(false);
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
                  onClick={() => onclickButton(item.id, item.song_name)}
                  className="rounded-2xl duration-200 hover:shadow-lg transition-all transform hover:scale-105 bg-white text-black border border-gray-300"
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
                  onClick={() => onclickButton(item.id, item.group_name)}
                  className="rounded-2xl duration-200 hover:shadow-lg transition-all transform hover:scale-105 bg-white text-black border border-gray-300"
                >
                  #{item.group_name}
                </Button>
              ))}
          </div>
        </div>

        {selected && (
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
              {record &&
                record.map((selectedItem) => (
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
            filteredData.map((video: Videos) => (
              <div key={video.id} className="mb-4">
                <VideoCard video={video} />
              </div>
            ))
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

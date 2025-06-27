// UIコンポーネント
import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
// 型
import { videos } from "@/types";
// ユーティリティ関数
import { fetchVideos } from "@/utils/supabaseFunction";

export default async function Home() {
  // データを取得する関数を呼び出す
  const data = await fetchVideos();
  console.log("Fetched data:", data);

  return (
    <>
      <Layout>
        <Header />
        {data &&
          data.map((video: videos) => (
            <div key={video.id}>
              <VideoCard video={video} />
            </div>
          ))}
      </Layout>
    </>
  );
}

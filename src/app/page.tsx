// UIコンポーネント
import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
// 型
import { Videos } from "@/types";
// ユーティリティ関数
import { getAllVideos, getMatchedGroupId } from "@/utils/supabaseFunction";

export default async function Home() {
  // データを取得する関数を呼び出す
  const data = await getAllVideos();
  console.log("Fetched data:", data);
  getMatchedGroupId("0387c4c9-6101-4e0f-bf81-21c45a5514ee");

  const videoId = "m9fiy4qhhqw";
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
  );

  const videosData = await response.json();
  console.log("videosData", videosData);

  return (
    <>
      <Layout>
        <Header />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {data &&
            data.map((video: Videos) => (
              <div key={video.id} className="h-fit">
                <VideoCard video={video} />
              </div>
            ))}
        </div>
      </Layout>
    </>
  );
}

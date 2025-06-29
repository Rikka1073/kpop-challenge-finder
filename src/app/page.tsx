// UIコンポーネント
import { Header } from "@/components/common/header";
import { VideoCard } from "@/components/feature/videoCard";
import { Layout } from "@/components/layout/layout";
// 型
import { Videos } from "@/types";
// ユーティリティ関数
import { fetchVideoWithTags } from "@/utils/supabaseFunction";

export default async function Home() {
  // データを取得する関数を呼び出す
  const data = await fetchVideoWithTags();
  console.log("Fetched data:", data);

  return (
    <>
      <Layout>
        <Header />
        {data &&
          data.map((video: Videos) => (
            <div key={video.id}>
              <VideoCard video={video} />
            </div>
          ))}
      </Layout>
    </>
  );
}

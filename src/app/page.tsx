// UIコンポーネント
import { Header } from "@/components/common/header";
import { Layout } from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";
// 型
import { videos } from "@/types";
// ユーティリティ関数
import { fetchVideos } from "@/utils/supabaseFunction";

import Image from "next/image";

export default async function Home() {
  // データを取得する関数を呼び出す
  const data = await fetchVideos();
  console.log("Fetched data:", data);

  // view_countのフォーマット関数
  const formatViewCount = (views: number) => {
    console.log("Original view count:", views);
    if (views >= 1000000) {
      const formattedViews = (views / 1000000).toFixed(1) + "M";
      return formattedViews;
    } else if (views >= 1000) {
      const formattedViews = (views / 1000).toFixed(1) + "K";
      return formattedViews;
    } else {
      return views.toString();
    }
  };

  return (
    <>
      <Layout>
        <Header />
        {data &&
          data.map((video: videos) => (
            <div key={video.id}>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                <div className="rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
                  <div className="relative">
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      width={360}
                      height={640}
                      className="w-full aspect-[9/16] object-cover rounded-t-2xl"
                    />
                    <Badge className="absolute bottom-2 left-2">
                      {formatViewCount(video.view_count)} viwes
                    </Badge>
                  </div>
                  <Card className="rounded-b-xl px-2">
                    <CardTitle className="mb-6">{video.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-fuchsia-100 text-purple-600 font-bold">aespa</Badge>
                      <Badge className="bg-fuchsia-100 text-purple-600 font-bold">
                        LE SSERAFIM
                      </Badge>
                    </div>
                    <Badge className="bg-red-100 text-red-600 font-bold">#Spicy</Badge>
                  </Card>
                </div>
              </div>
            </div>
          ))}
      </Layout>
    </>
  );
}

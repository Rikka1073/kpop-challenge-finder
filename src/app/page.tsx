import { Header } from "@/components/common/header";
import { Layout } from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { fetchData } from "@/utils/supabaseFunction";
import Image from "next/image";

export default async function Home() {
  // const videoId = "illwwKfv1UY";
  // const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  // const response = await fetch(
  //   `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
  // );

  // const data = await response.json();
  // console.log(data.items);

  const data = await fetchData();
  console.log("Fetched data:", data);

  type videos = {
    id: string;
    youtube_id: string;
    title: string;
    thumbnail_url: string;
    view_count: string;
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
                    <Badge className="absolute bottom-2 left-2">{video.view_count} viwes</Badge>
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

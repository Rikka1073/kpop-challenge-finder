import { Header } from "@/components/common/header";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const videoId = "GqbK3rcQkg8";
  const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
  );

  const data = await response.json();
  console.log(data.items);

  return (
    <>
      <Layout>
        <Header />
        <Button>テストです</Button>
        <h1 data-testid="title">Home</h1>
        {data &&
          data.items.map((video: any) => (
            <div key={video.id}>
              <h2>{video.snippet.title}</h2>
              <div>{video.statistics.likeCount}</div>
              <div>{video.snippet.thumbnails.default.url}</div>
            </div>
          ))}
      </Layout>
    </>
  );
}

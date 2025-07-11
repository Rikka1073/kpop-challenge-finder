import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardTitle } from "../ui/card";
import { Videos } from "@/types";

type VideoCardProps = {
  video: Videos;
};

// view_countのフォーマット関数
const formatViewCount = (views: number) => {
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

export const VideoCard = ({ video }: VideoCardProps) => {
  const { title, thumbnail_url, view_count, video_groups, video_songs } = video;

  return (
    <>
      <div className="rounded-2xl transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105">
        <div className="relative">
          <Image
            src={thumbnail_url || "https://via.placeholder.com/360x640"}
            alt={title}
            width={360}
            height={640}
            className="w-full aspect-[9/16] object-cover rounded-t-2xl"
          />
          <Badge className="absolute bottom-2 left-2">{formatViewCount(view_count)} viwes</Badge>
        </div>
        <Card className="rounded-b-xl px-2">
          <CardTitle className="mb-6 line-clamp-2">{title}</CardTitle>
          <div className="flex items-center gap-2 mb-2">
            {video_groups.map((badge) => (
              <Badge className="bg-fuchsia-100 text-purple-600 font-bold" key={badge.groups.id}>
                <span>{badge.groups.group_name}</span>
              </Badge>
            ))}
          </div>
          {video_songs.map((badge) => (
            <Badge className="bg-red-100 text-red-600 font-bold" key={badge.songs.id}>
              <span>#{badge.songs.song_name}</span>
            </Badge>
          ))}
        </Card>
      </div>
    </>
  );
};

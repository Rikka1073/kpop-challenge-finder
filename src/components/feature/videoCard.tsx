import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Video = {
  id: number;
  group: string;
  song: string;
  link: string;
};

type VideoCardProps = {
  video: Video;
};

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{video.song}</CardTitle>
          <CardDescription>{video.group}</CardDescription>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};

export type Videos = {
  id: string;
  youtube_id: string;
  title: string;
  thumbnail_url: string;
  view_count: number;
  video_groups: {
    groups: {
      id: string;
      group_name: string;
    };
  }[];
  video_songs: {
    songs: {
      id: string;
      song_name: string;
    };
  }[];
};

export type Record = {
  id: string;
  name: string;
};

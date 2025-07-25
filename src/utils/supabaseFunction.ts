import { supabase } from "./supabase";

// 全ての動画を取得（初期表示用）
export const getAllVideos = async () => {
  const { data, error } = await supabase
    .from("videos")
    .select(`*, video_groups(groups(id, group_name)), video_songs(songs(id, song_name))`);
  if (error) {
    console.log("Error fetching videos:", error);
  } else if (data) {
    // console.log("Videos fetched successfully:", data);
    return data;
  }
};

// グループIDで動画をフィルタリング
export const getMatchedGroupId = async (id: string, buttonName: string) => {
  console.log("Fetching videos for group or song ID:", id);
  if (buttonName === "songs") {
    const { data, error } = await supabase
      .from("videos")
      .select(
        `
      *, 
      video_groups!inner(groups(id, group_name)), 
      video_songs!inner(songs(id, song_name))
    `
      )
      .eq("video_songs.song_id", id);

    if (error) {
      console.log("Error fetching matched:", error);
    } else if (data) {
      console.log("Matched fetched successfully:", data);
      return data;
    }
  } else if (buttonName === "groups") {
    console.log("groups:", id);
    const { data: videoIds, error: videoError } = await supabase
      .from("video_groups")
      .select("video_id")
      .eq("group_id", id);

    if (videoError) {
      console.log("Error fetching video IDs:", videoError);
    }

    if (!videoIds) {
      console.log("No videos found for group ID:", videoIds);
      return [];
    }

    console.log("Video IDs fetched successfully:", videoIds);

    const videoIdlist = videoIds.map((item) => item.video_id);
    console.log("Video ID list:", videoIdlist);

    const { data, error } = await supabase
      .from("videos")
      .select(
        `
      *, 
      video_groups(groups(id, group_name)), 
      video_songs(songs(id, song_name))
    `
      )
      .in("id", videoIdlist);

    if (error) {
      console.log("Error fetching videos:", error);
    } else if (data) {
      console.log("Videos fetched successfully:", data);
      return data;
    }
  }
};

export const fetchSongs = async () => {
  const { data, error } = await supabase.from("songs").select("*");
  if (error) {
    console.log("Error fetching songs:", error);
  } else {
    // console.log("Songs fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No songs found");
    return [];
  }
};

export const fetchGroups = async () => {
  const { data, error } = await supabase.from("groups").select("*");
  if (error) {
    console.log("Error fetching Groups:", error);
  } else {
    // console.log("Groups fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No groups found");
    return [];
  }
};

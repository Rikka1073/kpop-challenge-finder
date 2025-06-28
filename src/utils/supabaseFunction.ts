import { supabase } from "./supabase";

export const fetchVideos = async () => {
  const { data, error } = await supabase.from("videos").select("*");
  if (error) {
    console.log("Error fetching videos:", error);
  } else {
    console.log("Videos fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No videos found");
    return [];
  }
};

export const fetchSongs = async () => {
  const { data, error } = await supabase.from("songs").select("*");
  if (error) {
    console.log("Error fetching songs:", error);
  } else {
    console.log("Songs fetched successfully:", data);
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
    console.log("Groups fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No groups found");
    return [];
  }
};

export const fetchVideoSongs = async () => {
  const { data, error } = await supabase.from("video_songs").select("*");
  if (error) {
    console.log("Error fetching videoSongs:", error);
  } else {
    console.log("VideoSongs fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No videoSongs found");
    return [];
  }
};

export const fetchVideoGroups = async () => {
  const { data, error } = await supabase.from("video_groups").select("*");
  if (error) {
    console.log("Error fetching videoSongs:", error);
  } else {
    console.log("VideoSongs fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No videoSongs found");
    return [];
  }
};

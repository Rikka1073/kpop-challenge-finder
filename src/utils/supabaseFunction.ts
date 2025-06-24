import { supabase } from "./supabase";

export const fetchData = async () => {
  const { data, error } = await supabase.from("videos").select("*");
  if (error) {
    console.log("Error fetching data:", error);
  } else {
    console.log("Data fetched successfully:", data);
  }

  if (data) {
    return data;
  } else {
    console.log("No data found");
    return [];
  }
};

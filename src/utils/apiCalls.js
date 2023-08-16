// const API_KEY = "AIzaSyC32rGDlAEGKI6y29Ob4WaI3ZHhUCRxObc";
const API_KEY = "AIzaSyDeATc-gjbf2b5uF6IAaSdk9J5IFQuY77M";
// const API_KEY = "AIzaSyDhcs9lPN9Qe6r2TpKwDG-dPtUPpYi6c2w";

export const API_CALL_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&key=" +
  API_KEY;

export const PROFILE_PICTURE_FETCHER = async (channelId) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
    );
    const data = await res?.json();
    const profilePictureUrl = data?.items[0]?.snippet?.thumbnails?.default?.url;
    return profilePictureUrl;
  } catch (e) {
    console.error("coudnt fetch channel profile picture");
    return "";
  }
};

export const fetchTagsUrl =
  "https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=IN&key=" +
  API_KEY;

export const videoFetchCatBased = async (cat, vidId) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${cat}&maxResults=15&type=video&videoCategoryId=${vidId}`
  );
  const data = await res?.json();
  let ids = [];
  for (const x of data?.items) {
    ids = [...ids, x?.id?.videoId];
  }
  const res2 = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(
      ","
    )}`
  );

  const data2 = await res2?.json();
  // console.log(data2);
  return data2?.items;
};

export const moreVideosFetcherAPI = async (token) => {
  try {
    const res = await fetch(`${API_CALL_URL}&pageToken=${token}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const searchSuggestionsAPI =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const fetchSearchQueryAPI = async (query, nextPageToken = "") => {
  try {
    const res =
      await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${query}&part=snippet&type=video&maxResults=15${
        nextPageToken ? `&pageToken=${nextPageToken}` : ""
      }
`);
    const data = await res.json();
    // console.log(data, "first");
    const nextRoundId = data?.nextPageToken;
    let ids = [];
    for (const x of data?.items) {
      ids = [...ids, x?.id?.videoId];
    }
    const res2 = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(
        ","
      )}`
    );

    const data2 = await res2?.json();
    // console.log(data2, "second");
    return [data2, nextRoundId];
  } catch (err) {
    console.log(err);
  }
};

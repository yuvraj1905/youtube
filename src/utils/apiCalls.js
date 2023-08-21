const API_KEY = process.env.REACT_APP_API_KEY;

export const API_CALL_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&key=" +
  API_KEY;

export const videoFetcherFromVideoId = async (id) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet,statistics,contentDetails`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllVideos = async () => {
  const res = await fetch(API_CALL_URL);
  const data = await res.json();
  return data;
};

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

export const videoFetchCatBased = async (cat, vidId, nextPageToken = "") => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&q=${cat}&maxResults=15&type=video&videoCategoryId=${vidId}${
      nextPageToken ? `&pageToken=${nextPageToken}` : ""
    }`
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
  return { ...data2, nextPageToken: data.nextPageToken };
};

export const moreVideosFetcherAPI = async (token) => {
  try {
    const res = await fetch(`${API_CALL_URL}&pageToken=${token}`);
    const data = await res?.json();
    if (data) return data;
  } catch (err) {
    console.log(err);
  }
};

export const searchSuggestionsAPI =
  "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const fetchSearchQueryAPI = async (query, nextPageToken = "") => {
  try {
    console.log(query);
    const res =
      await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${query}&part=snippet&type=video&maxResults=15${
        nextPageToken ? `&pageToken=${nextPageToken}` : ""
      }
`);
    const data = await res.json();
    // console.log(data, "first");
    const nextPageId = data?.nextPageToken;
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
    return { ...data2, nextPageToken: nextPageId };
  } catch (err) {
    console.log(err);
  }
};

const channelFetcher = async (channelId) => {
  try {
    const channel = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${API_KEY}`
    );
    const channelData = await channel.json();
    return channelData;
  } catch (err) {
    console.log(err);
  }
};

export const fetch_channel = async (channelId, nextPageToken) => {
  try {
    const channelData = !nextPageToken && (await channelFetcher(channelId));
    const videosList =
      await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&channelId=${channelId}&maxResults=15&type=video&key=${API_KEY}${
        nextPageToken ? `&pageToken=${nextPageToken}` : ""
      }
`);
    const videosListJson = await videosList.json();
    const nextRoundId = videosListJson?.nextPageToken;

    let ids = [];
    for (const x of videosListJson?.items) {
      ids = [...ids, x?.id?.videoId];
    }
    const videos = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet%2CcontentDetails%2Cstatistics&id=${ids.join(
        ","
      )}`
    );

    const videosData = await videos.json();
    if (nextPageToken) {
      return [videosData, nextRoundId];
    }
    return [channelData, videosData, nextRoundId];
  } catch (e) {
    console.log(e);
  }
};

export const commentsFetcher = async (videoId) => {
  try {
    const res =
      await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=30&videoId=${videoId}&key=${API_KEY}
`);
    const data = await res.json();
    return data?.items;
  } catch (err) {
    console.log(err);
  }
};

const API_KEY = "AIzaSyCDiVuDtSGphV7wjGxCDDbuXi_HHiN14dE";

export const API_CALL_URL =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=IN&key=" +
  API_KEY;

export const PROFILE_PICTURE_FETCHER = async (channelId) => {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
    );
    const data = await res.json();
    const profilePictureUrl = data.items[0].snippet.thumbnails.default.url;
    return profilePictureUrl;
  } catch (e) {
    console.error("coudnt fetch channel profile picture");
    return "";
  }
};

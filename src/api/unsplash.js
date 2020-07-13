/**
 * 图片模块的API 使用的是 unsplash官方的API
 * Created by gaoju on 2019/1/23.
 * github 地址：https://github.com/unsplash/unsplash-js
 */
import Unsplash, {
  toJson
} from 'unsplash-js';
const UserConfig = {
  unsplashAlt: {
    accessKey: 'f04bb90c07371a05bc531548694a0b67e636a5fe06bb7ed3c0a2068bbf7b76f6',
    secretKey: '653f97acec2b8de90f8b329ffccabfc74508875b6b9a777c4b7503996706dc2a',
    callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
  },
  keys: {
    bookmarks: 'allBookmarkedItems'
  }
}
const unsplash = new Unsplash({
  applicationId: UserConfig.unsplashAlt.accessKey,
  secret: UserConfig.unsplashAlt.secretKey,
  callbackUrl: UserConfig.unsplashAlt.callbackUrl,
  accessKey: UserConfig.unsplashAlt.accessKey,
  // Optionally if using a node-fetch polyfill or a version of fetch which supports the timeout option, you can configure the request timeout for all requests
  timeout: 500 // values set in ms
})

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "read_user",
  "write_user",
  "read_photos",
  "write_photos"
])
console.log("1111111111111111--------->>>", authenticationUrl)
// location.assign(authenticationUrl);
unsplash.auth.userAuthentication("0U-CSDCewkhivIESBdTigeppXiJJjxM2QwdLYeSns8k")
  .then(toJson)
  .then(json => {
    unsplash.auth.setBearerToken(json.access_token);
  });
//Get a single page from the list of all photos
export function getAllPhotos(pageIndex, pageNum, callback) {
  unsplash.photos.listPhotos(pageIndex, pageNum, "latest")
    .then(toJson)
    .then(json => {
      callback({
        code: 200,
        data: json
      });
    }).catch((error) => {
      callback({
        code: 500,
        data: []
      })
    });
}
//Get a list of photos uploaded by a user.
export function getPhotosForUser(username = "", callback) {
  unsplash.users.photos(username, 1, 20, "latest", false)
    .then(toJson)
    .then(json => {
      callback(json);
    });
}
//Get a list of collections created by the user.
export function getCollectionsForUser(username = "", callback) {
  unsplash.users.collections(username, 1, 15, "updated")
    .then(toJson)
    .then(json => {
      callback(json);
    });
}
//Retrieve a single photo's stats.
export function getPhotoStats(id, callback) {
  unsplash.photos.getPhotoStats(id)
    .then(toJson)
    .then(json => {
      callback(json);
    });
}
//Get a list of photos matching the keyword.
export function searchPhotos(name, pageIndex, callback) {
  unsplash.search.photos(name, pageIndex, 20)
    .then(toJson)
    .then(json => {
      callback(json);
    });
}
//downloadPhoto
export function downloadPhoto(id, callback) {
  unsplash.photos.getPhoto(id)
    .then(toJson)
    .then(json => {
      unsplash.photos.downloadPhoto(json);
    });
}
//点赞
export function setLikePhoto(id, callback) {
  unsplash.photos.likePhoto(id)
    .then(toJson)
    .then(json => {
      callback(json);
    });
}
//取消点赞
export function setUnLikePhoto(id, callback) {
  unsplash.photos.unlikePhoto(id)
    .then(toJson)
    .then(json => {
      callback(json);
    });
}
//get photos info
export function getPhotoInfo(id, callback) {
  const url = `https://api.unsplash.com/photos/${id}/info?client_id=${UserConfig.unsplashAlt.accessId}`;
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      callback(json)
    })
}

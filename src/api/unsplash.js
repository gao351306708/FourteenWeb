/**
 * 图片模块的API 使用的是 unsplash官方的API
 * Created by gaoju on 2019/1/23.
 */
import * as Unsplash from '@/js/unsplash.js';
const unsplash = Unsplash.unsplash;
const toJson = Unsplash.toJson;
const UserConfig = Unsplash.UserConfig;

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
export function downloadPhotoById(id, callback) {
  unsplash.photos.getPhoto(id)
    .then(toJson)
    .then(json => {
      unsplash.photos.downloadPhoto(json)
        .then(toJson)
        .then(res => {
          let url = res.url;
          let a = document.createElement('a');
          a.download = id + ".jpg";
          //使用网络请求图片地址下载图片
          fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
            a.href = URL.createObjectURL(blob)
            console.log("下载完成")
            callback("下载完成")
          }).catch(err => {
            console.error("图片下载失败：", err)
            a.target = "_blank";
          }).finally(ress => {
            document.body.appendChild(a)
            a.click();
            setTimeout(() => {
              document.body.removeChild(a)
            }, 200)
          })
        });
    });
}
//downloadPhoto
export function downloadPhotoByUrl(params, callback) {
  let {
    url,
    name
  } = params;
  let a = document.createElement('a');
  a.download = name + ".jpg";
  //使用网络请求图片地址下载图片
  fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
    a.href = URL.createObjectURL(blob)
    console.log("下载完成")
    callback("下载完成")
  }).catch(err => {
    console.error("图片下载失败：", err)
    a.target = "_blank";
  }).finally(ress => {
    document.body.appendChild(a)
    a.click();
    setTimeout(() => {
      document.body.removeChild(a)
    }, 200)
  })
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
export function getPhotoInfo(id) {
  return unsplash.photos.getPhoto(id).then(toJson)
}
//获取相关联的图片
export function getRelatedPhotos(id) {
  // return unsplash.collections.listRelatedCollections(id).then(toJson)
  const url = `https://api.unsplash.com/photos/${id}/related?client_id=${UserConfig.unsplashAlt.accessKey}`;
  return fetch(url).then((res) => res.json())
}

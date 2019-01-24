/**
 * 图片模块的API 使用的是 unsplash官方的API
 * Created by gaoju on 2019/1/23.
 * github 地址：https://github.com/unsplash/unsplash-js
 */
import Unsplash, { toJson } from 'unsplash-js';
const UserConfig = {
    unsplashAlt: {
        accessId: 'f04bb90c07371a05bc531548694a0b67e636a5fe06bb7ed3c0a2068bbf7b76f6',
        secretKey: '653f97acec2b8de90f8b329ffccabfc74508875b6b9a777c4b7503996706dc2a',
        callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
    },
    keys: {
        bookmarks: 'allBookmarkedItems'
    }
}
const unsplash = new Unsplash({
    applicationId: UserConfig.unsplashAlt.accessId,
    secret: UserConfig.unsplashAlt.secretKey,
    callbackUrl: UserConfig.unsplashAlt.callbackUrl,
})

//Get a single page from the list of all photos
export function getAllPhotos(pageIndex,pageNum,callback) {
    unsplash.photos.listPhotos(pageIndex, pageNum,"latest")
        .then(toJson)
        .then(json => {
            console.log(json);
            callback(json);
        });
}
//Get a list of photos uploaded by a user.
export function getPhotosForUser(username = "",callback) {
    unsplash.users.photos(username, 1, 20, "latest", false)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//Get a list of collections created by the user.
export function getCollectionsForUser(username = "",callback) {
    unsplash.users.collections(username, 1, 15, "updated")
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//Retrieve a single photo's stats.
export function getPhotoStats(id,callback) {
    unsplash.photos.getPhotoStats(id)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//Get a list of photos matching the keyword.
export function searchPhotos(name,pageIndex,callback) {
    unsplash.search.photos(name, pageIndex,20)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//downloadPhoto
export function downloadPhoto(id,callback) {
    unsplash.photos.getPhoto(id)
        .then(toJson)
        .then(json => {
            unsplash.photos.downloadPhoto(json);
        });
}
//Like a photo on behalf of the logged-in user. This requires the write_likes scope.
export function getLikePhoto(id,callback) {
    unsplash.photos.likePhoto(id)
        .then(toJson)
        .then(json => {
            callback(json);
        });
}
//get photos info
export function getPhotoInfo(id,callback) {
    const url = `https://api.unsplash.com/photos/${id}/info?client_id=${UserConfig.unsplashAlt.accessId}`;
    fetch(url)
        .then((res)=>res.json())
        .then((json)=>{
            callback(json)
        })
}

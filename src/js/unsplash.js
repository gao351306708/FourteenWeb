/**
 * 图片模块的API 使用的是 unsplash官方的API
 * github 地址：https://github.com/unsplash/unsplash-js
 * **/
import Unsplash, {
  toJson
} from 'unsplash-js';

const UserConfig = {
  unsplashAlt: {
    accessKey: 'f04bb90c07371a05bc531548694a0b67e636a5fe06bb7ed3c0a2068bbf7b76f6',
    secretKey: '653f97acec2b8de90f8b329ffccabfc74508875b6b9a777c4b7503996706dc2a',
    callbackUrl: process.env.NODE_ENV == "production" ? "http://rambogj.top/" : 'http://localhost:8088/', //此值需要跟unplash官网得app里面设置得Redirect URI一致
  },
  keys: {
    bookmarks: 'allBookmarkedItems'
  }
}
//实例化一个私有化unsplash对象
const unsplash = new Unsplash({
  applicationId: UserConfig.unsplashAlt.accessKey,
  secret: UserConfig.unsplashAlt.secretKey,
  callbackUrl: UserConfig.unsplashAlt.callbackUrl,
  accessKey: UserConfig.unsplashAlt.accessKey,
  timeout: 500
})
let query = location.search;
if (query && query.includes("code")) {
  let code = query.split("=")[1];
  //根据当前code获取access_tolen 并设置beartoken
  unsplash.auth.userAuthentication(code)
    .then(toJson)
    .then(json => {
      unsplash.auth.setBearerToken(json.access_token);
    });
} else {
  //获取私有权限url
  if (process.env.NODE_ENV == "production") {
    const authenticationUrl = unsplash.auth.getAuthenticationUrl([
      "public",
      "read_user",
      "write_user",
      "read_photos",
      "write_photos"
    ])
    console.log("1111111111111111--------->>>", authenticationUrl)
    //重定向地址，将会自动重定向到携带code得callbackUrl地址
    location.assign(authenticationUrl);
  }
}

export {
  UserConfig,
  unsplash,
  toJson,
}

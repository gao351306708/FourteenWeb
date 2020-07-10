# vue项目（个人网站）

> 基于vue+element-ui+node+mongodb的多页面的项目。
> 在线浏览：http://www.rambogj.club

## 安装步骤

#1、项目需要node环境，所以需要安装node环境，需要配置node环境变量。

#2、另外可以安装 gitbash版本控制软件来下载git项目,也方便以后管理项目，下载地址：https://gitforwindows.org/ 。下载安装完之后打开gitbash 执行以下命令下载项目到本地：

git clone https://github.com/gao351306708/FourteenWeb.git

#3、 安装依赖包。先下载npm 安装好之后。打开控制台，进入项目所在目录，执行以下命令：

npm install

#4、安装完依赖包后， 执行以下命令，启动服务：

npm run dev

#5、查看效果
localhost:8088

#6、项目运行起来之后不会影响页面浏览但是会有报错接口异常，原因是有请求接口。解决方式：需要本地安装mongodb，安装完成之后需要新建一个数据库，名字可以自定义，本项目是数据库名为：managementWeb。
#7、安装成功之后 启动数据库。然后再运行项目，切记在数据库启动之后再运行项目

export-readme
export-readme可以根据package.json文件自动生成项目文档，且几乎不需要任何配置

功能点介绍
export-readme主要基于前端项目的package.json生成README.md（默认名）文档，基于package.json我们拓展了friendly（针对项目做注释、备注、提醒）、links（项目文档及相关地址）两个字段。
主要功能如下：
1. 项目名
2. 版本信息
3. 项目描述
4. 项目注意事项（friendly）
5. 相关文档地址
6.示例代码（vue 默认main.js，可以自己设置，脚本可以自己去爬目录抓取）
7.相关命令
8.项目成员
9.项目引用模块
我们遵循代码/注释即文档的原则，只要代码写的OK，代码即文档。

{
    "name": "automatic-document-generation",
    "version": "1.0.0",
    "description": "cupsheMarkeasdasdt pc、m端代码，根据屏幕宽度以及终端类型自动切换。 技术栈介绍： 1、ssr：Nuxt.js 2、client: Vue全家桶 3、style： node-sass、element-ui 按需加载 4、代码规范：eslint + prettier 5、国际化：vue-i18n 5、动画插件 vue-awesome-swiper 轮播插件（根据需求可更换）",
    "friendly": {
        "字体图标": "请不要使用什么爱神的箭阿萨德静安寺客户端",
        "项目优化": "字体资源阻塞问题，首屏加载时间长",
        "页面动画插件": "页面动画插件有问题请不要改动",
        "不需要使用": "更新cupsheUi库 开发环境，可自行指定分支"
    },
    "links": {
        "蓝湖设计稿地址": "http://www.baidu.com",
        "接口文档地址": "http://www.baidu.com",
        "产品原型地址": "http://www.baidu.com",
        "产品需求文档地址": "http://www.baidu.com",
        "测试地址": "http://www.baidu.com",
        "线上地址": "http://www.baidu.com"
    },
    "main": "main.js",
    "scripts": {
        "dev": "",
        "test": "echo \"Error: no test specified\" && exit 1",
        "doc": "node export-README.js"
    },
    "author": "前端：袁晶，刘秀，测试：金茂成，开发：XX",
    "license": "ISC",
    "devDependencies": {
        "jquery": "^3.5.1"
    },
    "dependencies": {
        "react": "^17.0.1"
    }
}


 关于配置及使用export-readme
将export-readme防止在根目录
并在package.json里面配置单独的命令手动使用，例如：
    "scripts": {
        "doc": "node export-README.js"
    },

 
或者在项目启动的时候，自动生成/更新
    "scripts": {
        "dev": "node export-README.js && npm run start"
    },

 
生成文档的效果





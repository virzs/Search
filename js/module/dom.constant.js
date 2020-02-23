//获取的DOM元素/全局静态DOM元素
const body = document.querySelector("body");//文档整体
const linkTag = document.querySelector("#skinTag");
const uiTag = document.querySelector("#uiTag");
const searchContent = document.querySelectorAll(".search-content")[0]
const selectEngine = document.querySelector("#selectEngine"); //搜索框左侧选择引擎标签
const selectOption = document.querySelector("#selectOption"); //搜索引擎数据
const searchInput = document.querySelector("#search"); //搜索输入框
const searchList = document.querySelector("#searchList"); //搜索时显示的相关信息列表
const sideBarButton = document.querySelector("#sideBarButton");
const sideBar = document.querySelector("#sideBar"); //侧边栏
const sideBarTitle = document.querySelector("#sideBarTitle") //侧边栏图标区域
const sideBarContent = document.querySelector("#sideBarContent"); //侧边栏内容
const scrollContent = document.querySelector("#scrollContent"); //侧边栏滚动内容
const commonUse = document.querySelector("#commonUse");
const jinrishiciSentence = document.querySelector("#jinrishiciSentence"); //诗词内容
const jinrishiciAuthor = document.querySelector("#jinrishiciAuthor"); //诗词作者
const jinrishiciTitle = document.querySelector("#jinrishiciTitle"); //诗词名
const copyright = document.querySelector("#copyright"); //版权说明
const loading = document.querySelector("#loading"); //加载动画元素
const messageList = document.querySelector("#messageList"); //弹窗列表

export {
    body,
    linkTag,
    uiTag,
    searchContent,
    selectEngine,
    selectOption,
    searchInput,
    searchList,
    sideBarButton,
    sideBar,
    sideBarTitle,
    sideBarContent,
    scrollContent,
    commonUse,
    jinrishiciSentence,
    jinrishiciAuthor,
    jinrishiciTitle,
    copyright,
    loading,
    messageList
}
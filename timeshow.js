events.on("exit", function(){
    wstat = false;
    log("退出");
});
 
wth = null; // 存储线程的变量
wstat = false; // 状态
log("等待无障碍权限");
auto.waitFor();
toastLog("获取无障碍权限成功");
auto.setMode("fast");
 
dialogs.build({
    // 标题
    title: "Launcher",
    // 内容
    content: "请选择模式\nyes: 在点击时间时打开时间屏幕\nno: 在点击时间时不作反应",
    positive: "yes",
    negative: "no",
    neutral: "Exit",
}).on("positive", ()=>{
    //yes
    if (!floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    log("等待悬浮窗权限");
    alert("未获取到悬浮窗权限，请授权后重新启动本程序");
    floaty.requestPermission();
    exit();
    } else {
    toastLog('已有悬浮窗权限');
    }
    
    wmain();
 
}).on("neutral", ()=> {
    //no
    log("文档✓");
}).on("negative", ()=>{
    //退出
    exit();
}).show();
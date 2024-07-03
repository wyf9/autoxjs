/*
wAutoSend-Autoxjs by wyf9
Powered by Autoxjs
All Rights Reserved.

https://t.wyf9.top/autosendjs

禁止删除此段注释，否则后果自负!
*/
 
events.on("exit", function(){
    wstat = false;
    log("退出✓");
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
    content: "wAutoSend-Autoxjs v1.2.0 - 4\nby: GitHub@wyf9\nMore info: https://t.wyf9.top/autosendjs\n请选择:",
    positive: "启动悬浮窗",
    negative: "退出",
    neutral: "文档",
}).on("positive", ()=>{
    //启动
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
    //打开文档
    log("文档✓");
    app.openUrl("https://t.wyf9.top/autosendjs");
    exit();
}).on("negative", ()=>{
    //退出
    exit();
}).show();
 
function wmain() {
    wtext = "???";
    dialogs.rawInput("输入文本内容:", "").then(name => {
        wtext=name;
        log("内容: "+wtext);
        });
    
    var wn = floaty.window(
        
    <frame gravity="center" bg="#5500ff00">
        <text id="wnid">点击设置</text>
    </frame>
);
 
wn.setPosition(750, 600);
wn.setAdjustEnabled(true);
wn.exitOnClose();
log("弹出设置悬浮窗");
wn.wnid.click(function () {
    dialogs.build({
    //标题
    title: "Setting",
    //内容
    content: "wAutoSend-Autoxjs 设置",
    positive: "设置文本",
    negative: "取消",
    neutral: "退出程序",
}).on("positive", ()=>{
    log("设置文本");
    
    dialogs.rawInput("输入文本内容:", "").then(name => {
        wtext=name;
        log("内容: "+wtext);
        })
        
}).on("neutral", ()=>{
    //退出
    exit();
}).show();

    })
    
 
    var w = floaty.window(
        
    <frame gravity="center" bg="#5500ff00">
        <text id="wid">点击开始</text>
    </frame>
);
 
w.setPosition(750, 500);
w.setAdjustEnabled(true);
w.exitOnClose();
log("弹出开关悬浮窗");
 
//指定确定按钮点击时要执行的动作
w.wid.click(function () {
    status = w.wid.getText();  //获得id="wid"的按钮的文字
    if (status == "点击停止") {
        toast("Stopped");
        log("停止");
        wstat = false;
        ui.run(function () {
            wth.interrupt();
            w.wid.setText("点击开始");  //设置按钮文本
        });
    } else {
        toast("Started");
        log("开始");
        wstat = true;
        ui.run(function () {
            wth = threads.start(
function(){
    stn=0;
    while (wstat) {
    setText(wtext);
    click("发送");
    stn=stn+1;
    log("发送:"+stn);
}});
            w.wid.setText("点击停止");
        });
    };
});
 
};
 
setInterval(()=>{}, 1000);

events.on("exit", function(){
    wstat = false;
    log("退出✓");
});

var sto=storages.create("wyf9.musicplayer");
path = sto.get("path", null);
if (path == null) {
    pathn=1
    };
 
wth = null; // 存储线程的变量
wstat = false; // 状态

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
    
function wmain() {
    wtext = "???";

    
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
    content: "设置",
    positive: "设置路径",
    negative: "取消",
    neutral: "退出程序",
}).on("positive", ()=>{
    log("设置路径");
    
    dialogs.rawInput("输入路径:", " ").then(name => {
        wtext=name;
        log("Path: "+wtext);
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

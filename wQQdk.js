events.on("exit", function(){
    wstat = false;
    log("退出✓");
});

function nlog(id, plog){
    log("[#" + id + "] " + plog)
    }

lastId = 0;

log("等待无障碍权限");
auto.waitFor();
log("获取无障碍权限成功");
auto.setMode("fast");

if (!floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    log("等待悬浮窗权限");
    alert("未获取到悬浮窗权限，请授权后重新启动本程序");
    floaty.requestPermission();
    exit();
} else {
    log('已有悬浮窗权限');
}
    
wmain();
    
// ---

function wmain() {
    var w = floaty.window(
        
    <frame gravity="center" bg="#5500ff00">
        <text id="wid">点击运行</text>
    </frame>
);
 
w.setPosition(750, 600);
w.setAdjustEnabled(true);
w.exitOnClose();
toastLog("弹出悬浮窗");

//指定确定按钮点击时要执行的动作
// w.wid.click(function{
    // var thread = threads.start(function () {
        // toastLog("Run");
        // o = desc("更多功能").findOne().click();
        // log("更多功能: " + o);
        // o = click("打卡");
        // log("打开界面: " + o);
        // sta = text("立即打卡").findOne().click();
    // });
    // thread.join(5000);
// });

w.wid.click(function () {
    status = w.wid.getText();  //获得id="wid"的按钮的文字
    if (status == "点击停止") {
        nlog(nowid, "Stop");
        ui.run(function () {
            wth.interrupt();
            w.wid.setText("点击运行");  //设置按钮文本
        });
    } else {
        lastId += 1;
        nowid = lastId;
        nlog(nowid, "Start");
        ui.run(function () {
            wth = threads.start(function () {
                o = desc("更多功能").findOne().click();
                nlog(nowid, "更多功能: " + o);
                o = text("打卡").findOne().parent().parent().click();
                nlog(nowid, "打开界面: " + o);
                o = text("立即打卡").findOne().click();
                nlog(nowid, "立即打卡: " + o);
                back();
                sleep(250);
                back();
                w.wid.setText("点击运行");
                nlog(nowid, "Finished");
            });
        w.wid.setText("点击停止");
        });
    };
});

}

setInterval(()=>{}, 1000);

// ---
    
// exit();
// toastLog("Run");




// toastLog("OK");
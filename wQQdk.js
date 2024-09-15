// config
CONFIG_loop = true; // 控制是否循环

events.on("exit", function () {
    wstat = false;
    log("退出✓");
});

function nlog(id, plog){
    log("[#" + id + "] " + plog)
    }

lastId = 0;
nowid = 0;

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
        nlog(nowid, "ClickStop");
        ui.run(function () {
            wth.interrupt();
            w.wid.setText("点击运行");  //设置按钮文本
        });
    } else {
        nlog(nowid + 1, "ClickStart");
        ui.run(function () {
            lastId += 1;
            nowid = lastId;
            nlog(nowid, "Run");
            wth = threads.start(function () {
                while(true){
                    o = desc("更多功能").findOne().click();
                    nlog(nowid, "更多功能: " + o);
                    sleep(200);
                    o = text("打卡").findOne().parent().parent().click();
                    nlog(nowid, "打开界面: " + o);
                    sleep(200);
                    o = text("立即打卡").findOne().click();
                    nlog(nowid, "立即打卡: " + o);
                    sleep(200);
                    back();
                    sleep(200);
                    back();
                    sleep(200);
                    back();
                    nlog(nowid, "Finished");
                    sleep(3456);
                }
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
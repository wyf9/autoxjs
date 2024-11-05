/*
QQ Auto Check Script
By github@wyf9, Powered by Autox.js
All Rights Reserved.
*/

// config
CONFIG_loop = true; // bool: 控制是否循环
CONFIG_timeout = 4000; // int: 查找控件的超时 (ms)
CONFIG_sleep = 100; // int: 单次点击后等待时间 (ms)

log("CONFIG_loop: " + CONFIG_loop);
log("CONFIG_timeout: " + CONFIG_timeout);
log("CONFIG_sleep: " + CONFIG_sleep);

events.on("exit", function () {
    wstat = false;
    log("退出✓");
});

function nlog(id_, log_) {
    /*
    id_: int, nowid
    log_: str, 输出日志
    */
    log("[#" + id_ + "] " + log_);
}

function findOneClick(obj_, desc_, nowid_, parents_) {
    /*
    obj_: object, text(xxx) or desc(xxx)
    desc_: str, 描述
    nowid_: int, nowid
    sleep_: int, 执行后睡眠, 单位 ms
    parents_: int, parent 层级数
    
    TODO: 
    */
    thisobj_ = obj_.findOne();
    //if (thisobj_ == null) {
    //    TODO: 检测 "全员禁言中"
    //    }
    if (parents_ != 0) {
        for (let parent_now_ = 0; parent_now_ < parents_; parent_now_++) {
            thisobj_ = thisobj_.parent();
        }
    }
    ret_ = thisobj_.click();
    nlog(nowid, desc_ + ": " + ret_);
    sleep(CONFIG_sleep);
    return ret_
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
    log("已有悬浮窗权限");
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
        status = w.wid.getText(); //获得id="wid"的按钮的文字
        if (status == "点击停止") {
            nlog(nowid, "ClickStop");
            ui.run(function () {
                wth.interrupt();
                w.wid.setText("点击运行"); //设置按钮文本
            });
        } else {
            nlog(nowid + 1, "ClickStart");
            ui.run(function () {                
                wth = threads.start(function () {
                    if (CONFIG_loop) {
                        while (true) {
                            lastId += 1;
                            nowid = lastId;
                            nlog(nowid, "Run");
                            //,o = desc("更多功能").findOne().click();
                            // nlog(nowid, "更多功能: " + o);
                            // sleep(200);
                            // o = text("打卡").findOne().parent().parent().click();
                            // nlog(nowid, "打开界面: " + o);
                            // sleep(200);
                            // o = text("立即打卡").findOne().click();
                            // nlog(nowid, "立即打卡: " + o);
                            findOneClick(desc("更多功能"), "更多功能", nowid, 0);
                            findOneClick(text("打卡"), "打开界面", nowid, 2);
                            findOneClick(text("立即打卡"), "立即打卡", nowid, 0);
                            // sleep(200);
                            back();
                            sleep(200);
                            back();
                            sleep(200);
                            back();
                            nlog(nowid, "Finished");
                            sleep(3456);
                        }
                    } else {
                        lastId += 1;
                        nowid = lastId;
                        nlog(nowid, "Run");
                        // o = desc("更多功能").findOne().click();
                        // nlog(nowid, "更多功能: " + o);
                        // sleep(200);
                        // o = text("打卡").findOne().parent().parent().click();
                        // nlog(nowid, "打开界面: " + o);
                        // sleep(200);
                        // o = text("立即打卡").findOne().click();
                        // nlog(nowid, "立即打卡: " + o);
                        // sleep(200);
                        findOneClick(desc("更多功能"), "更多功能", nowid, 0);
                        findOneClick(text("打卡"), "打开界面", nowid, 2);
                        findOneClick(text("立即打卡"), "立即打卡", nowid, 0);
                        // back();
                        // sleep(200);
                        // back();
                        nlog(nowid, "Finished");
                        w.wid.setText("点击停止");
                        return 0;                        
                    }
                });
                w.wid.setText("点击停止");
            });
        }
    });
}

setInterval(() => {}, 1000);


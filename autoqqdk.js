var 时1=0,分1=09,秒1=10; // 准备
var 时=0,分=09,秒=15; // 点击
// ↑Config

log("Ready: " + 时1 + " : "+ 分1 + " : "+ 秒1)
log("Click: " + 时 + " : "+ 分 + " : "+ 秒)

auto.waitFor();
auto.setMode("fast");
log("获取无障碍权限");

toastLog("开始等待");
while (true) {
  var myDate = new Date();
  if(myDate.getHours() == 时1 && myDate.getMinutes() == 分1 && myDate.getSeconds() == 秒1) {
      toastLog("Ready");
      break;
      };
  sleep(300);
}
while (true) {
  var myDate = new Date();
  if(myDate.getHours() == 时 && myDate.getMinutes() == 分 && myDate.getSeconds() == 秒) { break; }
  sleep(100);
  };

toastLog("时间到");
o = click("打卡");
log("打开界面: " + o);
if (!o) {
    otst = 0
    ot = className("android.widget.ImageView").desc("加号").findOne().parent().click();
    log("try click '+': " + ot)
    while (1) {
        o = click("打卡");
        if (o) {
            log("打开界面: " + o);
            break;
            }
        otst = otst + 1;
        if (otst >= 60) {
            toastLog("Timeout");
            exit;
            }
        sleep(50);
        }
    }

st = 0
while(1) {
    sta = text("立即打卡").findOne().click());
    if (sta) {
        log("点击按钮: " + o);
        break();
        }
    }
    st = st + 1;
    if (st >= 400) {
            toastLog("Timeout");
            exit;
            }
    sleep(25);

toastLog("OK");
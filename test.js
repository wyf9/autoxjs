log(desc("更多功能"));
log(desc("更多功能").findOne());
log(desc("更多功能").findOne().click());
sleep(1000);
log(text("打卡"));
log(text("打卡").findOne());
log(text("打卡").findOne().parent());
log(text("打卡").findOne().parent().parent());
log(text("打卡").findOne().parent().parent().click());

a = {'a': 'b', 'c': 123, 'd': [1,2,3,4,5]};
log(a);
last = "";
while(true){
    curr = currentActivity();
    if (last != curr) {
        toastLog(curr);
        last = curr;
    }
    sleep(345);
}
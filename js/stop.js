function stop(){
    stopbtm = document.getElementById("btnstop");
    // $('btnstop').test = '123'
    if (stopbtm.innerHTML=='STOP')
    stopbtm.innerHTML = 'START'
    else if (stopbtm.innerHTML=='START')
    stopbtm.innerHTML = 'STOP'
    // console.log(stopbtm)
    // console.log($('btnstop'))
}
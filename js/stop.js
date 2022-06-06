function stop(){
    stopbtm = document.getElementById("btnstop");
    // $('btnstop').test = '123'
    if (stopbtm.innerHTML=='STOP'){
        stopbtm.innerHTML = 'START'
        stopbtm.style.backgroundColor='green'     
  
    }

    else if (stopbtm.innerHTML=='START'){
        stopbtm.innerHTML = 'STOP'
        stopbtm.style.backgroundColor='red'
    }
    
    // console.log(stopbtm)
    // console.log($('btnstop'))
}
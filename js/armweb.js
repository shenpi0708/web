leftdata = ['Slide[m] : ',
                        'Joint 1[deg] : ',
                        'Joint 2[deg] : ',
                        'Joint 3[deg] : ',
                        'Joint 4[deg] : ',
                        'Joint 5[deg] : ',
                        'Joint 6[deg] : ',
                        'Joint 7[deg] : ']
rightdata = ['speed [%] :',
                        'position x[m] : ',
                        'position y[m] : ',
                        'position z[m] : ',
                        'orien roll[deg] :',
                        'orien pitch[deg] :',
                        'orien Yaw[deg] : ',
                        'orien phi[deg] : ']

function createlist(name,type,range){
    var a= document.getElementById("leftside")
    console.log(leftdata.length)
    for (var i=0;i< leftdata.length;i++){
        console.log(i)
        var data = a.appendChild(document.createElement("text"));
        data.innerText=leftdata[i]
        data = a.appendChild(document.createElement("input"));
        data.className='textn'
        data.setAttribute("type", type);
        data.value = name;
        data.step = range;
        data.id='textn'
        data = a.appendChild(document.createElement("input"));
        data.className='textn'
        data.setAttribute("type", type);
        data.value = name;
        data.step = range;
        data.id='textn'   
        var data = a.appendChild(document.createElement("br"));     
    }

}
// createlist('0.00','number','0.01')
                    
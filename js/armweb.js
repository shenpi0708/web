leftdata = ['Slide [m] :',
                        'Joint 1 [deg]:',
                        'Joint 2 [deg] : ',
                        'Joint 3 [deg] :' ,
                        'Joint 4 [deg] :' ,
                        'Joint 5 [deg] :' ,
                        'Joint 6 [deg] :' ,
                        'Joint 7 [deg] : ']
rightdata = ['speed [%] :',
                        'position x [m] :',
                        'position y [m] : ',
                        'position z [m] : ' ,
                        'orien roll [deg] :' ,
                        'orien pitch [deg] :' ,
                        'orien Yaw [deg] : ' ,
                        'orien phi [deg] :  ']

function createlist(name,type,range){
    var button = document.body.appendChild(document.createElement("input"));
    button.className='textn'
    button.setAttribute("type", type);
    button.value = name;
    button.step = range;
    button.id='textn'

}
createlist('0.00','number','0.01')
                        
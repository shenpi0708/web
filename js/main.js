


//stop
const mo=function(e){e.preventDefault();};
document.body.style.overflow="hidden";        
document.addEventListener("touchmove",mo,false);

//URL par
const search_url = new URL(window.location.href);
const params = search_url.searchParams;
var method = {"method":"1"}
for (let pair of params.entries()) {
  console.log(pair[0]);
  method[pair[0]]=pair[1]
} 
var delaytime
const jsFrame = new JSFrame();
var frame
var socket = io.connect();
socket.on("connect", function () {
  setInterval(function() {
    start_time = new Date().getTime();
    socket.emit("ping",function () {
        end_time = new Date().getTime();
        
        delaytime = end_time - start_time

        document.getElementById("ms").innerHTML=delaytime+'ms'
    })
}, 2000);
});

socket.on("/my_topic", function (msg) {
  // document.getElementById("msg").innerText = msg;
  console.log(msg);
});

//jsframe





  function start(idx,name) {
      url = "html/"+name+".html"
      frame = jsFrame.create({
        appearanceName: 'yosemite',
        title: name,
        name: `window${idx}`,
        left: 20 + idx * 100, top: 100, width: 520, height: 300,
        movable: true,
        resizable: true,
        url: url,
      });
      const htmlButtonListener = () => {
        console.log('sadasd')
      };  
      window.addEventListener("pingan", e => {
        frame.closeFrame();
      });
      
      frame.show();
    }

  function click2(idx,name) {
        if (method["method"]==1){
          const windowName = `window${idx}`;
          console.log(jsFrame);
          frame = jsFrame.getWindowByName(windowName);
          if (frame){
          console.log(jsFrame);
          frame.requestFocus();
          }
          else{
              start(idx,name);
          }          
        }
        else{
          
          $("#page1").load("html/"+name+".html");
          
        }
  }

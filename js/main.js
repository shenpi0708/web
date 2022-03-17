//stop
const mo=function(e){e.preventDefault();};
document.body.style.overflow="hidden";        
document.addEventListener("touchmove",mo,false);//禁止頁面滑動

//URL par
const search_url = new URL(window.location.href);
const params = search_url.searchParams;
var method = {"method":"1"}
for (let pair of params.entries()) {
  console.log(pair[0]);
  method[pair[0]]=pair[1]
} 

var socket = io.connect();
socket.on('pub',function(data){
  socket.emit("greet");
  console.log(data);
})
socket.on("connect", function () {
  socket.emit("greet");
  console.log('socket connect ');
});

socket.on("/my_topic", function (msg) {
  // document.getElementById("msg").innerText = msg;
  console.log(msg);
});

//jsframe

  // 添加適當的事件監聽器



const jsFrame = new JSFrame();


  function start(idx,name) {
      url = "html/"+name+".html"
      const frame = jsFrame.create({
        appearanceName: 'yosemite',
        title: name,
        name: `window${idx}`,
        left: 20 + idx * 100, top: 100, width: 520, height: 320,
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
          const frame = jsFrame.getWindowByName(windowName);
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
  function aaa(){
    window.dispatchEvent(myEvent);
  }
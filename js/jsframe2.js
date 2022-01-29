const jsFrame = new JSFrame();



function start(url) {
    const jsFrame = new JSFrame();
    // Create window
    const frame = jsFrame.create({
      title: '範例',
      name:'window1',
      left: 40, top: 60, width: 500, height: 500,
      movable: true,// Enable to be moved  by mouse
      resizable: true,// Enable to be resized by mouse
      url: url
    });

    // Show window
    frame.show();
  }
  function start2(idx,url) {

      const frame = jsFrame.create({
        appearanceName: 'yosemite',
        title: `Window-${idx}`,
        name: `window${idx}`,
        left: 20 + idx * 280, top: 200, width: 260, height: 160,
        movable: true,
        resizable: true,
        url: url
      });
      frame.show();
  }

  function click2(idx) {

        const windowName = `window${idx}`;
        const frame = jsFrame.getWindowByName(windowName);
        if (frame){
        console.log(jsFrame);
        frame.requestFocus();
        }
        else{
            start2(idx,"hello.html");
        }
  }
var heartObject = (function (window, document, undefined) {
  var hearts = [];
  var max = 100;
  //请求动画帧
  window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        setTimeout(callback, 1000 / 60);
      }
  })();
  init();

  function init() {
    css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
    attachEvent();
    gameloop();
  }

  function gameloop() {
    for (var i = 0; i < hearts.length; i++) {
      if (hearts[i].alpha <= 0) {
        removeHeart(i)
        continue;
      }
      hearts[i].y--;
      hearts[i].scale += 0.004;
      hearts[i].alpha -= 0.003; //颜色渐变
      hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
    }
    requestAnimationFrame(gameloop);
  }

  function attachEvent() {
    var old = typeof window.onclick === "function" && window.onclick;
    window.onclick = function (event) {
      old && old();
      createHeart(event);
    }
  }

  function createHeart(event) {
    var position = event || randomPosition();
    var d = document.createElement("div");
    d.className = "heart";
    hearts.push({
      el: d,
      x: position.clientX - 5,
      y: position.clientY - 5,
      scale: 1,
      alpha: 1,
      color: randomColor()
    });
    document.body.appendChild(d);
    //全屏不能多于最大值 
    if (hearts.length > max) {
      removeHeart(0);
    }
  }

  function removeHeart(i) {
    document.body.removeChild(hearts[i].el);
    hearts.splice(i, 1);
  }


  function css(css) {
    var style = document.createElement("style");
    style.type = "text/css";
    try {
      style.appendChild(document.createTextNode(css));
    } catch (ex) {
      style.styleSheet.cssText = css;
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  //产生随机颜色
  function randomColor() {
    //parseInt(Math.random()*(maxNum-minNum+1)+minNum,10)
    // return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    var arryColor = ['#C600FF', "#FF0000", "#EC52DA", "#CF52EC", "#EC8052", "#EC5552", "#EC5289", "#DC0653", "#DC061A", "#F80315"];
    var random = Math.floor(Math.random() * arryColor.length)
    return arryColor[random]
  }
  //产生随机位置
  function randomPosition() {
    var clientX = Math.floor(Math.random() * $(window).width());
    var clientY = Math.floor(Math.random() * $(window).height());
    return {
      clientX,
      clientY,
      distanceY: clientY - 10
    }
  }
  return {
    createNewHeart: function () {
      return createHeart.apply(this, arguments);
    }
  }
})(window, document);

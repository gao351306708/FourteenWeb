class transtionObj {
  constructor() {
    this.timer = null
    this.percentage = 0 //进度条
    this.size = 0.3
    this.gunStart = false //开枪开始标志
  }
  //手动拽灯
  manualSwitch() {
    this.colseSwitch();
  }
  //开始动画
  start() {
    if (!eval(sessionStorage.getItem("unsplashLoading"))) {
      this.addLoading()
      this.runPercent()
      sessionStorage.setItem("unsplashLoading", "true"); //添加开屏动画标志
    }
  }
  //加载进度条
  runPercent() {
    this.timer = setInterval(() => {
      if (this.percentage > 80) {
        console.log("慢")
        this.size = 0.02
        this.percentage = this.percentage + this.size;
      } else {
        this.percentage = this.percentage + this.size;
      }
      if (this.percentage < 100) {
        $("#progressWid").css("width", this.percentage + '%');
      } else {
        $("#progressWid").css("width", '100%');
        clearInterval(this.timer);
        this.ballScroll();
      }
    }, 60);
  }
  //球开始滚动
  percentEnd() {
    this.percentage = 100;
  }
  //动画全部结束
  colseSwitch() {
    $(".switch-wrapper .line").addClass("active");
    clearInterval(this.timer);
    setTimeout(() => {
      $(".loader-1").addClass("loading");
      $(".switch-wrapper .line").removeClass("active");
      this.removeLoading();
    }, 1500);
  }
  //开启动画页面
  addLoading() {
    $("#unsplashing").css("display", 'block');
  }
  //删除动画页面
  removeLoading() {
    setTimeout(() => {
      $("#unsplashing").css("display", 'none');
    }, 1500);
  }
  //滚动小球实类
  ballScroll() {
    let _this = this;
    let ball = document.querySelector("#ball");
    if (!ball) return;
    let windowH = document.documentElement.clientHeight;
    let windowW = document.documentElement.clientWidth;
    let ballFlyWidth = windowW - 50; //球在上方飞到开关时水平的距离
    let ballFlyheight = 250 - 100; //球飞到开关时下落的高度
    let end1 = windowH - 152; //球落在斜坡上时
    let originTop = ball.offsetTop;
    let originLeft = ball.offsetLeft;
    let topReset = -30;
    let vt = 0; //自由落体速度
    var Animation1, Animation2, timer1, timer2
    timer1 = function () {
      if (ball.offsetTop > end1) {
        //到达斜坡上
        if (ball.offsetTop < windowH - 30) {
          //到达底部
          originTop += 4;
          ball.style.top = originTop + "px";
        }
        if (ball.offsetLeft < 60) {
          //到达洞口,下落
          originTop += 2;
          ball.style.top = originTop + "px";
          if (ball.offsetTop >= windowH) {
            //掉进底部洞里
            cancelAnimationFrame(Animation1)
            timer2();
          } else {
            originLeft -= 2;
            ball.style.left = originLeft + "px";
          }
        } else {
          originLeft -= 4;
          ball.style.left = originLeft + "px";
        }
      } else {
        vt = vt + 0.1; //模拟个自由落体的感觉
        originTop += vt;
        ball.style.top = originTop + "px";
      }
      if (ball.offsetTop < windowH) {
        Animation1 = requestAnimationFrame(timer1)
      }
    };
    timer2 = function () {
      //重新开始新的逻辑
      if (topReset < 68) {
        ball.style.top = topReset + "px";
        topReset += 2;
      } else {
        if (!_this.gunStart) {
          //在原来的后面加这个，打枪
          $(".progressClassGun").addClass("active");
        }
        ball.style.top = topReset + "px";
        topReset += 1;
        originLeft += (ballFlyWidth / ballFlyheight) * 1;
        ball.style.left = originLeft + "px";
        if (ball.offsetLeft > windowW - 100) {
          cancelAnimationFrame(Animation2)
          ball.style.display = "none";
          $(".switch-wrapper").addClass("active"); //在原来的后面加这个，开始摇摆
          setTimeout(() => {
            _this.colseSwitch(); //摇摆完了
          }, 2000);
        }
      }
      if (originLeft < windowW) {
        Animation2 = requestAnimationFrame(timer2)
      }
    };
    Animation1 = requestAnimationFrame(timer1)
  }
}


var transtion = new transtionObj();
//开始加载页面，进度条加载
transtion.start();

function manualSwitchHandle() {
  transtion.colseSwitch();
}




//资源文档加载完之后开始执行动画
window.onload = function () {
  console.log("页面加载完成onload")
  transtion.percentEnd()
}

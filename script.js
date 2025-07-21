function init(){
    gsap.registerPlugin(ScrollTrigger);
  
  
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, 
    getBoundingClientRect() {
      return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });
  
  
  
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  
  ScrollTrigger.refresh();
  
  }
  init();
  


const cursor = document.getElementById("cursor");
document.onpointermove = (event) => {
  const { clientX, clientY } = event;
  cursor.animate(
    {
      left: `${clientX-10}px`,
      top: `${clientY-10}px`,
    },
    { duration: 3000, fill: "forwards" }
  );
};


var round_cursor = document.querySelectorAll(".round-cursor");
round_cursor.forEach(function(elements){
    elements.addEventListener("mouseenter",function(){
        // elements.style.color = "black"
        // cursor.style.zIndex =1000,
        cursor.style.scale = 3
        cursor.style.transition = "all ease-in-out .2s"
        cursor.style.backgroundColor = "transparent";
        cursor.style.border = "1px solid white"
    })
    elements.addEventListener("mouseleave",function(){
        // elements.style.color = "white"
        // console.log("Sfsd")
        // cursor.style.delay =1
        cursor.style.scale = 1
        cursor.style.backgroundColor = "#d4e2d4"
        cursor.style.border = "1px solid #d4e2d4"
    })
})
 

var tl = gsap.timeline();





function time() {
    var a = 0
    setInterval(function(){
        a = a + Math.floor(Math.random()*20)
        if (a<100) {
            document.querySelector("#loader h1").innerHTML = a + "%"
        }
        else{
            a= 100
            document.querySelector("#loader h1").innerHTML = a + "%"
        }
        // console.log(a)
    },150)
}



tl.to("#loader h1",{
    delay:0.5,
    duration:1,
    onStart:time(),
    scrub:2
})

tl.to("#loader",{
    top:"-100vh",
    delay:.4,
    duration:1.2,
    stagger: 1.1
})



tl.from("nav a",{
    y:-500,
    opacity:0,
    // delay:.5,
    duration:.5,
    // stagger: 0.2
})

tl.from(".name-container h1, .name-container ul li",{
    y:-100,
    opacity:0,
    duration:0.5,
    stagger: 0.2,
})


tl.to(".scroll-down",{
    y: 20,
    opacity: 1,
    duration:1.5,
    transition: "all linear ease",
    opacity: 1,
    repeat: -1,
    yoyo: true
})


tl.from(".page2 .left-container img, .right-container img",{
    y:200,
    duration: 2,
    delay: 1,
    stagger:0.2,
    scrollTrigger:{
        trigger:" .page2 ",
        scroller:"#main",
        // markers:true,
        start: "top 80%",
        end: " top 65%",
        scrub: 3  
    }
})


gsap.from(".left-container h2",{
    x:-50,
    opacity:0,
    duration: 2,
    // delay: 1,
    scrollTrigger:{
        trigger:".left-container",
        scroller:"#main",
        // markers:true,
        start: "top 60%",
        end: "top 75%",
        scrub: 1
    }
})

gsap.from(".right-container h1",{
    x:-100,
    opacity:0,
    duration: 2,
    delay: 1,
    stagger:.4,
    scrollTrigger:{
        trigger:".right-container",
        scroller:"#main",
        // markers:true,
        start: "top 10%",
        end: "top 25%",
        scrub: 2
    }
})

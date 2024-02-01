'use strict'

$(function() {
    // 마우스에 따라 움직이는 이미지 이벤트
    // let image;
    // let x = 0, y = 0; 
    // let mx = 0, my = 0; 
    
    // const speed = 0.03; 
    // const loop = () => { 
    //     mx += (x - mx) * speed; 
    //     my += (y - my) * speed; 
    //     window.requestAnimationFrame(loop); 
    // } 

    // const mouseFunc = (e) =>{ 
    //     x = (e.clientX-window.innerWidth/2), 
    //     y = (e.clientY-window.innerHeight/2); 
        
    //     image.style.transform = `translate(${-(mx/20)}px, ${-(my/20)}px)`; 
    //     // background.style.transform = `translate(${(mx/12)}px, ${(my/6)}px)`; 
    // }

    // window.onload = () => {
    //     image = document.getElementById("app_slogan_img");
    //     loop();
    //     window.addEventListener("mousemove", mouseFunc);
    // }

    
    // Swiper 이벤트 설정
    $(window).on("resize", () => {
        initSwiper4();
    });
    initSwiper4();

    // waypoint 스크롤 이벤트
    HeaderChange2("main", "up", "-50", "transparent", "#EDEDED");
    HeaderChange2("main", "down", "-50", "rgba(23, 23, 23, 0.8)", "rgba(50, 50, 50, 1)");
    
    // waypoint 애니메이션 이벤트
    WaypointAnimation("app_process", "80%");
    WaypointAnimation("app_record", "80%");
    WaypointAnimation("app_membership", "80%");
});
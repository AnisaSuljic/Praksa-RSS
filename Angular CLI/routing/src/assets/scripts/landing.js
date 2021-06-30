const hamburger = document.getElementsByClassName("hamburger");
const mobile = document.getElementsByClassName("headerNav");

var head=document.getElementsByClassName("header");

document.addEventListener('scroll',()=>{
    var scroll_pos=window.scrollY;
    if(scroll_pos>100)
    {
        head[0].style.backgroundColor="#8c3cb1";
    }
    else{
        head[0].style.backgroundColor="transparent";
    }
});

document.addEventListener('click',() => {
    console.log(hamburger);
    console.log(mobile);
    hamburger[0].classList.toggle('active');
    mobile[0].classList.toggle('active');
});



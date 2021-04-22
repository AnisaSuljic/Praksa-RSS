// const hamburger = document.querySelector(".hamburger");
// const mobile = document.querySelector('.header .nav-bar .nav-list ul');
// const header = document.querySelector('.header');

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

var hamDiv=document.getElementsByClassName("hamburger");
var mobDiv=document.getElementsByClassName("headerNav");

document.addEventListener('click',() => {
    hamDiv[0].classList.toggle('active');
    mobDiv[0].classList.toggle('active');
});



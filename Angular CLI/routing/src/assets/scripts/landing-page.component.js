const hamburger = document.querySelector('#header .header .nav-bar .nav-list .hamburger');
const mobile = document.querySelector('.header .nav-bar .nav-list ul');
const header = document.querySelector('.header');

hamburger.addEventListener('click',() => {
    hamburger.classList.toggle('active');
    mobile.classList.toggle('active');
});

document.addEventListener('scroll',()=>{
    var scroll_pos=window.scrollY;
    if(scroll_pos>100)
    {
        header.style.backgroundColor="#8c3cb1";
    }
    else{
        header.style.backgroundColor="transparent";
    }
});
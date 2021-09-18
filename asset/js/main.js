const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const searchToggle = $('.search-toggle');
const headerWrap = $('.header-wrapper');
const header = $('.header');
const mobielMenuBarItems = $$('.mobile-menu__menubar__item');
// scroll header
var prevScrollPos = window.pageYOffset;
document.onscroll = function(){
    var currentScrollPos = window.pageYOffset;
    if(currentScrollPos  > 100){
        if(prevScrollPos>currentScrollPos ){
            header.classList.remove('active')
        }else{
            header.classList.add('active')
        }
    }
    prevScrollPos = currentScrollPos

}

//Open/ close nav search 

searchToggle.addEventListener('click',()=>{
    headerWrap.classList.toggle('open');
})

function menuHightLight(){
    var url = document.location.pathname;
    var currentLink ;

    if(document.documentElement.clientWidth>= 1024){
        if($(".header-wrapper .menubar-wrap .menubar__item a") != null){
            currentLink = $(".header-wrapper .menubar-wrap .menubar__item a[href='"+ url+"']")
            currentLink.classList.add('active');
        }
    }
    
    
}
menuHightLight();

mobielMenuBarItems.forEach(item => {
    item.addEventListener("click",function(e){
        let clickedLi;
        if(e.target.classList.contains('caret-right')){
            clickedLi = e.target.parentElement;
        }else{
            clickedLi = e.target.parentElement;
        }

        clickedLi.classList.toggle("showSubMenu");

    })
    
});


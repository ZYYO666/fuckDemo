
function toggleClass(selector, className) {
    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        element.classList.toggle(className);
    });
}

document.getElementById("more").addEventListener("click", function () {

    toggleClass(".nav_home", "active");

});



document.getElementsByClassName("nav_home")[0].addEventListener("click", function () {
    toggleClass(".nav_home", "active");

});

document.getElementsByClassName('nav_home_container')[0].addEventListener('click', function (event) {
    event.stopPropagation();
});



window.addEventListener("scroll", function () {
    if (window.pageYOffset > 20) {
        document.querySelector(".header").classList.add("active");
    } else {
        document.querySelector(".header").classList.remove("active");
    }
});



window.onload = function () {
    window.setTimeout(fadeout, 500);
}
function fadeout() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}
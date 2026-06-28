// Navbar Scroll Effect

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function(){

    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

// Mobile Menu

const menu = document.querySelector(".menu");

const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", function(){

    navLinks.classList.toggle("active");

});

// Close menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});
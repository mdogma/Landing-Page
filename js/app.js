/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
 * 
 * 
*/

const navList = document.getElementById("navbar__list");

const aLinks = document.getElementsByTagName('a');

const sections = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

const navCreation = (elements) => {
     for (element of elements) {
        const newLi = document.createElement('li');
        const newItem = document.createElement('a');
        newItem.setAttribute('data-link', `${element.id}`);
        newItem.classList.add("scroll_to");
        newItem.textContent = element.getAttribute('data-nav');
        navList.appendChild(newLi);
        newLi.appendChild(newItem);
    };
}

// Add class 'active' to section when section reaches the top of the viewport

const mediumScreen = window.matchMedia("(max-width: 720px)");
const smallScreen = window.matchMedia("(max-width: 450px)");

function turnSectionActive(elements) {
  for (element of elements) {
    const rect = element.getBoundingClientRect();
    if (rect.top <= 180 && rect.bottom >= 180) {
      element.classList.add('active');
    } 
    //For Medium Screens
    else if (mediumScreen.matches && rect.top <= 660 && rect.bottom >= 660) {
      element.classList.add('active');
    }
    // For small screens
    else if (smallScreen.matches && rect.top <= 740 && rect.bottom >= 740) {
      element.classList.add('active');
    }
    else {
      element.classList.remove('active');
    }
  }
}

/*
function turnSectionActive(elements) {
    for (element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 180 && rect.bottom >= 180) {
        element.classList.add('active');
      } 
      else (else {
        element.classList.remove('active');
      }
    }
 }

 */

// Scroll to anchor ID using scrollIntoView event


function linker() {
    links.forEach((link) => {
    link.addEventListener('click',() => {
        const dataRelated = document.getElementById(link.getAttribute('data-link'));
        dataRelated.scrollIntoView({behavior:'smooth', block: 'center'})
    })
  })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

navCreation(sections);

// Scroll to section on link click

const links = document.querySelectorAll('.scroll_to');

linker();


// Set sections as active

document.addEventListener("scroll",() => {
    turnSectionActive(sections);
  });


// Toggle Menu

// Creating hidden toggle menu

// 
const navMenu = document.querySelector('.navbar__menu');
const respMenu = document.createElement('div');
respMenu.classList.add('burger');

navMenu.appendChild(respMenu);

// Building our burger lines with 3 empty divs on top of each others that we will color with CSS

for (let i = 1 ; i <= 3 ; i++) {
  const newDivs = document.createElement('div');
  respMenu.appendChild(newDivs);
  newDivs.setAttribute('class', 'line'+[i])
}


// Function allowing the hidden menu to show up progressively in the viewport once our burger icon is clicked on

const navSlide = () => { 
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelectorAll('#navbar__list li');

  burger.addEventListener('click',()=> {
      // Toggle active class for the navigation bar and our hidden menu
    navList.classList.toggle('nav-active');
      // Animation effect to slowly bring the <li> up to the screen
    navLinks.forEach((navli, index) => { 
      navli.style.animation = `navLinkFade 0.5s ease forwards ${index/ 7 + 0.7}s`;
  })
})
}

// Calling our function navSlide

navSlide();


// Hide navigation bar when scrolling down / Show when scrolling back up 

let lastScrollTop = 0;

window.addEventListener('scroll',() => {

  const navWrapper = document.querySelector('.page__header');
  const scrollTop = window.pageYoffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop){
    // Hide navigation bar 
    navWrapper.style.top="-80px";
  } else {
    // Show navigation bar 
    navWrapper.style.top="0";
  }
  lastScrollTop = scrollTop;
});

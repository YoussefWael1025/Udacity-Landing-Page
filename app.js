// Define global variables

let sections = [...document.querySelectorAll('section')];
const navigationMenu = document.getElementById('navbar__list');
const topButton = document.getElementById('btn');

// creates List items based on number of sections in the page
function createListItems() {
  // loops over each section to add a corresponding li in navbar
  for (let i = 1; i <= sections.length; i++) {
    listItem = document.createElement('li');
    listItem.innerHTML = `<a class='menu__link section${i}' data-link='section${i}'>section${' '+ i}</a>`;
    navigationMenu.appendChild(listItem);
  }
}
createListItems();
// creates an array of all the list items in navbar
const li = [...document.getElementsByClassName("menu__link")];
/** loops over the li array and adds an EventListener for 'click' on the navbar
  to allow smooth scrolling to the corresponding section **/
li.forEach((item) => {
  item.addEventListener("click", () => {
    const elem = document.getElementById(item.getAttribute("data-link"));
    elem.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
})


// function to toggle the 'your-active-class' for the section in viewport
function activeClassToggle() {
  sections.forEach(function(section) {
    // if the section is in viewport
    if (section.getBoundingClientRect().top > 0 && section.getBoundingClientRect().top < 584) {
      // if the section doesn't contain a class "your-active-class"
      if (!section.classList.contains('your-active-class')) {
        // adds the class
        section.classList.add('your-active-class');

      }
    }
    // removes 'your-active-class' class from sections that are not in viewport
    else {
      section.classList.remove('your-active-class');
    }
  });
}
// autoscroll button after a +300 pageYoffset
window.addEventListener('scroll', () => {
  if (window.pageYOffset >= 300) {
    topButton.style.display = 'inline-block';
  } else {
    topButton.style.display = 'none';
  }
});
// Active Id toggler for navbar list
window.addEventListener('scroll', () => {
  let current = " ";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    // i used the -15 because scrollIntoView of the previous function was off by 15 px from this one
    if (window.pageYOffset > sectionTop-15) {
      current = section.getAttribute('id');
    }
  });
  // adds the active Id to the corrisponding list of the viewed section
  li.forEach(list => {
    list.removeAttribute('id');
    if (list.classList.contains(current)) {
      list.setAttribute('id', 'activeList');
    }
  });
});


topButton.addEventListener('click', () => window.scrollTo({top:0, left:0, behavior:'smooth'}))
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// callback function that gets activated upon scrolling
window.addEventListener('scroll', activeClassToggle);

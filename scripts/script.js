const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('nav')[0];
const navLinks = navbarLinks.getElementsByTagName('a');

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});

for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', () => {
        navbarLinks.classList.remove('active');
    });

    
}

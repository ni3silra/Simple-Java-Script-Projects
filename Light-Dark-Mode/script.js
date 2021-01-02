const toggleButton = document.querySelector('input[type=checkbox]');
const toggleIcon = document.getElementById('toggle-icon');
const themeMode = 'lightTheme'

// Store theme inn LocalStorage
function getLocalStorageAndSetTheme(){
  const currenttheme = localStorage.getItem(themeMode);
  if(currenttheme) 
    changeMode(currenttheme);
}

function changeMode(mode){
  let isLight = (mode === 'light') ? true :false;

  toggleButton.checked = !isLight;

  document.documentElement.setAttribute('data-theme',mode);

  for (var input = 1; input <= 3; input++)
  document.getElementById(`image${input}`).src = `img/image${input}_${mode}.svg`;

  document.getElementById('nav').style.backgroundColor =   isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
  document.getElementById('text-box').style.backgroundColor = isLight ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';

  isLight ? toggleIcon.children[0].classList.replace('fa-moon','fa-sun') : toggleIcon.children[0].classList.replace('fa-sun','fa-moon');

}

// Switch Theme Dymanically
function switchTheme(event){
  const mode = event.target.checked ? 'dark': 'light';
  changeMode(mode);
  localStorage.setItem(themeMode,mode);
}

// Event Listener
toggleButton.addEventListener('change',switchTheme); 
getLocalStorageAndSetTheme();


const img = document.querySelector('img');
const songTitle = document.getElementById('title');
const artist = document.getElementById('artist');
const audioElment = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl =  document.getElementById('current-time');
const durationEl =  document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
    name : 'jacinto-1',
    displayName : 'Electric Chill Machine',
    artist: 'Jacinto Design'
    },
    {
     name : 'jacinto-2',
    displayName : 'Seven Nation Army Remix',
    artist: 'Jacinto Design'
    },
    {
    name : 'jacinto-3',
    displayName : 'Sam Folk',
    artist: 'Jacinto Design'
    },
    {
    name : 'metric-1',
    displayName : 'Sam Folk (Remix)',
    artist: 'Metrico'
    }
];
let isPlaying = false;
let playingSongIndex = 0;
const total = songs.length ;


// play 
function playSong(){
    audioElment.play();
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
}

// Pause 
function pauseSong(){
    audioElment.pause();
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
}


// Play or Pause EventListner
playBtn.addEventListener('click', ()=>{
    (isPlaying ? pauseSong() : playSong())
});

// Update DOM
function loadSong(song){
    songTitle.textContent = song.displayName;
    artist.textContent = song.artist;
    audioElment.src = `music/${song.name}.mp3`;
    img.src = `img/${song.name}.jpg`;
}

// Previous Song 
function prevSong(){
    const prevIndex = playingSongIndex === 0 ?  total-1 :--playingSongIndex%total;   
    playingSongIndex = prevIndex;
    loadSong(songs[prevIndex]);
    playSong();
}

// Next Song 
function nextSong(){
    const nextIndex = playingSongIndex++%total;
 //   playingSongIndex = nextIndex;
    loadSong(songs[nextIndex]);
    playSong();
}


// Update Progress Bar

function updateProgressBar(event){
    if(isPlaying){
        const {duration , currentTime} = event.srcElement;  // Object Destructuring
        const progressPercentage = (currentTime / duration)*100;
        progress.style.width = `${progressPercentage}%`;
        // Calculate display for duration 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        durationSeconds =  durationSeconds < 10 ? `0${durationSeconds}` : durationSeconds;
      // delay 
    if(durationSeconds)
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

     // Calculate display for Current Time 
     const CurrentMinutes = Math.floor(currentTime / 60);
     let currentSeconds = Math.floor(currentTime % 60);
     currentSeconds =  currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    
     if(currentSeconds)
    currentTimeEl.textContent = `${CurrentMinutes}:${currentSeconds}`;
    
    }
}


// Set Progress Bar
function setProgressBar(event){
    const width = this.clientWidth;
    const offsetX = event.offsetX;
    const {duration} = audioElment;
    audioElment.currentTime = Math.floor(((offsetX/width)*duration));
}

// On Load - Select First Song
loadSong(songs[0]);

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

audioElment.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar);
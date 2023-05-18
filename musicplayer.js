const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const album = document.querySelector('#album');
const duration = document.querySelector('#duration');

const cover = document.querySelector('#cover');
const tracklist = document.querySelector('.playlist');

//Song list
var songlist = {
                "songs": [
                {
                    "name": "the weans",
                    "artist": "walmartwizard",
                    "album": "Unreleased",
                    "duration": "00:51",
                    "url": "https://files.catbox.moe/um28sd.mp3",
                    "cover_art_url": "https://github.com/walmartwizard/walmartwizard/blob/9851e1a0d86497ffc102bb4c020041c369566d03/img/sharkiefren.jpg"
                },
JSON.stringify(songlist);

//Keep track of the songs
let songIndex = 0;

//Initially load song info DOM
loadSong(songIndex)

//Update song details
function loadSong(songIndex) {
    title.innerText = songlist.songs[songIndex].name;
    artist.innerText = songlist.songs[songIndex].artist;
    album.innerText = songlist.songs[songIndex].album;
    duration.innerText = songlist.songs[songIndex].duration;
    
    audio.src = songlist.songs[songIndex].url;
    cover.src = songlist.songs[songIndex].cover_art_url;
    audio.volume = 0.5;
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.innerHTML.replace('<img src="Images/Transparents/orange.png">')
    
    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    
    audio.pause()
}

function prevSong() {
    songIndex--
    
    if(songIndex < 0) {
        songIndex = songlist.songs.length - 1
    }
    
    loadSong(songIndex)
    
    playSong()
}

function nextSong() {
    songIndex++
    
    if(songIndex > songlist.songs.length - 1) {
        songIndex = 0
    }
    
    loadSong(songIndex)
    
    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    console.log(width)
    const clickX = e.offsetX
    const duration = audio.duration
    
    audio.currentTime = (clickX / width) * duration
    console.log(e.srcElement)
}

function setTrack(index) {
    loadSong(index);
    playSong();
    songIndex = index;
    
    //Update the highlighted track
    let tracklistItems = tracklist.getElementsByTagName('li');
    for(i = 0; i < songlist.songs.length; i++) {
        let trackIndex = tracklistItems[i].getAttribute('data-index');
        if(trackIndex == songIndex) {
            tracklistItems[i].className += " activeSong";
        } else {
            tracklistItems[i].className = tracklistItems[i].className.replace(" activeSong", "");
        }
    }
}

// Event Listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')
    
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);

//Tracklist
let tracklistItems = tracklist.getElementsByTagName('li');
for(i = 0; i < songlist.songs.length; i++) {
    let trackIndex = tracklistItems[i].getAttribute('data-index');
    
    let tracklistItemTitle = tracklistItems[i].getElementsByClassName('trackTitle');
    let tracklistItemArtist = tracklistItems[i].getElementsByClassName('trackArtist');
    let tracklistItemDuration = tracklistItems[i].getElementsByClassName('trackDuration');
    
    tracklistItemTitle[0].innerHTML = songlist.songs[trackIndex].name;
    tracklistItemArtist[0].innerHTML = songlist.songs[trackIndex].artist;
    tracklistItemDuration[0].innerText = songlist.songs[trackIndex].duration;
    
    if(trackIndex == songIndex) {
        tracklistItems[i].className += " activeSong";
    } else {
        tracklistItems[i].className = tracklistItems[i].className.replace(" activeSong", "");
    }
}
// Sample playlist (replace with your actual playlist data)
const playlist = [
  {
    title: "All Too Well (Taylor's Version)",
    artist: "Taylor Swift",
    audioSource: "song.mp3",
    imageSource: "https://source.unsplash.com/random"
  }
  // Add more songs here if needed
];

// Get elements from the DOM
const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");
const artistImage = document.querySelector(".artist-image img");
const songTitle = document.querySelector(".song-title");
const artistName = document.querySelector(".artist-name");

let isPlaying = false;
let currentSongIndex = 0;

// Function to update the player with the current song details
function updatePlayer() {
  const currentSong = playlist[currentSongIndex];
  artistImage.src = currentSong.imageSource;
  songTitle.textContent = currentSong.title;
  artistName.textContent = currentSong.artist;
  audioPlayer.src = currentSong.audioSource;
}

// Function to play or pause the audio
function togglePlayPause() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.textContent = "\u25BA";
  } else {
    audioPlayer.play();
    playPauseBtn.textContent = "\u275A\u275A";
  }
  isPlaying = !isPlaying;
}

// Function to play the previous song
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  updatePlayer();
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Function to play the next song
function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  updatePlayer();
  if (isPlaying) {
    audioPlayer.play();
  }
}

// Event listeners
playPauseBtn.addEventListener("click", togglePlayPause);
prevBtn.addEventListener("click", playPreviousSong);
nextBtn.addEventListener("click", playNextSong);

audioPlayer.addEventListener("timeupdate", () => {
  const progressPercent =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progress.style.width = `${progressPercent}%`;
});

// Start the animation when audio starts playing
audioPlayer.addEventListener("play", () => {
  function animateCircularSlider() {
    const progressPercent =
      (audioPlayer.currentTime / audioPlayer.duration) * 100;
    const degree = (360 * progressPercent) / 100;
    const rotation = `rotate(${degree}deg)`;
    progress.style.transform = rotation;
    requestAnimationFrame(animateCircularSlider);
  }
  animateCircularSlider();
});

// Pause the animation when audio is paused
audioPlayer.addEventListener("pause", () => {
  cancelAnimationFrame(animateCircularSlider);
});

// Initialize the player with the first song
updatePlayer();
//Get Lyrics
const options = {
  method: "GET",
  url: "https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/",
  params: { id: "7076626" },
  headers: {
    "X-RapidAPI-Key": "2f605e1232mshf91c0bfe5d5f5dbp190ef1jsn099b8b58a4a2",
    "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com"
  }
};
const importLyrics = async () => {
  try {
    const response = await axios.request(options);
    console.log(response.data.lyrics.lyrics.body.html);
    document.getElementById("lyrics").innerHTML =
      response.data.lyrics.lyrics.body.html;
  } catch (error) {
    console.error(error);
  }
};
importLyrics();

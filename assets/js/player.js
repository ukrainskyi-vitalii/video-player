const videoPlayer = document.querySelector('.video-player');
const controls = videoPlayer.querySelector('.controls');
const video = videoPlayer.querySelector('video');
const playIcon = videoPlayer.querySelector('.video-player-icon');
const playButton = videoPlayer.querySelector('.play-button');
const progress = videoPlayer.querySelector('.progress');
const progressBar = videoPlayer.querySelector('.progress-bar');
const volumeRange = videoPlayer.querySelector('input[name="volume"]');
const soundButton = videoPlayer.querySelector('.sound-button');
const fullscreenButton = videoPlayer.querySelector('.fullscreen-button');
const refreshButton = videoPlayer.querySelector('.refresh-button');

const playVideo = () => video.paused ? startPlay() : pausePlay();

const startPlay = () => {
    playIcon.style.display = 'none';
    controls.classList.remove('hidden');
    video.play();
}

const pausePlay = () => {
    playIcon.style.display = 'block';
    video.pause();
}

const handleEndedVideo = () => playIcon.style.display = 'block';

const updateButton = () => playButton.classList.toggle('pause-button');

const handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

const handleProgressShift = (e) => video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;

const handleVolume = (e) => {
    const value = e.target.value;
    video.volume = value;
    volumeRange.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${value * 100}%, #fff ${value * 100}%, white 100%)`;
    video.muted = video.volume === 0;
    if (video.volume === 0) soundButton.classList.add('mute-button');
    if (video.volume !== 0) soundButton.classList.remove('mute-button');
}

const handleSoundButton = () => {
    video.muted = video.muted ? false : true;
    soundButton.classList.toggle('mute-button');
}

const handleFullScreen = () => video.webkitSupportsFullscreen ? video.webkitEnterFullScreen() : false;

const handleRefreshVideo = () => {
    video.pause();
    video.currentTime = 0;
    video.play();
}

video.addEventListener('click', playVideo);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('ended', handleEndedVideo);
video.addEventListener('timeupdate', handleProgress);

playButton.addEventListener('click', playVideo);
playIcon.addEventListener('click', playVideo);

let mousedown;
progress.addEventListener('click', handleProgressShift);
progress.addEventListener('mousemove', (e) => mousedown && handleProgressShift(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseout', () => mousedown = false);

let volumedown;
volumeRange.addEventListener('change', handleVolume);
volumeRange.addEventListener('mousemove', (e) => volumedown && handleVolume(e));
volumeRange.addEventListener('mousedown', () => volumedown = true);
volumeRange.addEventListener('mouseup', () => volumedown = false);
volumeRange.addEventListener('mouseout', () => volumedown = false);

soundButton.addEventListener('click', handleSoundButton);

fullscreenButton.addEventListener('click', handleFullScreen);

refreshButton.addEventListener('click', handleRefreshVideo);
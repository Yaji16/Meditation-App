const app = () => {
  const song = document.querySelector('.song');
  const play = document.querySelector('.play');
  const outline = document.querySelector('.moving-outline circle');
  const video = document.querySelector('.vid-container video');

  //sounds
  const sounds = document.querySelectorAll('.sound-picker button');
  //time display
  const timeDisplay = document.querySelector('.time-display');
  const timeSelect = document.querySelectorAll('.time-select button');
  //get the length of outline- because we want to animate interval
  const outlineLength = outline.getTotalLength();
  //duration
  let fakeDuration = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  //pick different sounds 
  sounds.forEach(sound => {
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound');
      video.src = this.getAttribute('data-video');
      checkPlaying(song);
    });
  });

  //play sound
  play.addEventListener('click',() =>{
    checkPlaying(song);
  });
  //select the duration and set the time-display to that value
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time');
      timeDisplay.textContent = `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`
    });
  });
  //create a function specific to stop and play the sounds
  const checkPlaying = song => {
    if(song.paused){
      song.play();
      video.play();
      play.src="svg/pause.svg";
    }else{
      song.pause();
      video.pause();
      play.src="svg/play.svg";
    }
  };

  //We can animate the circle
  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    //animate the circle
    let progress = outlineLength - (currentTime/fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;
    //Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    //if the time set is completed then reset the time and stop-song+video and change to play
    if(currentTime >= fakeDuration){
      song.pause();
      video.pause();
      play.src="svg/play.svg";
      song.currentTime = 0;
    }
  }
};

app();

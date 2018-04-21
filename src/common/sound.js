export default (source) => {
  if (source) {
    const audio = new window.Audio();
    audio.src = source;
    audio.play();
  }
};

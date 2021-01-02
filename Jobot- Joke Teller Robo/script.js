  
const button = document.querySelector("#button");
const audioElement = document.querySelector("#audio");
const jokeApiUrl = "https://sv443.net/jokeapi/v2/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist";
const apiTextToSpeechKey = "54c9874c1efc47d78c4a6da6f2389db7";
const voice = "en-us";
const format = "mp3";
const frequancy = "44khz_16bit_stereo";



// Passing Joke to VoiceRSS API
function textToSpeech(joke) {
  VoiceRSS.speech({
    key: apiTextToSpeechKey,
    src: joke,
    hl: voice,
    v: "Eka",
    r: 0,
    c: format,
    f: frequancy,
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  try {
    const response = await fetch(jokeApiUrl);
    const data = await response.json();

    data.setup
      ? (joke = `${data.setup} ... ${data.delivery}`)
      : (joke = data.joke);

    textToSpeech(joke);
    toggleButton();
  } catch (error) {
    console.log(error);
  }
}

function toggleButton() {
  button.disabled = !button.disabled;
}

button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
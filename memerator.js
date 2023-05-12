/** @format */

const memeGenerator = document.getElementById("memeGen");
const memeContainer = document.getElementById("memeContainer");
const deleteMemesButton = document.getElementById("deleteButton");
const MEMES_STORAGE_KEY = "memes";

// Function to create memes
function createMeme(topText, bottomText, imgUrl) {
  const memeImage = document.createElement("img");
  memeImage.src = `${imgUrl}`;

  const topTextDiv = document.createElement("div");
  topTextDiv.innerText = topText;
  topTextDiv.classList.add("topText");

  const bottomTextDiv = document.createElement("div");
  bottomTextDiv.innerText = bottomText;
  bottomTextDiv.classList.add("bottomText");

  const meme = document.createElement("div");
  meme.classList.add("meme");
  meme.append(topTextDiv, bottomTextDiv, memeImage);

  memeContainer.appendChild(meme);
  meme.addEventListener("click", function () {
    meme.classList.toggle("selected");
  });

  const savedMemes = JSON.parse(
    localStorage.getItem(MEMES_STORAGE_KEY) || "[]"
  );

  // Check if the meme object is already in savedMemes
  const memeExists = savedMemes.some(
    (m) =>
      m.topText === topText &&
      m.bottomText === bottomText &&
      m.imgUrl === imgUrl
  );

  // If the meme object doesn't exist, add it to savedMemes and update local storage
  if (!memeExists) {
    savedMemes.push({ topText, bottomText, imgUrl });
    localStorage.setItem(MEMES_STORAGE_KEY, JSON.stringify(savedMemes));
  }
}

// Loop to create memes from local storage
const savedMemes = JSON.parse(localStorage.getItem(MEMES_STORAGE_KEY) || "[]");
for (const meme of savedMemes) {
  createMeme(meme.topText, meme.bottomText, meme.imgUrl);
}

// Event listener to create new memes
memeGenerator.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const { value: topText } = document.getElementById("topText");
  const { value: bottomText } = document.getElementById("bottomText");
  const { value: imgUrl } = document.getElementById("imgUrl");

  if (!topText || !bottomText || !imgUrl) {
    alert("Something's missing.......");
    return;
  }

  createMeme(topText, bottomText, imgUrl);
  memeGenerator.reset();
});

// Event listener to delete selected memes
deleteMemesButton.addEventListener("click", function () {
  const memes = document.querySelectorAll(".meme");
  for (let meme of memes) {
    if (meme.classList.contains("selected")) {
      meme.remove();
      const savedMemes = JSON.parse(
        localStorage.getItem(MEMES_STORAGE_KEY) || "[]"
      );
      const index = savedMemes.findIndex(
        (m) =>
          m.topText === meme.querySelector(".topText").textContent &&
          m.bottomText === meme.querySelector(".bottomText").textContent &&
          m.imgUrl === meme.querySelector("img").src
      );
      if (index !== -1) {
        savedMemes.splice(index, 1);
        localStorage.setItem(MEMES_STORAGE_KEY, JSON.stringify(savedMemes));
      }
    }
  }
});

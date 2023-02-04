const search_Btn = document.getElementById("search-btn");
const search_Box = document.querySelector(".search-box");
const resultContainer = document.querySelector(".result");

const renderError = (response) => {
  if (response.title) throw new Error(`${response.title}`);
};

function renderWord(data, word) {
  const details = data.meanings[0].partOfSpeech;
  const meaning = data.meanings[0].definitions[0].definition;
  const example = data.meanings[0].definitions[0].example || "";

  const html = `
<div class="word"> <h3>${word}</h3> </div>
    <div class="details"><p>${details}</p></div>
    <p class="word-meaning">${meaning}</p>
    <p class="word-example">${example}</p>`;

  resultContainer.innerHTML = html;
}

const loadResult = async () => {
  try {
    const inputWord = document.getElementById("inp-word").value;
    const word = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`
    );
    const wordData = await word.json();
    renderError(wordData);

    renderWord(wordData[0], inputWord);
  } catch (error) {
    resultContainer.innerHTML = `<h3 class="error"> ${error.message}</h3>`;
  }
};

search_Btn.addEventListener("click", loadResult);

search_Box.addEventListener("keydown", function (e) {
  return e.key === "Enter" ? loadResult() : null;
});

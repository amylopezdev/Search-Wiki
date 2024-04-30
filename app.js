const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const form = document.querySelector(".form");
const searchInput = document.querySelector(".search-input");
const resultsDOM = document.querySelector(".results");
const resultsInfo = document.querySelector(".results-info");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = searchInput.value;
  if (!value) {
    resultsDOM.innerHTML =
      '<div class="error">Please enter a search term</div>';
      resultsInfo.innerHTML = '';
    return;
  }
  fetchResults(value);
});

const fetchResults = async (searchValue) => {
  resultsDOM.innerHTML = '<div class="loading">Loading...</div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    const searchInfo = data.query.searchinfo.totalhits;
    if (results.length < 1) {
      resultsDOM.innerHTML = '<div class="error">No results found</div>';
      resultsInfo.innerHTML = `<div>Showing ${results.length} of ${searchInfo} results</div>`;
      return;
    }
    resultsInfo.innerHTML = `<div>Showing ${results.length} of ${searchInfo} results</div>`;
    renderResults(results);
  } catch (error) {
    resultsDOM.innerHTML = '<div class="error">Error</div>';
  }
};

const renderResults = (list) => {
  const resultsList = list
    .map((listItem) => {
      const { title, snippet, pageid } = listItem;
      return `<div class="article">
        <a href=http://en.wikipedia.org/?curid=${pageid} target="_blank">
        <div class="article-title">${title}</div>
        </a>
        <p class="article-snippet">${snippet}...</p>
      </div>`;
    })
    .join("");
  resultsDOM.innerHTML = `<div class="articles">${resultsList}</div>`;
};

const searchForm = document.querySelector('form');
const inputSearch = document.querySelector('#search');
const listResult = document.querySelector('#results');

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  await recepieSearch();
});

async function recepieSearch() {
  const searchValue = inputSearch.value.trim();
  try {
    const response = await fetch(`https://api.edamam.com/search?q=${searchValue}&app_id=997f1db2&app_key=2bcbd39c7a0c3314ba6ec155f5aae917&from=0&to=10`);
    const data = await response.json();
    recipiesDisplay(data.hits); // Assuming the API response has a 'hits' property
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function recipiesDisplay(recepies) {
  let html = '';
  recepies.forEach((recipe) => {
    html += `
      <div>
        <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
        <h3>${recipe.recipe.label}</h3>
        <ul>
          ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
      </div>`;
  });
  listResult.innerHTML = html;
}

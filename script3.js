//////////////////////////////
// GET RECIPES
//////////////////////////////

let recipes = JSON.parse(
localStorage.getItem("recipes")
) || []

//////////////////////////////
// SELECT INGREDIENTS
//////////////////////////////

let selectedIngredients = []

function selectIngredient(item){

if(!selectedIngredients.includes(item)){

selectedIngredients.push(item)

displayIngredients()

}

}

//////////////////////////////
// DISPLAY INGREDIENTS
//////////////////////////////

function displayIngredients(){

const ingredientInput =
document.getElementById(
"ingredientInput"
)

if(ingredientInput){

ingredientInput.value =
selectedIngredients.join(", ")

}

}

//////////////////////////////
// SEARCH BY INGREDIENTS
//////////////////////////////

function searchByIngredients(){

const ingredientInput =
document.getElementById(
"ingredientInput"
).value

const ingredients =
ingredientInput
.split(",")
.map(item => item.trim())
.filter(item => item !== "")

localStorage.setItem(

"ingredients",

JSON.stringify(ingredients)

)

localStorage.removeItem(
"recipeSearch"
)

localStorage.removeItem(
"showAll"
)

window.location.href =
"recipe.html"

}

//////////////////////////////
// SEARCH RECIPE
//////////////////////////////

function searchRecipe(){

const recipeName =
document.getElementById(
"recipeSearch"
).value.toLowerCase()

localStorage.setItem(
"recipeSearch",
recipeName
)

localStorage.removeItem(
"ingredients"
)

localStorage.removeItem(
"showAll"
)

window.location.href =
"recipe.html"

}

//////////////////////////////
// SHOW ALL RECIPES
//////////////////////////////
function showAllRecipes(){

const container =
document.getElementById("recipeContainer")

let recipes = JSON.parse(
localStorage.getItem("recipes")
) || []

const selectedCategory =
localStorage.getItem("selectedCategory")

// CATEGORY FILTER
if(selectedCategory){

recipes = recipes.filter(recipe =>

recipe.category.toLowerCase() ===
selectedCategory.toLowerCase()

)

}

container.innerHTML = ""

recipes.forEach(recipe => {

container.innerHTML += `

<div class="col-lg-4 col-md-6 mb-4">

<div class="recipe-card">

<img src="${recipe.image}">

<h2>${recipe.name}</h2>

<p>🔥 ${recipe.calories} Calories</p>

<button onclick="viewRecipe(${recipe.id})">
View Details
</button>

</div>

</div>

`

})

}

//////////////////////////////
// RECIPE PAGE
//////////////////////////////

const recipeContainer =
document.getElementById(
"recipeContainer"
)

if(recipeContainer){

const selectedIngredients =
JSON.parse(
localStorage.getItem(
"ingredients"
)
) || []

const recipeSearch =
localStorage.getItem(
"recipeSearch"
) || ""

const selectedCategory =
localStorage.getItem(
"selectedCategory"
) || ""

const showAll =
localStorage.getItem(
"showAll"
)

recipeContainer.innerHTML = ""

//////////////////////////////
// NO RECIPES
//////////////////////////////

if(recipes.length === 0){

recipeContainer.innerHTML =

`<h2 class="text-center text-white">
No recipes added by admin 👨‍🍳
</h2>`

}

//////////////////////////////
// DISPLAY RECIPES
//////////////////////////////

recipes.forEach(recipe => {

let showRecipe = false

//////////////////////////////
// SHOW ALL
//////////////////////////////

if(showAll){

showRecipe = true

}

//////////////////////////////
// SEARCH BY NAME
//////////////////////////////

if(
recipe.name
.toLowerCase()
.includes(
recipeSearch.toLowerCase()
)
){

showRecipe = true

}

//////////////////////////////
// CATEGORY FILTER
//////////////////////////////

if(
selectedCategory &&
recipe.category === selectedCategory
){

showRecipe = true

}

//////////////////////////////
// INGREDIENT FILTER
//////////////////////////////

if(selectedIngredients.length > 0){

const missingIngredients =
recipe.ingredients.filter(item =>

!selectedIngredients.includes(item)

)

if(missingIngredients.length <= 1){

showRecipe = true

}

}

//////////////////////////////
// DISPLAY CARD
//////////////////////////////

if(showRecipe){

const card =
document.createElement("div")

card.className =
"col-lg-4 col-md-6 mb-4"

const missingIngredients =
recipe.ingredients.filter(item =>

!selectedIngredients.includes(item)

)

card.innerHTML = `

<div class="recipe-card">

<img src="${recipe.image}">

<div class="recipe-content">

<h3>
${recipe.name}
</h3>

<p>
🔥 ${recipe.calories} Calories
</p>

<p class="missing">

Missing:
${missingIngredients.join(", ") || "None"}

</p>

<button class="details-btn">

View Details

</button>

</div>

</div>

`

recipeContainer.appendChild(card)

const button =
card.querySelector(
".details-btn"
)

button.addEventListener("click", () => {

localStorage.setItem(

"selectedRecipe",

JSON.stringify(recipe)

)

window.location.href =
"recipe-details.html"

})

}

})

}

//////////////////////////////
// RECIPE DETAILS PAGE
//////////////////////////////

const recipeName =
document.getElementById(
"recipeName"
)

if(recipeName){

const recipe = JSON.parse(
localStorage.getItem(
"selectedRecipe"
)
)

if(recipe){

const recipeImage =
document.getElementById(
"recipeImage"
)

const recipeCalories =
document.getElementById(
"recipeCalories"
)

const ingredientsList =
document.getElementById(
"ingredientsList"
)

const stepsList =
document.getElementById(
"stepsList"
)

const favoriteBtn =
document.getElementById(
"favoriteBtn"
)

//////////////////////////////
// DISPLAY RECIPE
//////////////////////////////

recipeImage.src =
recipe.image

recipeName.innerText =
recipe.name

recipeCalories.innerText =
"🔥 " +
recipe.calories +
" Calories"

//////////////////////////////
// INGREDIENTS
//////////////////////////////

ingredientsList.innerHTML = ""

recipe.ingredients.forEach(item => {

const li =
document.createElement("li")

li.innerText = item

ingredientsList.appendChild(li)

})

//////////////////////////////
// COOKING STEPS
//////////////////////////////

stepsList.innerHTML = ""

if(recipe.steps){

recipe.steps
.split("\n")
.forEach(step => {

if(step.trim() !== ""){

const li =
document.createElement("li")

li.innerText = step

stepsList.appendChild(li)

}

})

}

//////////////////////////////
// FAVORITES
//////////////////////////////

favoriteBtn.addEventListener("click", () => {

let favorites = JSON.parse(
localStorage.getItem(
"favorites"
)
) || []

const alreadyExists =
favorites.some(item =>

item.name === recipe.name

)

if(!alreadyExists){

favorites.push(recipe)

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

)

const toast =
document.getElementById(
"toastMessage"
)

toast.classList.add("show")

setTimeout(() => {

toast.classList.remove(
"show"

)},2000)

favoriteBtn.innerText =
"❤️ Added"

}

})

}

}

//////////////////////////////
// FAVORITES PAGE
//////////////////////////////

const favoriteContainer =
document.getElementById(
"favoriteContainer"
)

if(favoriteContainer){

let favorites = JSON.parse(
localStorage.getItem(
"favorites"
)
) || []

const emptyMessage =
document.getElementById(
"emptyMessage"
)

if(favorites.length === 0){

emptyMessage.style.display =
"block"

}

else{

emptyMessage.style.display =
"none"

}

favorites.forEach((recipe,index) => {

const card =
document.createElement("div")

card.className =
"col-lg-4 col-md-6 mb-4"

card.innerHTML = `

<div class="favorite-card">

<img src="${recipe.image}">

<div class="favorite-content">

<h3>
${recipe.name}
</h3>

<p>
🔥 ${recipe.calories} Calories
</p>

<button class="remove-btn">

❤️ Remove

</button>

</div>

</div>

`

favoriteContainer.appendChild(card)

const removeBtn =
card.querySelector(
".remove-btn"
)

removeBtn.addEventListener("click", () => {

favorites.splice(index,1)

localStorage.setItem(

"favorites",

JSON.stringify(favorites)

)

location.reload()

})

})

}
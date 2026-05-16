// ADD RECIPE
function addRecipe(event){
    event.preventDefault()
    const recipe = {
    id: Date.now(),
    name:   document.getElementById("recipeName").value,
    ingredients:    document.getElementById("ingredients").value.split(",").map(item => item.trim()),
    category:   document.getElementById("category").value,
    calories:   document.getElementById("calories").value,
    steps:  document.getElementById("steps").value.trim(),
    image:  document.getElementById("image").value
    }

    let recipes = JSON.parse(localStorage.getItem("recipes")) || []
    recipes.push(recipe)
    localStorage.setItem("recipes",JSON.stringify(recipes))
    alert("Recipe Added Successfully 👨‍🍳")
    window.location.href =
    "manage-recipes.html"
    }

// DISPLAY RECIPES
function displayRecipes(){
    const recipes = JSON.parse(localStorage.getItem('recipes')) || []
    const container =
    document.getElementById('recipeContainer')
    if(!container){
        return
        }
    container.innerHTML = ''
    if(recipes.length === 0){
        container.innerHTML = `
        <div class="col-12 text-center">
        <h2 class="text-danger">No Recipes Added Yet 😢</h2></div>`
        return
        }

    recipes.forEach(recipe => {
    const card = `
    <div class="col-lg-4 col-md-6">
    <div class="card shadow h-100">
    <img src="${recipe.image}"
    class="card-img-top"
    height="250"
    style="object-fit:cover">
    <div class="card-body text-center">
    <h3>${recipe.name}</h3>
    <p class="text-danger fs-5">🔥 ${recipe.calories} Calories</p>
    <p>📂 ${recipe.category}</p>
    <button class="btn btn-dark" onclick="viewRecipe(${recipe.id})">View</button>
    <button class="btn btn-danger mt-2" onclick="deleteRecipe(${recipe.id})">Delete</button>
    </div>
    </div>
    </div>
`
    container.innerHTML += card
    })

}
// DELETE RECIPE
function deleteRecipe(id){
    let recipes = JSON.parse(
    localStorage.getItem('recipes')) || []
    recipes = recipes.filter(recipe =>
    recipe.id !== id
    )
    localStorage.setItem('recipes',JSON.stringify(recipes))
    alert('Recipe Deleted ❌')
    displayRecipes()
    loadDashboard()
    }

// VIEW RECIPE


function viewRecipe(id){
    const recipes = JSON.parse(localStorage.getItem('recipes')) || []
    const recipe = recipes.find(r =>r.id === id)
    localStorage.setItem('selectedRecipe',JSON.stringify(recipe))
    window.location.href ='recipe.html'

}
// DASHBOARD
function loadDashboard(){

const recipes = JSON.parse(
localStorage.getItem('recipes')
) || []

const recipeCount =
document.getElementById('recipeCount')

const calorieCount =
document.getElementById('calorieCount')

const userCount =
document.getElementById('userCount')

if(recipeCount){

recipeCount.innerText =
recipes.length

}

let totalCalories = 0

recipes.forEach(recipe => {

totalCalories += Number(
recipe.calories
)

})

if(calorieCount){

calorieCount.innerText =
totalCalories

}

const users = JSON.parse(
localStorage.getItem("users")
) || []

if(userCount){

userCount.innerText =
users.length

}

}

// CALORIE CALCULATOR

function calculateCalories(){

const calories =
document.getElementById('foodCalories').value

const quantity =
document.getElementById('foodQuantity').value

const total =
calories * quantity

document.getElementById(
'totalCalories'
).innerText =

`Total Calories: ${total}`

}

// LOAD CONTACT MESSAGES
function loadMessages(){

const messages = JSON.parse(
localStorage.getItem("messages")
) || []

const container =
document.getElementById("messageContainer")

if(!container){

return

}

if(messages.length === 0){

container.innerHTML = `

<h4 class="text-danger">
No Messages Yet ❌
</h4>

`

return

}

container.innerHTML = ""

messages.forEach(msg => {

container.innerHTML += `

<div class="card p-3 mb-3">

<h5>👤 ${msg.name}</h5>

<p>📧 ${msg.email}</p>

<p>💬 ${msg.message}</p>

</div>

`

})

}
// PAGE LOAD
window.onload = () => {

displayRecipes()

loadDashboard()

loadMessages()

}
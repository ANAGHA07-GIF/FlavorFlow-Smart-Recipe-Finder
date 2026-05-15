//////////////////////////////
// CATEGORY SELECT
//////////////////////////////

function selectCategory(category){

localStorage.removeItem(
'recipeSearch'
)

localStorage.removeItem(
'ingredients'
)

localStorage.removeItem(
'showAll'
)

localStorage.setItem(
'selectedCategory',
category
)

window.location.href =
'recipe.html'

}

//////////////////////////////
// CONTACT FORM
//////////////////////////////

function sendMessage(event){

event.preventDefault()

alert('Message Sent Successfully 💌')

window.location.reload()

}
function sendMessage(event){

event.preventDefault()

const name =
document.getElementById("name").value

const email =
document.getElementById("email").value

const message =
document.getElementById("message").value

const contact = {

name,
email,
message

}

let contacts = JSON.parse(
localStorage.getItem("contacts")
) || []

contacts.push(contact)

localStorage.setItem(
"contacts",
JSON.stringify(contacts)
)

alert("Message Sent Successfully 💌")

window.location.reload()

}
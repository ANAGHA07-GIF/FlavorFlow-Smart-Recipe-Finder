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
//////////////////////////////
// CONTACT FORM
//////////////////////////////

//////////////////////////////
// CONTACT FORM
//////////////////////////////

function sendMessage(event){

event.preventDefault()

const name =
document.querySelectorAll(".form-control")[0].value

const email =
document.querySelectorAll(".form-control")[1].value

const message =
document.querySelector("textarea").value

const messageData = {

name:name,
email:email,
message:message

}

// OLD MESSAGES
let messages = JSON.parse(
localStorage.getItem("messages")
) || []

// ADD NEW MESSAGE
messages.push(messageData)

// SAVE
localStorage.setItem(
"messages",
JSON.stringify(messages)
)

alert("Message Sent Successfully 💌")

}
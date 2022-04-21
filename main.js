let firstTime = localStorage.getItem("first_time")


if(!firstTime) {
    localStorage.setItem("first_time", "1")
    if(window.matchMedia('(min-device-width: 800px)').matches){
        
        setTimeout(function(){
            document.getElementById('wrapper').style.animation = "shift_left 1.4s ease forwards";
        }, 4000)
    
        setTimeout(function(){
            document.getElementById('getready').style.animation = "fadeout1 0.5s ease forwards"
        }, 6000)
        
        setTimeout(function(){
            document.getElementById('getready').remove()
            document.getElementById('fadetext').remove()
            document.getElementById('credInputs').style.display = 'block'
            document.getElementById('credInputs').style.animation = 'showfields 0.5s ease forwards'
        }, 6500)
    } else {
        setTimeout(function(){
            document.getElementById('getready').style.animation = "fadeout1 0.5s ease forwards"
        }, 2500)
        
        setTimeout(function(){
            document.getElementById('getready').remove()
            document.getElementById('fadetext').remove()
            document.getElementById('credInputs').style.display = 'block'
            document.getElementById('credInputs').style.animation = 'showfields 0.5s ease forwards'
        }, 3000)
    }
} else {
    document.getElementById('fadetext').remove()
    document.getElementById('getready').remove()
    document.getElementById('credInputs').style.opacity = "100%"
    document.getElementById('credInputs').style.display = "block"
    document.getElementById('wrapper').style.animationDelay = "-3s"
    document.querySelector('.behindinfo').remove()
}

// if (window.matchMedia('(min-device-width: 800px)').matches) {
//     setTimeout(function(){
//         document.getElementById('wrapper').style.animation = "shift_left 1.4s ease forwards";
//     }, 4000)
// }

// if(window.matchMedia('(min-device-width: 800px)').matches){
//     setTimeout(function(){
//         document.getElementById('wrapper').style.animation = "shift_left 1.4s ease forwards";
//     }, 4000)

//     setTimeout(function(){
//         document.getElementById('getready').style.animation = "fadeout1 0.5s ease forwards"
//     }, 6000)
    
//     setTimeout(function(){
//         document.getElementById('getready').remove()
//         document.getElementById('fadetext').remove()
//         document.getElementById('credInputs').style.display = 'block'
//         document.getElementById('credInputs').style.animation = 'showfields 0.5s ease forwards'
//     }, 6500)
// } else {
//     setTimeout(function(){
//         document.getElementById('getready').style.animation = "fadeout1 0.5s ease forwards"
//     }, 2500)
    
//     setTimeout(function(){
//         document.getElementById('getready').remove()
//         document.getElementById('fadetext').remove()
//         document.getElementById('credInputs').style.display = 'block'
//         document.getElementById('credInputs').style.animation = 'showfields 0.5s ease forwards'
//     }, 3000)
// }



let x = 0
function showpassword(){
    if(x == 0){
        x = 1
        document.getElementById('showpass').className = "fa-solid fa-eye icon1"
        document.getElementById('passwordInput').type = "text"
        document.getElementById('confirmPassword').type = "text"
    } else {
        x = 0
        document.getElementById('showpass').className = "fa-solid fa-eye-slash icon1"
        document.getElementById('passwordInput').type = "password"
        document.getElementById('confirmPassword').type = "password"
    }   
}

const nameInput = document.getElementById('nameInput')
const usernameInput = document.getElementById('usernameInput')
const passwordInput = document.getElementById('passwordInput')
const confirmPass = document.getElementById('confirmPassword')
const feedbackSU = document.getElementById('feedback')

class User {
    constructor(id, name, username, password){
        this.id = id
        this.name = name
        this.username = username
        this.password = password
    }
}

let userlist = []

function pushAccounts(){
    let keys = Object.keys(localStorage),
    i = keys.length

    while (i--){
        if(i !== 0){
            userlist.push(JSON.parse(localStorage.getItem(keys[i])))
        }
    }
    return userlist
}

pushAccounts()

for(var i=0; i<userlist.length; i++){console.log("%c"+JSON.stringify(userlist[i]), "color: lime")}
console.log("%c"+`there are ${userlist.length} accounts\n`, "color: white")

function clearInputs(){
    nameInput.value = ""
    usernameInput.value = ""
    passwordInput.value = ""
    confirmPass.value = ""
}

function userExists(user) {
    return userlist.some(function(el) {
        return el.username === user;
    })
}


function signup(){
    if(nameInput.value == "/clearusers"){
        return localStorage.clear(), console.log("users cleared"), clearInputs(), userlist.length = 0;
    }

    // Name parameters
    if(nameInput.value.length < 2 && nameInput.value.length !== 0){
        resetBorderColors()
        return throwErr("Name is too short", nameInput)
    } else if (nameInput.value.length == 0){
        resetBorderColors()
        return throwErr("Please enter your name", nameInput)
    } else if(nameInput.value.length > 20){
        resetBorderColors()
        return throwErr("Name is too long", nameInput)
    } else if(!isValid(nameInput.value)){
        resetBorderColors()
        return throwErr("Name cannot contain special characters", nameInput)
    } else if(containsNumber(nameInput.value)){
        resetBorderColors()
        return throwErr("Name cannot contain a number", nameInput)
    
    // Username parameters
    } else if(usernameInput.value.length < 3 && usernameInput.value.length !== 0){
        resetBorderColors()
        return throwErr("Username is too short", usernameInput)
    } else if (usernameInput.value.length == 0){
        resetBorderColors()
        return throwErr("Please enter a username", usernameInput)
    } else if(usernameInput.value.length > 15){
        resetBorderColors()
        return throwErr("Username is too long", usernameInput)
    } else if(!isValid(usernameInput.value)){
        resetBorderColors()
        return throwErr("Username cannot contain special characters", usernameInput)
    } else if(hasWhiteSpace(usernameInput.value)){
        resetBorderColors()
        return throwErr("Username cannot contain a space", usernameInput)
    } else if(userExists(usernameInput.value)){
        resetBorderColors()
        return throwErr("Username is already taken", usernameInput)
    } else if(!isNaN(usernameInput.value.charAt(0))){
        resetBorderColors()
        return throwErr("Username cannot start with a number", usernameInput)
    
    // Password parameters
    } else if(passwordInput.value.length < 4 && passwordInput.value.length !== 0){
        resetBorderColors()
        return throwErr("Password is too short", passwordInput)
    } else if(passwordInput.value.length == 0){
        resetBorderColors()
        return throwErr("Please enter a password", passwordInput)
    } else if(passwordInput.value.length > 20){
        resetBorderColors()
        return throwErr("Password is too long", passwordInput)
    } else if(hasWhiteSpace(passwordInput.value)){
        resetBorderColors()
        return throwErr("Password cannot contain spaces", passwordInput)
    } else if(passwordInput.value !== confirmPass.value){
        resetBorderColors()
        mark(passwordInput)
        mark(confirmPass)
        return throwErr("These passwords do not match", null)
    }
    resetBorderColors()
    feedbackSU.textContent = ''
    let signedup = new User(userlist.length+1, capitalizeName(nameInput.value), usernameInput.value.toLowerCase(), passwordInput.value)
    userlist.push(signedup)
    localStorage.setItem(`user${signedup.id}`, JSON.stringify(signedup))
    console.log(`%c\nuser added: ${JSON.stringify(signedup)}`, "color: cyan")
    console.log(`userlist length is now ${userlist.length}`)
    clearInputs()
    feedbackSU.style.color = "green"
    feedbackSU.textContent = "Signup Successful!"
}

document.addEventListener("keyup", e => {
    if(e.key == "Enter" && document.activeElement === confirmPass){
        signup()
    }
})

const capitalizeName = (inpt) => {
    return inpt.charAt(0).toUpperCase() + inpt.slice(1)
}

const throwErr = (errorMessage, boxMark) => {
    feedbackSU.textContent = errorMessage
    feedbackSU.style.color = "red"
    feedbackSU.style.animation = "jigglejiggle 0.3s linear forwards"
    if(boxMark !== null){
        mark(boxMark)
    }
    setTimeout(function(){
        feedbackSU.style.animation = "none"
    }, 400)
    
}

const resetBorderColors = () => {
    nameInput.style.borderColor = "inherit"
    usernameInput.style.borderColor = "inherit"
    passwordInput.style.borderColor = "inherit"
    confirmPassword.style.borderColor = "inherit"
    nameInput.style.borderWidth = "1px"
    usernameInput.style.borderWidth = "1px"
    passwordInput.style.borderWidth = "1px"
    confirmPassword.style.borderWidth = "1px"
}

const mark = (box) => {
    box.style.borderColor = "red"
    box.style.borderWidth = "2px"
}

function isValid(str){
    return !/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

function hasWhiteSpace(s) {
    return /\s/.test(s)
}

function containsNumber(string){
    return /\d/.test(string)
}

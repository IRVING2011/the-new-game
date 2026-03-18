let playerScore = 0
let aiScore = 0

async function login(){

const password = document.getElementById("password").value

const res = await fetch("/api/play",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
type:"login",
password
})
})

const data = await res.json()

if(data.success){

document.getElementById("login").style.display="none"
document.getElementById("game").style.display="block"

}else{

document.getElementById("msg").innerText="密碼錯誤或IP未允許"

}

}

async function play(choice){

const res = await fetch("/api/play",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
type:"play",
choice
})
})

const data = await res.json()

document.getElementById("result").innerText=data.result

if(data.winner==="player"){
playerScore++
}

if(data.winner==="ai"){
aiScore++
}

document.getElementById("player").innerText=playerScore
document.getElementById("ai").innerText=aiScore

}
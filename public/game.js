let playerScore=0
let aiScore=0

function play(player){

const choices=["rock","paper","scissors"]
const ai=choices[Math.floor(Math.random()*3)]

let result=""

if(player===ai){
result="DRAW"
}

else if(
player==="rock"&&ai==="scissors"||
player==="paper"&&ai==="rock"||
player==="scissors"&&ai==="paper"
){
result="YOU WIN"
playerScore++
}else{
result="LOSE"
aiScore++
}

document.getElementById("result").innerText=
"AI chose: "+ai+" | "+result

document.getElementById("player").innerText=playerScore
document.getElementById("ai").innerText=aiScore

}

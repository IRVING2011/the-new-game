let playerScore=0
let aiScore=0

const icons={
rock:"✊",
paper:"✋",
scissors:"✌"
}

function play(player){

const choices=["rock","paper","scissors"]

const ai=choices[Math.floor(Math.random()*3)]

document.getElementById("playerHand").innerText=icons[player]
document.getElementById("aiHand").innerText=icons[ai]

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

document.getElementById("result").innerText=result

document.getElementById("playerScore").innerText=playerScore
document.getElementById("aiScore").innerText=aiScore

}

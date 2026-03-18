let playerScore=0
let aiScore=0

function play(player){

const choices=["rock","paper","scissors"]

const ai=choices[Math.floor(Math.random()*3)]

const map={
rock:"✊",
paper:"✋",
scissors:"✌️"
}

const playerHand=document.getElementById("playerHand")
const aiHand=document.getElementById("aiHand")

playerHand.innerText=map[player]
aiHand.innerText=map[ai]

playerHand.classList.add("animate")
aiHand.classList.add("animate")

setTimeout(()=>{
playerHand.classList.remove("animate")
aiHand.classList.remove("animate")
},300)

let result=""

if(player===ai){
result="DRAW"
}

else if(
(player==="rock" && ai==="scissors")||
(player==="paper" && ai==="rock")||
(player==="scissors" && ai==="paper")
){
result="YOU WIN"
playerScore++
}

else{
result="LOSE"
aiScore++
}

document.getElementById("result").innerText=result

document.getElementById("playerScore").innerText=playerScore
document.getElementById("aiScore").innerText=aiScore

}

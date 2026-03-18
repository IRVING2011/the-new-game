function play(player){

const choices=["rock","paper","scissors"]

const ai=choices[Math.floor(Math.random()*3)]

let result=""

if(player===ai){

result="DRAW"

}

else if(
(player==="rock" && ai==="scissors") ||
(player==="paper" && ai==="rock") ||
(player==="scissors" && ai==="paper")
){

result="YOU WIN"

}

else{

result="LOSE"

}

document.getElementById("result").innerText=result

}

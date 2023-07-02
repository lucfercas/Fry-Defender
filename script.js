import Player from "./Player.js"
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const player = new Player(canvas. width / 2.2, canvas.height / 1.3)

canvas.width = 550
canvas.height = 600

function gameLoop(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

setInterval(gameLoop, 1000 / 60)
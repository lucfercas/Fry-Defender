window.addEventListener('load', function(){
    const canvas = document.getElementById("game")
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500

    class InputHandler {

    }

    class Projectile {


    }

    class Particle {


    }

    class Player {
        constructor(game){
            this.game = game
            this.width = //ancho of frame del sprite
            this.height = //alto "..."
            this.x = 20
            this.y = 100
            this.speedY = 0
        }
        update(){
            this.y += this.speedY
        }
        draw(context){
            context.fillRect(this.x, this.y, this.width, this.height) 
        }

    }

    class Enemy {


    }

    class Layer {
        // Not needed I think 
    }

    class Background {
        // Not needed I think
    }

    class UI {
        // Clock, timer and other info
    }

    class Game {
        // Here all logic comes together
        constructor(width, height){
            this.width = width
            this.height = height
            this.player = new Player()
        }
        update(){
            this.player.update()
        }
        draw(context){
            this.player.draw(context)
        }
    }
    const game = new Game(canvas.width, canvas.height)
    //animation loop
    function animate(){
        game.update()
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
})
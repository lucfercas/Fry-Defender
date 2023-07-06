window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext('2d')
    canvas.width = 500
    canvas.height = 500

    class InputHandler {
        constructor(game){
            this.game = game
            window.addEventListener('keydown', e => {
                if(( (e.key === 'ArrowUp') || (e.key === 'ArrowDown')) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key)
                } else if (e.key === ' '){
                    this.game.player.shootTop()
                }
            })
            window.addEventListener('keyup', e => {
                if(this.game.keys.indexOf(e.key) > -1){
                    this.game.keys.splice(this.game.keys.indexOf(e.key), 1)
                }
            })
        }
    }

    class Projectile {
        constructor(game, x, y){
            this.game = game
            this.x = x
            this.y = y
            this.width = 10
            this.height = 3
            this.speed = 3
            this.markedForDeletion = false
        }
        update(){
            this.x += this.speed
            if(this.x > this.game.width * 0.8) this.markedForDeletion = true
        }
        draw(context){
            context.fillStyle = 'yellow'
            context.fillRect(this.x, this.y, this.width, this.height)
        }

    }

    class Particle {


    }

    class Player {
        constructor(game){
            this.game = game
            this.width = 50//ancho of frame del sprite
            this.height = 50 //alto "..."
            this.x = 20
            this.y = 100
            this.speedY = 2
            this.projectiles = []
        }
        update(){
            if(this.game.keys.includes('ArrowUp')) this.speedY = -1
            else if (this.game.keys.includes('ArrowDown')) this.speedY = 1
            else this.speedY = 0
            this.y += this.speedY
            //handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update()
            })
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion)
        }
        draw(context){
            context.fillStyle = 'black'
            context.fillRect(this.x, this.y, this.width, this.height)
            this.projectiles.forEach(projectile => {
                projectile.draw(context)
            }) 
        }
        shootTop(){
            this.projectiles.push(new Projectile(this.game, this.x, this.y))
        }

    }

    class Enemy {
        constructor(game){
            this.game = game
            this.width = 80
            this.height = 80
            this.x = this.game.width
            this.y = Math.random() * (this.game.height * 0.9 - this.height)
            this.speedX = Math.random() * -1.5 -0.5
            this.markedForDeletion = false
            this.lives = 1
            this.score = this.lives


        }
        update(){
            this.x += this.speedX
            if(this.x + this.width < 0){
                this.markedForDeletion = true
            }
        }
        draw(context){
            context.fillStyle = 'red'
            context.fillRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Helvetica'
            context.fillText(this.lives, this.x, this.y)

        }

    }

    class Layer {
        // Not needed I think 
    }

    class Background {
        // Not needed I think
    }

    class UI {
        // Clock, timer and other info
        // constructor(game){
        //     this.game = game
        //     this.fontSize = 25
        //     this.fontFamily = 'Helvetica'
        //     this.color = 'black'
        // }
        // draw(context){
        //     //score
        //     context.fillStyle = this.color
        //     context.font = this.fontSize + 'px ' + this.fontFamily
        //     context.fillText('Score: ' + this.game.score, 20, 40)
        // }
    }

    class Game {
        // Here all logic comes together
        constructor(width, height){
            this.width = width
            this.height = height
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.keys = []
            this.enemies = []
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.gameOver = false
            this.score = 0
            this.winningScore = 10
        }
        update(deltaTime){
            this.player.update()
            this.enemies.forEach(enemy =>{
                enemy.update()
                if(this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true
                }
                this.player.projectiles.forEach(projectile => {
                    if(this.checkCollision(projectile, enemy)){
                        enemy.lives--
                        projectile.markedForDeletion = true
                        if(enemy.lives <= 0){
                            enemy.markedForDeletion = true
                            this.score += enemy.score
                            if (this.score > this.winningScore) this.gameOver = true
                        }
                    }
                })
            })
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion)
            if (this.enemyTimer > this.enemyInterval && !this.gameOver){
               this.addEnemy()
               this.enemyTimer = 0 
            } else {
                this.enemyTimer += deltaTime
            }

        }
        draw(context){
            this.player.draw(context)
            this.enemies.forEach(enemy => {
                enemy.draw(context)
            })
        }
        addEnemy(){
            this.enemies.push(new Enemy(this))
        }
        checkCollision(rect1, rect2){
            return (
                rect1.x < rect2.x + rect2.width && 
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y
            )
        }
    }
    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0
    //animation loop
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})
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
                } else if (e.key === 'd'){
                    this.game.debug = !this.game.debug
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
            if(this.x > this.game.width * 0.8){
                this.markedForDeletion = true
            }
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
            this.width = 70//ancho of frame del sprite
            this.height = 70 //alto "..."
            this.x = 20
            this.y = 100
            this.frameX = 0
            this.frameY = 0
            this.maxFrame = 6
            this.speedY = 2
            this.projectiles = []
            this.image = document.getElementById('player')
            this.frameDelay = 12; // Adjust this value to control the animation speed
            this.frameDelayCounter = 0

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
            //sprite animation
            if(this.frameX < this.maxFrame){
                if (this.frameDelayCounter >= this.frameDelay) {
                    this.frameX++;
                    this.frameDelayCounter = 0;
                  } else {
                    this.frameDelayCounter++;
                  }
            } else {
                this.frameX = 0
            }
        }
        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
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
            this.width = 85
            this.height = 85
            this.x = this.game.width
            this.y = Math.random() * (this.game.height * 0.9 - this.height)
            this.speedX = Math.random() * -1.5 -0.5
            this.markedForDeletion = false
            this.lives = 1
            this.score = this.lives
            this.image = document.getElementById('enemy')
            this.frameX = 0
            this.frameY = 0
            this.maxFrame = 4
            this.frameDelay = 12; // Adjust this value to control the animation speed
            this.frameDelayCounter = 0


        }
        update(){
            this.x += this.speedX
            if(this.x + this.width < 0){
                this.markedForDeletion = true
            }
            if(this.frameX < this.maxFrame){
                if (this.frameDelayCounter >= this.frameDelay) {
                    this.frameX++;
                    this.frameDelayCounter = 0;
                  } else {
                    this.frameDelayCounter++;
                  }
            } else {
                this.frameX = 0
            }
        }
        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
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
        constructor(game){
            this.game = game
            this.fontSize = 25
            this.fontFamily = 'Helvetica'
            this.color = 'black'
        }
        draw(context){
            context.save()
            //score
            context.fillStyle = this.color
            context.font = this.fontSize + 'px ' + this.fontFamily
            context.fillText('Score: ' + this.game.score, 20, 40)

            //timer


            //game over msgs
            if (this.game.gameOver){
                context.textAlign = 'center'
                let message1
                let message2
                if(this.game.score > this.game.winningScore){
                    message1 = 'You win!'
                    message2 = 'Well done!'
                } else {
                    message1 = 'You lose!'
                    message2 = 'Try again next time!'
                }
                context.font = '50px ' + this.fontFamily
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40)
                context.font = '25px ' + this.fontFamily
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40)
            }
            context.restore()
        }

    }

    class Game {
        // Here all logic comes together
        constructor(width, height){
            this.width = width
            this.height = height
            this.player = new Player(this)
            this.input = new InputHandler(this)
            this.ui = new UI(this)
            this.keys = []
            this.enemies = []
            this.enemyTimer = 0
            this.enemyInterval = 1000
            this.gameOver = false
            this.score = 0
            this.winningScore = 10
            this.gameTime = 0
            this.speed = 1
            this.debug = true
        }
        update(deltaTime){
            if (!this.gameOver) this.gameTime += deltaTime
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
                            if (!this.gameOver) this.score += enemy.score
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
            this.ui.draw(context)
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
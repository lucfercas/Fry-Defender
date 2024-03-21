# Fry Defender

**Play here:** https://lucfercas.github.io/NEW-Game/

This rpg inspired shooter takes the player to a (hopefully, for comedy purposes) familiar scene where a portion of chips is meant to be enjoyed at the beach. Unfortunately, there are enemies afoot. In this game, the user impersonates a portion of chips that fight the numerous seagulls that are determined to have a big lunch. 

If the gulls manage to eat the chips, the game ends.

# Mechanics

How to play:
- ▲ move up
- ▼ move down
- **space** shoot

# Planning

Ever since I began to try and figure out game logics with my previous application to FAC, I knew I wanted to dive into a little more complexity. The decision to create a browser shooter game was easy, understanding its implication was something else. I wanted to add elements of randomness and player movement, and implement a score system. I ended up breaking up the project in multiple sections based on the different elements that would later come together. 

# Building

After creating all elements (graphics included), I began the process of understanding drawing on a canvas, and moving elements within it. I began creating multiple classes that would then interlink with each other. These clases would then be divided based on their constructors, and their respective methods. The common methods used for all of the classes would be the update() and draw(). Then I would create a function to animate the game and its elements.


# Debugging

The more complex the game turned, the more difficult it became to debug. 

- I had to create a delay for the animations, as they were running too fast.
- I had to alter the sprite sheets mid game in order to fix white space flickering during the animations.
- Had to fix and play with the physics of the game multiple times to make sure it was accurate.
- Kept reminding myself to keep including most parameters into the Game class, otherwise they would not appear in the game at all.
- Console.log debug became more complex as sometimes the needed logs were not passed properly.

# Takeaways

This project has taken most of my application preparation time. It has been an amazing first interaction with complex object oriented programming, which I never experienced before. Overall, it has been the perfect example to learn and understand how lots of elements interact with each other.

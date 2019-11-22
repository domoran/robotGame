# robotgame

Robot Game is a game that I am doing for my kids to learn about programming. I find, that most programming languages are already very complex. This complexity puts especially smaller kids off, when starting with programming. To learn the basic concepts of programming at an early age, while not being able to understand a complete programming language, kids can: 
- learn to enter basic commands to observe the compute execute them 
- learn basic concepts like "algorithms" by trying to group commands into high level commands and to group high level commands to programs. 

To engage kids this has to come in a package that is admirable by them. I think many kids would want a robot. So this project helps to understand programming by providing a minimal robot for the kids to program. First with a very limited command set. Then slowly add commands for the robot to make it more capable. 

So the idea here is, that kids start out with a very basic robot, that has only three commands: Forward, Turn Left, Turn right. Obviously this can be used to make programs to have to robot escape of a maze, but the program will only work for that one problem because the robot cannot make any decisions. 

So we give the robot a sensor, and another command: [ Wall?  Commands... ] The ability to execute a commmand only if a sensor signals, we are in front of a wall. Now suddenly we can do more complex programs. By introducing loops, we can make real algorithms, that will allow us to follow a wall. 

This vue project is an interactive test environment for that robot. When it will be finished it will allow you to 

- create a game field, place one or more robots in there. 
- Store and Load the game fields on your browser
- Write programs and execute them on one of the robots. 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

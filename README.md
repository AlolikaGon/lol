# lol

A small JavaScript library that allows web developers to add speech recognition on their projects easily.

Steps to get it working - 

1. Include the library on the page.

2. Initiate the lol object by calling lol.init() method.

3. Define a command object.
   Ex - var command = {'What is square of :num': square, 'How are you': howAreYou};
   Here the property is the command that the library looks for and the value is the name of the function which will be invoked
   if the user says the command.
   So, if the user says - "How are you" then the "developer defined" function howAreYou is invoked. Please note that the function
   to be called is defined by the developer.
   You can also define functions that take arguments from the speech. Just use a variable name where you expect to extract an argument
   from. Make sure you use a colon,":", before the name. The property "What is the square of :num" allow the user to say "What is the
   square of 25", the library detects the command and then sends "25" as an argument to the square function. It just works.
   
4. Add commands by calling lol.addCommands(your command object here).
5. Make sure you have defined the functions you are using in your commands and you are all set. Speech Recognition should work on your
   new project.

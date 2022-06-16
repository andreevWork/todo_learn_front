## Make it work

Your first task will be adding new features:
- create Task - user can type a title into input and click Add button to create a task.
- delete Task - user can click the delete icon to delete a task. Design of that deleting icon, and the place to put it, is up to you.

### Instructions
For now, it\`s obvious that using Redux/Mobx is over engineering, you don`t need a state management.
You have to use only React props and state. Also do not use Context for now.

Also, You shouldn\`t care about the types and style of your code for now, just implement the features above and that\`s it. 

### Description
You may ask. "Why can`t we use Redux or Context here?"
One very important thing in programming - is called "trade off".
We will talk about it a lot in many other lessons.

The main idea here is that on the one hand we have a simple solution based on React props/state
without any dependencies, but it\`s not scalable for large apps and on the other hand we have
solution with state management, it takes more time to implement and will create extra code, but it will be easy to scale.

This is your trade off, you are a programmer, and you should be able to choose a solution and accept all pros/cons that come with it.

For now, I\`ve chosen for you, but in the next lessons it becomes your challenge.


## Make it work

Your first task will be adding features:
- create Task - user can type title of the task into input and click Add button to create a task.
- delete Task - user can click into delete icon and delete a task. Design of that deleting icon and place to put it, it`s up to you.

### Instructions
For now, it\`s obvious that it\`s over engineering to use Redux/Mobx, you don`t need a state management.
You have to use only React props and state. Also do not use Context for now.

Also, You should\`t care about types and style of your code for now, just implement the features above and that\`s it. 

### Description
You may wonder about that. Why can`t we use Redux or Context here?
One of a very important thing in programming - it is called "trade off".
We will talk about it a lot in many other lessons.

The main idea here that on the one hand we have simple solution based on React props/state
without any dependents, but it\`s not scalable for large apps and on the other hand we have
solution with state management, it takes more time to implement and will create extra code, but it will be easy to scale.

This is your trade off, you are a programmer, and you should be able to choose a solution and accept all pros/cons it takes.

For now, I\`ve chosen for you, but in the next lessons it becomes your challenge.


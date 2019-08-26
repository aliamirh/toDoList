//task object logic

function Task(name){
  this.name = name;
  this.complete = false;
}

var task1 = new Task ('Do-dishes');
var task2 = new Task ('Feed-the-dog');
var task3 = new Task ('Do-laundry');


Task.prototype.updateCompleted = function() {
  this.complete = true;
}


//TaskList object logic
//constructor
function TaskList(){
  this.tasks = [];
}
//create instance
var taskList = new TaskList();

TaskList.prototype.addTask = function(task) {
  this.tasks.push(task);
}

TaskList.prototype.addNewTask = function(taskNew) {
  if(taskNew === ""){
    console.log("check")
    return;
  }
  taskNew = taskNew.replace(/ /g,"-")
  var newTask = new Task(taskNew);
  taskList.addTask(newTask);
}

taskList.addTask(task1);
taskList.addTask(task2);
taskList.addTask(task3);

function showTasks() {
  for (var i=0; i < taskList.tasks.length; i++) {
    if(taskList.tasks[i].complete === false) {
      $('div#tasksCheckBoxes').append('<input type="checkBox" name="taskChecks" value=' + taskList.tasks[i].name + '>' + taskList.tasks[i].name + '</input>');
      $('div#tasksCheckBoxes').append('<br>');
    }
  }
}




//front end logic
$(document).ready(function(){
  showTasks();
  $('form#inputForm').submit(function(event){
    event.preventDefault();
    //get checked
    $('input:checkbox[name=taskChecks]:checked').each(function(){
      //change property to completed for each matching name
      var checkBoxName = "";
      checkBoxName = $(this).val();
      console.log(checkBoxName);
      for(var i =0; i < taskList.tasks.length; i++) {
        if(taskList.tasks[i].name === checkBoxName) {
          console.log("match");
          taskList.tasks[i].complete = true;
        }
      }
    });

    var newTask = $('input#newTaskInput').val();
    taskList.addNewTask(newTask);

    $("div#tasksCheckBoxes").html("");
    showTasks();
    console.log(taskList);

  });
});

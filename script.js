
//function to close the modal(error and deadline)
function modalclose(userid){
    var closebutton = document.getElementById(userid);
    closebutton.classList.add('is-closing');
    setTimeout(()=>{
      closebutton.classList.remove('is-active','is-closing');
    }, 300);
    clearusersinput();
}
//function to clear the users input
function clearusersinput(){
  document.getElementById('Taskinsertion').value='';
  document.getElementById('userdatedeadline').value = '';
  document.getElementById('usertimedeadline').value ='';
  document.getElementById('task').textContent = '';
}
//function to open deadline modal
function showdeadlinemodal(){
  var deadlinemodal = document.getElementById('deadlinemodal');
  deadlinemodal.classList.add('is-active');
}
//function to check the users input
document.addEventListener('DOMContentLoaded',function(){
  function checkinput(){
    var userinput = document.getElementById('Taskinsertion').value;
    var inputuser = userinput.trim();
      if(inputuser ===''){
        swal("Error","Task first before the deadline","error");
      }else{
        showdeadlinemodal();
      } 
  }
  //this is to set the process when set deadline button was clicked
  var deadlinebutton = document.getElementById('deadlinebutton');
  deadlinebutton.addEventListener('click',function(){
    checkinput();
  });
});

// function to set users task to the header of the deadlinemodal
  function taskinsertion(usertask) {
    document.getElementById('task').textContent = usertask;
    var retrievedTask = retrieveddata(usertask);
    return retrievedTask;
  }

 //fucntion to retrieve users input from the text field
function retrieveddata(taskinserted){
   return taskinserted;
}
document.addEventListener('DOMContentLoaded',function(){
const today = new Date().toISOString().split('T')[0];
document.getElementById('userdatedeadline').setAttribute('min', today);
});

//function to get the user's deadline
function showdate(){
  var daydate = document.getElementById('userdatedeadline').value;
  var daytime = document.getElementById('usertimedeadline').value;
  
  var today = new Date().toDateString();
  var day = new Date(daydate).toLocaleDateString('en-US', { weekday: 'long' });
  // Determine if the time is in AM or PM
  var ampm = (new Date('2024-01-01 ' + daytime)).toLocaleTimeString('en-US', { hour: 'numeric', minute:'numeric', hour12: true });
  return {day, daydate, ampm};
}
//function to add a task
function generatetask(){
  var tasktable = document.getElementById('tasktable');
  var tasktablebody = tasktable.getElementsByTagName('tbody')[0];

  var addrow = tasktablebody.insertRow();
  var taskrow = addrow.insertCell(0);
  var duedate = addrow.insertCell(1);
  var remarks = addrow.insertCell(2);

  var usertaskValue = document.getElementById('Taskinsertion').value;

  taskrow.classList.add('is-size-6', 'has-text-weight-semibold', 'has-text-black', 'has-text-centered');
  taskrow.innerHTML = retrieveddata(usertaskValue);
  duedate.classList.add('is-size-6', 'has-text-weight-semibold', 'has-text-black', 'has-text-centered');
  duedate.innerHTML = showdate().day +"<br>"+ showdate().daydate +"<br>"+ showdate().ampm;
 
  var remarksDiv = document.createElement('div');
  remarksDiv.classList.add('has-text-centered');

  var deletebutton = document.createElement('button');
  deletebutton.classList.add('button','has-background-danger','is-small','custom-design','mx-1','mobile-view');
  deletebutton.title = 'Delete';
  deletebutton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
  deletebutton.addEventListener("click", function() {
    deletetask(tasktable,addrow);
    swal("Succes","Task Has Been Deleted","success");
  });
  remarksDiv.appendChild(deletebutton);

  var donebutton = document.createElement('button');
  donebutton.classList.add('button','has-background-success','is-small','custom-design','mx-1','mobile-view');
  donebutton.title='Done';
  donebutton.innerHTML = '<span class="material-symbols-outlined">done</span>';
  donebutton.addEventListener("click",function(){
    taskdone(taskrow.innerHTML);
    deletetask(tasktable, addrow);
    swal("Completed","Task Done!","success");
  });
  remarksDiv.appendChild(donebutton);

  remarks.appendChild(remarksDiv);
  modalclose('deadlinemodal');
 
}

function taskdone(task){
      var donetable = document.getElementById('donetable');
      var donetableBody=donetable.getElementsByTagName('tbody')[0];

      var addrow = donetableBody.insertRow();
      var donetask=addrow.insertCell(0);
      var action = addrow.insertCell(1);

      donetask.classList.add('is-size-6', 'has-text-weight-semibold', 'has-text-black', 'has-text-centered',);
      donetask.innerHTML = task;

      action.classList.add('has-text-centered');
      var deletebutton = document.createElement('button');
      deletebutton.classList.add('button','has-background-danger','is-small','custom-design','mx-1','mobile-view');
      deletebutton.title = 'Delete';
      deletebutton.innerHTML = '<span class="material-symbols-outlined">delete</span>';
      deletebutton.addEventListener("click", function() {
      deletetask(donetable,addrow);
      swal("Succes","Delete Complete","success");
  });
      action.appendChild(deletebutton);
    
  }

function checkdate(){
  var duedate = showdate().daydate;
  var currentdate = new Date().toDateString();
  var currenttime = new Date().toLocaleTimeString();
  var duetime = showdate().ampm();
  if(duedate > currentdate){
     overduetask(generatetask().taskrow.innerHTML);
  } else if(duedate == currentdate){
    if(duetime > currenttime){
      overduetask(generatetask().taskrow.innerHTML);
    }
  } 
}
//deleting a task
function deletetask(table, row){
  var tablebody = table.getElementsByTagName('tbody')[0];
  tablebody.deleteRow(row.Index);
}


//Function for input validation. If valid task will appear to the Task Table
function validateinfos(){
  var errormessage = document.getElementById('error');
  if(showdate().daydate ==''){
    swal("Error","Deadline must be set first","error");
  }else{
    generatetask();
    clearusersinput();
    swal("Task Added","Good Luck on your Task", "success");
  }
}

// function personalizer (){
//     let username = document.querySelector('[name="username"]').value;
//     console.log(username);
//     localStorage.setItem("username", username);
//     let display = document.getElementById("personalizer");
//     display.innerHTML = `<span> Hello <b>${localStorage.getItem("username")}</b></span>`
// }


  


    function storeName() {
    let username = document.querySelector('[name="username"]').value;
    const todoDatabase = []
    localStorage.setItem("username", username);
    localStorage.setItem("todoDB", todoDatabase);
    personalizer(); 
    }

    

    function personalizer(){
        const display = document.getElementById("personalizer");
        const key = "username";
        const username = localStorage.getItem(key);
        const input = document.getElementById("personal-presser")
         
        if (username){
        display.innerHTML = `<span>Hello <b>${username}</b></span>`
        // console.log(username);
         }

            // Check local storage for saved Tasks
        let todoDB = localStorage.getItem("todoDB");
        if (todoDB) {
         todoDB = JSON.parse(todoDB);
        if (todoDB.length > 0) {
         todolist = todoDB;
        todoDB.forEach((todo) => {
        displayTask(todo, true);
        });
      }
    }
  }   
 // Display tasks
 function displayTask(array, existing = false) {
  let taskDisplay = document.getElementById("task-display"); 
  const node = document.createElement("li"); 
  node.setAttribute("class", "mb-3 col");
  let element = array;
  if (!existing) {
    element = array[array.length - 1];
  }
  // const element = array[array.length - 1];
  // const indexOfElement = array.length - 1;


 //Set priority color text
 let priorityIndicator = "";
 if (element.priority === "High") {
   priorityIndicator = "danger";
 } else if (element.priority === "Medium") {
   priorityIndicator = "warning";
 } else {
   priorityIndicator = "success";
 }

   //Set list format based on last checked state
   let checkedState;
   if (element.done) {
     node.classList.add("text-decoration-line-through", "text-muted");
     checkedState = "checked";
   }   
  node.innerHTML = `
  <div class="list-item-content" id="${element.id}">
    <div class="row">
      <div class="col-1">
        <input class="p-2 border " type="checkbox" id="checker${element.id}"  name="completer">
      </div>
      <div class="col-11">
        <div class="row">
          <div class="col-10 col-sm-11">
            <div class="row">
              <div class="col-12 col-md-9" id="flexwrap">
              <span  id="task${element.id}"><b>${element.task}</b></span>
              </div>
              <div class="col-12 col-md-3">
                 <span class="fst-italic text-${priorityIndicator}">  ${element.priority} Priority
                 </span>
              </div>
              </div>
            </div>
            <div class="col-2 col-sm-1">
              <button type="button" class="btn deleter btn-danger btn-close" onclick="deleteTask(event)"></button>
            </div>
          </div>
        </div>
      </div>
   </span><hr>
   </div>
   `;
  taskDisplay.append(node);
  }

  


    // TODO Management Section
    let todolist = [];
    personalizer();
    const todoForm = document.getElementById("todo-form");
    todoForm.addEventListener("submit", event=> {
    event.preventDefault();
    const task = document.querySelector('[name="task"]').value.trim();
    const priority = document.querySelector('[name="priority"]').value;
    if (task === "") {
        validationError('[name="task"]', todoForm);
      } else {
        validationError('[name="task"]', todoForm, false);
    const taskObject = {
    task: task,
    priority: priority,
    done: false,
    id: Date.now()
     };
     todolist.push(taskObject);
     localStorage.setItem("todoDB", JSON.stringify(todolist));
 
     console.log(todolist);
     displayTask(todolist);
 
     todoForm.reset();
   }
 });
   


    // Delete a single task
function deleteTask(e) {
    const confirmation = confirm("Are you sure?");
    if (confirmation) {
      const parentEl = e.target.closest(".list-item-content");
      let parentID = parentEl.getAttribute("id");
      parentID = parseInt(parentID);
      todolist = todolist.filter((e) => e.id !== parentID);
      localStorage.setItem("todoDB", JSON.stringify(todolist));
      parentEl.closest("li").remove();
    }
  }
    // Delete a single task
    // function itemDeleter(e) {
    //     const parent = e.target.parentNode.getAttribute("id");
    //     const objId = parent.split("task")[1];
    //     const parsedId = parseInt(objId);
    //     console.log(objId, parsedId);    
    //     todolist = todolist.filter(item => item.id !== parsedId)
    //     console.log(todolist);
    //     const gparent= document.getElementById(parent).parentNode;
    //     gparent.remove();
    // }
    // Mark as done feature 
    const list = document.getElementById("task-display")
    list.addEventListener('change', function(e){
        if (e.target.tagName === "INPUT" && e.target.checked) {
            e.target.parentNode.parentNode.parentNode.parentNode.classList.add("text-decoration-line-through", "text-muted" );
        } else {
            e.target.parentNode.parentNode.parentNode.parentNode.classList.remove("text-decoration-line-through","text-muted" );
        }
    });

 //Show or(hide) input validation Error
function validationError(inputField, feedbackForm, show = true) {
  if (show) {
    document.querySelector(inputField).classList.add("border-danger");
    feedbackForm.querySelector(".invalid-feedback").classList.add("d-block");
  } else {
    document.querySelector(inputField).classList.remove("border-danger");
    feedbackForm.querySelector(".invalid-feedback").classList.remove("d-block");
  }
}
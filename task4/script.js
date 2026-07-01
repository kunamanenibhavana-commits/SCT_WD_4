const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const priority = document.getElementById("priority");

const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const progressBar = document.getElementById("progressBar");
const progressValue = document.getElementById("progressValue");

const search = document.getElementById("search");

const filters = document.querySelectorAll(".filter");

const editModal = document.getElementById("editModal");
const editTask = document.getElementById("editTask");
const editDate = document.getElementById("editDate");
const editTime = document.getElementById("editTime");
const editPriority = document.getElementById("editPriority");

const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");

const today = document.getElementById("today");

today.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});

const sampleTasks = [

{
name:"Complete HTML Landing Page",
date:"2026-07-02",
time:"10:00",
priority:"High",
completed:false
},

{
name:"Prepare JavaScript Interview",
date:"2026-07-03",
time:"02:00 PM",
priority:"Medium",
completed:true
},

{
name:"Practice CSS Grid",
date:"2026-07-04",
time:"11:00",
priority:"Low",
completed:false
},

{
name:"Build Portfolio Website",
date:"2026-07-05",
time:"06:00 PM",
priority:"High",
completed:false
},

{
name:"Update LinkedIn Profile",
date:"2026-07-06",
time:"05:30 PM",
priority:"Medium",
completed:true
}

];

let tasks = JSON.parse(localStorage.getItem("tasks"));

if(!tasks || tasks.length===0){

tasks=sampleTasks;

localStorage.setItem("tasks",JSON.stringify(tasks));

}

let currentFilter="all";

let currentEdit=null;

function saveStorage(){

localStorage.setItem("tasks",JSON.stringify(tasks));

}

function updateDashboard(){

let total=tasks.length;

let completed=tasks.filter(t=>t.completed).length;

let pending=total-completed;

totalTasks.textContent=total;

completedTasks.textContent=completed;

pendingTasks.textContent=pending;

let percent=total===0?0:Math.round((completed/total)*100);

progressBar.style.width=percent+"%";

progressValue.textContent=percent+"%";

}

function renderTasks(){

taskList.innerHTML="";

let filtered=[...tasks];

if(currentFilter==="completed")
filtered=filtered.filter(t=>t.completed);

if(currentFilter==="pending")
filtered=filtered.filter(t=>!t.completed);

filtered=filtered.filter(task=>
task.name.toLowerCase().includes(search.value.toLowerCase())
);

if(filtered.length===0){

taskList.innerHTML=`
<div style="text-align:center;padding:50px;color:#888;">
<h2>No Tasks Found</h2>
<p>Create a new task.</p>
</div>
`;

updateDashboard();

return;

}

filtered.forEach(task=>{

let index=tasks.indexOf(task);

let li=document.createElement("li");

li.className=task.completed?"task completed":"task";

li.innerHTML=`

<div class="task-left">

<input type="checkbox"
${task.completed?"checked":""}
onchange="toggleComplete(${index})">

<div class="task-info">

<h3>${task.name}</h3>

<p>
<i class="fa-solid fa-calendar-days"></i>
<strong>Date:</strong> ${task.date || "No Date"}

&nbsp;&nbsp;&nbsp;

<i class="fa-regular fa-clock"></i>
<strong>Time:</strong> ${task.time || "--"}
</p>

<p style="margin-top:8px;">
<strong>Priority:</strong>

<span class="priority ${task.priority.toLowerCase()}">
${task.priority}
</span>
</p>

</div>

</div>

<div class="actions">

<button class="editBtn"
onclick="editTaskItem(${index})">

<i class="fa-solid fa-pen"></i>

</button>

<button class="deleteBtn"
onclick="deleteTask(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

taskList.appendChild(li);

});

updateDashboard();

}

addTask.onclick=function(){

if(taskInput.value.trim()===""){

alert("Please enter task.");

return;

}

tasks.push({

name:taskInput.value,

date:taskDate.value,

time:taskTime.value,

priority:priority.value,

completed:false

});

taskInput.value="";

taskDate.value="";

taskTime.value="";

priority.value="Medium";

saveStorage();

renderTasks();

}

function toggleComplete(index){

tasks[index].completed=!tasks[index].completed;

saveStorage();

renderTasks();

}

function deleteTask(index){

if(confirm("Delete this task?")){

tasks.splice(index,1);

saveStorage();

renderTasks();

}

}

function editTaskItem(index){

currentEdit=index;

editTask.value=tasks[index].name;

editDate.value=tasks[index].date;

editTime.value=tasks[index].time;

editPriority.value=tasks[index].priority;

editModal.style.display="flex";

}

saveEdit.onclick=function(){

tasks[currentEdit].name=editTask.value;

tasks[currentEdit].date=editDate.value;

tasks[currentEdit].time=editTime.value;

tasks[currentEdit].priority=editPriority.value;

saveStorage();

renderTasks();

editModal.style.display="none";

}

cancelEdit.onclick=function(){

editModal.style.display="none";

}

window.onclick=function(e){

if(e.target===editModal){

editModal.style.display="none";

}

}

search.addEventListener("keyup",renderTasks);

filters.forEach(button=>{

button.onclick=function(){

filters.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

currentFilter=button.dataset.filter;

renderTasks();

}

});

renderTasks();
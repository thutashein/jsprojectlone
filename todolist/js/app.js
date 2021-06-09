
// UI
const form = document.querySelector('#task-form');
// console.log(form);
const taskinput = document.querySelector('#task');
// console.log(taskinput);
const filter = document.querySelector('#filter');
// console.log(filter);
const tasklist = document.querySelector('.collection');
// console.log(tasklist);
const clearbtn = document.querySelector('.clear-tasks');
// console.log(clearbtn);



//Add Task Event
form.addEventListener('submit',addtask);


//Remove task Event Listener
tasklist .addEventListener('click',removetask);


//Clear tasks Event Listener
clearbtn.addEventListener('click',cleartask);


//Filter task Event Listener
filter.addEventListener('keyup',filtertasks);



//DOMload Event
document.addEventListener('DOMContentLoaded',gettasks);



//Clear Tasks  Event Listener
clearbtn.addEventListener('click',cleartasksfromlocalstorage);










function addtask(e){
// console.log('hello');


if(taskinput.value === ''){
	window.alert("Add a task");
}else{


//create li element
const li = document.createElement('li');

//add class
li.className = "collection-item";


//create text node and append to ul
li.appendChild(document.createTextNode(taskinput.value));


const link = document.createElement('a');

//add class
link.className = "delete-item secondary-content";

//add icon
link.innerHTML = `<i class="far fa-trash-alt"></i>`;


//append link to li
li.appendChild(link);

//append li to ul
tasklist.appendChild(li);


//Storage in localstorage
storetaskinlocalstorage(taskinput.value);
}







e.preventDefault();
}





//Remove task 
function removetask(e){
	// console.log(e.target);

	// console.log(e.target.parentElement);

	if(e.target.parentElement.classList.contains('delete-item')){
		if(confirm("Are you sure")){
			e.target.parentElement.parentElement.remove();
			
			//remove task from local storage
	removetaskfromlocalstorage(e.target.parentElement.parentElement);



		}
		
	}


	

}



//Clear Tasks
function cleartask(){
	// console.log('hay');

	//Method 1
	// tasklist.innerHTML = '';

	//Method 2

	// console.log(tasklist.childElementCount);
	// console.log(tasklist.firstChild);

	let x = 0;

	// const litems = document.querySelector('li');
	// console.log(litems.length);

	// while(x < tasklist.childElementCount){
	// 	tasklist.removeChild(tasklist.firstChild);
	// }

	
	// Method 3
	while(tasklist.firstChild){
		tasklist.removeChild(tasklist.firstChild);

	}


}



//Filter Tasks
function filtertasks(e){

	// console.log('hay');

	// console.log(e.target.value);

	const filter = e.target.value.toLowerCase();
	// console.log(filter);

	const tasks = document.querySelectorAll('.collection-item');

	tasks.forEach(function(task){
		const item = task.firstChild.textContent.toLowerCase();


		if(item.indexOf(filter) !== -1){
			task.style.display ='block';


		}else{
			task.style.display = 'none';
		}



	});


}



//Store task
function storetaskinlocalstorage(task){

	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse( localStorage.getItem('tasks'));
	}

	tasks.push(task);

	localStorage.setItem('tasks',JSON.stringify(tasks));
}



//Get tasks from localstorage
function gettasks(){
	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task){
		//create li element
		const li = document.createElement('li');
		li.className = "collection-item";
		
		//create text node and append to li
		li.appendChild(document.createTextNode(task));

		//create new link element
		const link = document.createElement('a');
		//add class
		link.className = 'delete-item secondary-content';
		//add icon
		link.innerHTML = `<i class="far fa-trash-alt"></i>`;
		//append to li
		li.appendChild(link);

		//append li to ul
		tasklist.appendChild(li);


	});




}



//Remove Task form loacalstorage

function removetaskfromlocalstorage(taskitem){
	// console.log(taskitem);

	let tasks;

	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else{
		tasks = JSON.parse( localStorage.getItem('tasks'));
	}


	tasks.forEach(function(task,index){
		if(taskitem.textContent === task){
			tasks.splice(index,1);
		}
	});

	localStorage.setItem('tasks',JSON.stringify(tasks));

}



//Clear from Local Storage
function cleartasksfromlocalstorage(){
	localStorage.clear();
}



























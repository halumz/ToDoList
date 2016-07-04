var todos	=	[],
	divTasks	= document.getElementById('divTasks'),
	modalAddTask = $("#modalAddTask"),
	selectedId	= 0,
	addTask 	= false;	
function init() {
	
	setdivTasks();
	//console.log(todos);
	
	$("#btnAddTasks").on('click', function() {
		selectedId	= -1;
		addTask 	= true;
		setInputModal();
		
	})

	$("#btnFullCalView").on('click', function() {
			window.location	= 'fullCalendarVew.html';
	})
	$("#btnDeleteTasks").on('click', function() {	
		addTask 	= true;
		saveArray([]);
	})

	

	
}
init();


function setdivTasks()
{
	todos = createList();
	divTasks.innerHTML    = Handlebars.compile( $('#template').html() )( todos );		
	$('div.divBtns').hide().slideUp('fast');
	$("#divTasks").sortable().disableSelection();
	sortInit();

	$('div.divTaskContainer').on('mouseenter', function() {
    	$(document.getElementById("divBtns"+$(this).data('id'))).show().slideDown('fast');

  	})

  	$('div.divTaskContainer').on('mouseleave', function() {
		$('div.divBtns').slideUp('fast');
    	
  	})

	$('button.btnEdit').on('click', function() {
		addTask 	= true;
		selectedId = $(this).data('id'); 
		setInputModal();
	})
	$('button.btnDelete').on('click', function() {
		addTask 	= true;
		todos[$(this).data('id')].task = null;
		saveArray(todos);
	})
}


function setInputModal()
{
	var selectedDate	 =  new Date(),
		dp3 = $('#dp3');
		inputTask 	= $('#inputTask');
	if(selectedId	== -1)
	{
		$("#modalTittle").html("Add Task");
		inputTask.val(null);
	}
	else {
		$("#modalTittle").html("Edit Task");
		inputTask.val(todos[selectedId].task);
		selectedDate = todos[selectedId].time;
		
	 }
	dp3.data 	= selectedDate;
	dp3.datepicker("setDate", selectedDate);
			
	dp3.on('changeDate', function(ev){
		dp3.datepicker('hide');
	});

	$("#btnMdalSuccess").on('click', function() {
		if (!addTask) 
			return;

		if(!inputTask.val()) {
			alert("Please Input a task");
		} 
		else {
			selectedDate = $(".span2").val();
			if(selectedId 	== -1)
			{
				todos.push({
					id		:	todos.length,
					task	:	inputTask.val(),
					time	:	selectedDate,
				});
			}
			else {
				todos[selectedId].task    = inputTask.val();
				todos[selectedId].time    = selectedDate;

			}
			inputTask.removeAttr('value');
			saveArray(todos);
			modalAddTask.modal('hide');
			return;
		}
	});
	modalAddTask.modal();
	inputTask.focus();
}



function sortInit(){
	$("#divTasks")//.sortable().disableSelection()
  		.on( "sortstart", function( event, ui ){
  			addTask = true;
  });
	$("#divTasks").sortable().disableSelection()
  		.on( "sortstop", function( event, ui ){
    		if(addTask){
    			var initId = ui.item.attr("id") ,
    			newId = ui.item.index() ,
    			curTask = todos[initId].task;
				
	    		if(initId > newId)
	      		{
	        		for(var i = initId ; i>newId ; i--)
	        		{
	          			todos[i].task = todos[i-1].task;
	        		}
	      		}
	      		else {
	        		{
	          			for(var i = initId ; i<newId ; i++)
	          			{
	            			todos[i++].task = todos[i].task;
	            			i--;
	          			}
	        		}
	      		}
		        todos[newId].task = curTask;
	      		// $("#divTasks").sortable("cancel");
	       		saveArray(todos);
	       	}
  });
}
function getToday()
{
	var now		= new Date();
	var day		= ("0" + now.getDate()).slice(-2);
	var month	= ("0" + (now.getMonth() + 1)).slice(-2);
	return now.getFullYear()+"-"+(month)+"-"+(day) ;
}

function createList() {
	var array = getJSONARRAY(localStorage.getItem('json'));
	if(array == null)
		return [];
	else
		return array;
}

function saveArray(todos)
{
	if (!addTask) 
		return;
	else
		addTask = false;
	if(todos.length ==0)
		localStorage.setItem("json", null);
	else	
		localStorage.setItem("json", createJSON(todos));
	setdivTasks();
}

function createJSON(array) {
	var newId	=	-1,
	jsonObj		=	[];
	for(i = 0 ;	i	<	array.length;	i++)
	{
		if(array[i].task!=null)
		{

			jsonObj.push({
				id		:	++newId,
				task	:	array[i].task,
				time	:	array[i].time,
			});
		}
	}
	return JSON.stringify(jsonObj);
}
function getJSONARRAY(strJSON){
	if(strJSON == null)
		return [];
	else
		return $.parseJSON(strJSON);
}

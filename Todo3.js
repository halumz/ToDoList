function init() {
  var divInput                 = $('div.divInput'),
  divTodo                   = $('div.divTodo'),
  btninputData              = $(document.getElementById('btninputData')),
  input                     = $('#input'),
  todos           = createList(),
  selectedId                = 0;
  $( "#sortable").append( Handlebars.compile( $('#template').html() )( todos ));
  divInput.hide();
  $('div.divBtns').hide();

  $('div.divTaskContainer').on('mouseenter', function() {
    $(document.getElementById('buttons'+$(this).data('id'))).show().slideDown('fast');
  })

  $('div.divTaskContainer').on('mouseleave', function() {
    $('div.divBtns').slideUp('fast',function() {
      $('div.divBtns').hide();
    });
  })
  $('button.btnAddTasks').on('click', function() {
    divInput.fadeIn('fast');
    selectedId              = -1;
    setInput();
  })

  $('button.btnDeleteTasks').on('click', function() {
    for (var i = 0; i < todos.length; i++) {
      todos[i].task = null;
    }
    saveArray(todos);
  })

  $('button.btnEdit').on('click', function() {
    selectedId              = $(this).data('id');
    setInput();
  })

  $('button.btnDelete').on('click', function() {
    todos[$(this).data('id')].task = null;
    saveArray(todos);
  })
  $(document.getElementById('btnX')).on('click', function() {
    divInput.fadeOut('fast', function() {
      divInput.hide();
      divTodo.show().fadeIn('fast');
    });
  })
  btninputData.on('click', function() {
    var data                = input.val().toString();
    if(data.length          == 0)
    {
      alert('Please write something');
    }
    else
    {
      if(selectedId         == -1)
      {
        max = todos.length;
        localStorage.setItem("max", max);
        localStorage.setItem(""+max,input.val());
        todos.push({
          id:                   max,
          task:                 input.val(),
        });

      }
      else {
        todos[selectedId].task = input.val();
      }
      saveArray(todos);
    }
  })
  function setInput()
  {
    divInput.show().fadeIn();
    divTodo.hide();
    if(selectedId           == -1)
    {
      input.val('').focus();
      btninputData.html( 'Save Task');
    }
    else {
      input.val(todos[selectedId].task).focus();
      btninputData.html( 'Edit Task');
    }
  }

  $( "#sortable" ).sortable()
  .disableSelection()
  .on( "sortstop", function( event, ui )
  {
    var initId = ui.item.attr("id") ,
    newId = ui.item.index() ,
    curTask = todos[initId].task;
    if(initId != newId)
    {
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
      saveArray(todos);
    }

  } );
}
init();
function createList() {
  return getJSONARRAY(localStorage.getItem('json'));
}
function saveArray(todos)
{
  localStorage.setItem("json", createJSON(todos));
  location.reload();
}
function createJSON(array) {
  var newId =-1,
  jsonObj = [];
  for(i = 0;i<array.length;i++)
  {
    if(array[i].task!=null)
    {
      jsonObj.push({
        id:                   ++newId,
        task:                 array[i].task,
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

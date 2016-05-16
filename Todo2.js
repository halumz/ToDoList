function init() {
  var todos           = createList(),
  max                   = todos.length,
  selectedId                = 0,
  divInput                 = $('div.divInput'),
  divTodo                   = $('div.divTodo'),
  btninputData              = $(document.getElementById('btninputData')),
  input                     = $('#input');
  divTodo.append( Handlebars.compile( $('#template').html() )( todos ));
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
    for (var i = 0; i < max; i++) {
      todos[i].task = '';
    }
    saveArray(todos);
  })

  $('button.btnEdit').on('click', function() {
    selectedId              = $(this).data('id') -1;
    setInput();
  })

  $('button.btnDelete').on('click', function() {
    todos[$(this).data('id') - 1].task = '';
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
        max++;
        //$.cookie("max", max);
        //$.cookie(""+max,input.val());
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
  jsonObj = [];
  $.each(array, function( index, value ) {
    item = {}
    item ["id"] = array[index].id;
    item ["task"] = array[index].task;
    jsonObj.push(item);
  });
  return JSON.stringify(jsonObj);
}
function getJSONARRAY(strJSON){
  if(strJSON == null)
  return [];
  else
  return $.parseJSON(strJSON);
}

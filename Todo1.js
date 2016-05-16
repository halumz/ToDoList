function init() {
  var max                   = getMax(),
  selectedId                = 0,
  divInput                 = $('div.divInput'),
  divTodo                   = $('div.divTodo'),
  btninputData              = $(document.getElementById('btninputData')),
  input                     = $('#input');

  //document.body.style.width = $(window).width();
  divTodo.append( Handlebars.compile( $('#template').html() )( createList(max)) );
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
    for (var i = 1; i <= max; i++) {
      //$.cookie(""+i, '');
      localStorage.setItem(""+i, '');
    }
    location.reload();
  })

  $('button.btnEdit').on('click', function() {
    selectedId              = $(this).data('id');
    setInput();
  })

  $('button.btnDelete').on('click', function() {
    //$.cookie(""+$(this).data('id'), '');
    localStorage.setItem(""+$(this).data('id'), '');
    location.reload();
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
      }
      else {
        //$.cookie(""+selectedId,input.val());
        localStorage.setItem(""+selectedId,input.val());
      }
      location.reload();
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
      //input.val($.cookie(""+selectedId)).focus();
      input.val(localStorage.getItem(""+selectedId)).focus();
      btninputData.html( 'Edit Task');
    }
  }

}
init();
function getMax() {
  //var num                     = $.cookie('max');
  var num                     = localStorage.getItem('max');
  if(num !== undefined)
  {
    return num;
  }
  else {
    //$.cookie('max','0');
    localStorage.setItem('max','0');
    return 0;
  }
}

function createList(max) {
  var array                 = [];
  for (var i                = 1; i <= max; i++) {
    //var Task                 = $.cookie(i+'');
    var Task                 = localStorage.getItem(i+'');
    if(Task.length != 0)
    {
      array.push({
        id:                   i,
        task:                 Task,
      });
    }
  }
  return array;
}

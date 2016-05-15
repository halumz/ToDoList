function init() {
  var max = getMax(),
  selectedId = 0,
  inputForm =$('div.inputForm'),
  divTodo=$('div.divTodo'),
  btninputData = $(document.getElementById('btninputData')),
  input =  $('#input');

  document.body.style.width = $(window).width();
  divTodo.append( Handlebars.compile( $('#template').html() )( createList(max)) );
  inputForm.hide();
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
    $(inputForm).fadeIn('medium');
    selectedId = -1;
    edit();
  })

  $('button.btnDeleteTasks').on('click', function() {
    for (var i = 1; i <= max; i++) {
      $.cookie(""+i, '');
    }
    location.reload();
  })


  $('button.inputFormButtons').on('click', function() {
    $(inputForm).fadeOut('medium', function() {
      inputForm.hide();
      divTodo.show();
    });
  })

  $('button.btnEdit').on('click', function() {
    selectedId = $(this).data('id');
    edit();
  })

  $('button.btnDelete').on('click', function() {
    $.cookie(""+$(this).data('id'), '');
    location.reload();
  })
  btninputData.on('click', function() {
    var data =input.val().toString();
    if(data.length==0)
    {
      alert('Please write something');
    }
    else
    {
      if(selectedId ==-1)
      {
        max++;
        $.cookie("max", max);
        $.cookie(""+max,input.val());
      }
      else {
        $.cookie(""+selectedId,input.val());
      }
      location.reload();
    }
  })
  function edit()
  {
    inputForm.show().fadeIn();
    divTodo.hide();
    if(selectedId == -1)
    {
      input.val('').focus();
      btninputData.html( 'Save Task');
    }
    else {
      console.log( $.cookie(""+selectedId));
      input.val($.cookie(""+selectedId)).focus();
      btninputData.html( 'Edit Task');
    }
  }

};
init();
function getMax() {
  var max = 0,
    num = $.cookie('max');
  if(num !==undefined)
  {
    max = num;
  }
  else {
    $.cookie('max','0');
    return 0;
  }
  return max;
}

function createList(max) {
  var array = [];
  for (var i = 1; i <= max; i++) {
    var nowiId = i,
    nowTask = $.cookie(i+'');
    if(nowTask.length != 0)
    {
      array.push({
        id:nowiId,
        task: nowTask,
      });
    }
  }
  return array;
}

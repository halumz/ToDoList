/** @jsx React.DOM */

var todos = React.createClass({

    addTask: function(e) {
        inputTodo = this.refs.inputTodo.getDOMNode();
        //console.log(""+new Date());
        var todo= {
            id : new Date(),
            task: inputTodo.value
        };
        inputTodo.value=null;
        var todos1 = this.state.todos.concat([todo]);
        this.setState({
            todos: todos1
        });
        saveArray(todos1);
    },
   
    
    getInitialState: function() {
        return {
            todos: createList()
        };
    },

    render: function() {
    
        var todos = this.state.todos.map(function(todo) {
            return (
                <todoItem todo= {todo} />
                );
        });

        return (
            <div className="container jumbotron" >
                    <div className="form-group">
                        <input ref="inputTodo" type="text" className="form-control" />
                        <button onClick={this.addTask} className="btn btn-primary">Add</button>
                    </div>
                { todos }
            </div>
        );
    }
  });

    var reactComponent = React.renderComponent(
        <todos />,
    document.getElementById('app')
);



function createList() {
    var array = getJSONARRAY(localStorage.getItem('json'));
    if(array == null)
        return [];
    else
        return array;
}
function saveArray(todos)
{
    if(todos.length ==0)
        localStorage.setItem("json", null);
    else    
        localStorage.setItem("json", createJSON(todos));
}
function createJSON(array) {
    var newId   =   -1,
    jsonObj     =   [];
    for(i   = 0 ;   i   <   array.length    ;   i++)
    {
        jsonObj.push({
            id      :   array[i].id,
            task    :   array[i].task,
        });
    }
    return JSON.stringify(jsonObj);
}
function getJSONARRAY(strJSON){
    if(strJSON == null)
        return [];
    else
        return JSON.parse(strJSON);
}

/** @jsx React.DOM */
var todoItem = React.createClass({
    render: function() {
        return (
            <div>
                <div>{this.props.todo.task}</div>
            </div>
        );
    }
});

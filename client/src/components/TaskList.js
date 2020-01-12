import React, { Component } from 'react';
import { connect } from 'react-redux';

class TaskList extends Component {
    
    handleAddTask = () => {
        this.props.addTask(this.props.id);        
    }

    componentDidMount = () => {
        var id = this.props.name + "Newly Added";
        if (this.refs[id]) {
            var newTask = this.refs[id];
            newTask.getElementsByClassName('editButton')[0].click();
        }
    }

    handleDeleteTask = (task) => {
        this.props.deleteTask(this.props.id, task);
    }

    handleEditTask = (e) => {
        e.target.parentNode.setAttribute('draggable', false);
        e.target.parentNode.getElementsByTagName('p')[0].style.visibility = 'hidden';
        e.target.parentNode.getElementsByTagName('input')[0].style.visibility = 'visible';
        e.target.parentNode.getElementsByTagName('input')[0].value = e.target.parentNode.getElementsByTagName('p')[0].innerHTML.trim();
        e.target.parentNode.getElementsByTagName('input')[0].select();
    }

    handleToggleCrossOut = (e) => {
        if(e.target.tagName === "I" || e.target.tagName === "INPUT"){
            return;
        }
        if(e.target.style.textDecoration === "line-through") {
            e.target.setAttribute("style", "text-decoration: none");
        } else {   
            e.target.setAttribute("style", "text-decoration: line-through");
        }   
    }

    handleDragStart = (e, index) => {
        this.draggedItem = this.state.tasks[index];
        e.dataTransfer.effectAllowed = "move";
    }

    handleDragOver = (index) => {
        const draggedOverItem = this.state.tasks[index];
        if (this.draggedItem === draggedOverItem) {
            return;
        }
        let tasks = this.state.tasks.filter(task => task !== this.draggedItem);
        tasks.splice(index, 0, this.draggedItem);
        this.setState({ tasks });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var originalText = e.target.parentNode.getElementsByTagName('p')[0].innerHTML.trim();
        this.props.submitEdit(this.props.id, originalText, e.target.getElementsByTagName('input')[0].value);
        
        //reset the DOM state
        e.target.parentNode.setAttribute('draggable', true);
        e.target.parentNode.getElementsByTagName('p')[0].style.visibility = 'visible';
        e.target.parentNode.getElementsByTagName('input')[0].style.visibility = 'hidden';
    }

    handleBlur = (e) => {
        var originalText = e.target.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML.trim();
        this.props.submitEdit(this.props.id, originalText, e.target.value);

        //reset the DOM state
        e.target.parentNode.parentNode.setAttribute('draggable', true);
        e.target.parentNode.parentNode.getElementsByTagName('p')[0].style.visibility = 'visible';
        e.target.style.visibility = 'hidden';
    }

    render() {
        
        const lists = this.props.lists;
        for (var i = 0; i < lists.length; i++) {
            if (lists[i].id === this.props.id) {
                var list = lists[i];
                break;
            }
        }

        var listHTML = list.tasks.map( (task, index) => {
            return(
                <div className="Task" ref={list.name + task.text.toString()} onClick={this.handleToggleCrossOut} key={list.name + task.text.toString()} 
                draggable onDragStart={e => this.handleDragStart(e, index)} onDragOver={() => this.handleDragOver(index)}>
                    <div className="text">
                        <p> {task.text} </p>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)} id={list.name + task.text.toString()}>
                        <input type="text" onBlur={(e) => this.handleBlur(e)}></input>
                    </form>
                    <i className="material-icons deleteButton" 
                    onClick={() => this.handleDeleteTask(task.text.toString())}>remove_circle_outline</i>
                    <i className="material-icons editButton" onClick={this.handleEditTask}>create</i>
                </div>
            )
        })

        return(
            <div className="TaskList">
                {listHTML}
                <br></br>
                <br></br>
                <i className="material-icons addButton" onClick={e => this.handleAddTask(e)}>add_box</i>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.lists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (id) => {
            dispatch({type: 'ADD_TASK', id: id})
        },
        deleteTask: (id, task) => {
            dispatch({type: 'DELETE_TASK', id: id, text: task})
        },
        submitEdit: (id, originalText, newText) => {
            dispatch({type: 'EDIT_TASK', id: id, originalText: originalText, newText: newText})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
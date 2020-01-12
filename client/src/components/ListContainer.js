import React, { Component } from 'react';
import TaskList from './TaskList'
import { connect } from 'react-redux';

class ListContainer extends Component {
    
    handleEditList = (e) => {
        e.target.parentNode.parentNode.getElementsByTagName('h1')[0].style.visibility = 'hidden';
        e.target.parentNode.parentNode.getElementsByClassName('List-Title')[0].style.zIndex = '-1';
        e.target.parentNode.parentNode.getElementsByTagName('input')[0].style.visibility = 'visible';
        e.target.parentNode.parentNode.getElementsByTagName('input')[0].value = e.target.parentNode.getElementsByTagName('h1')[0].innerHTML.trim();
        e.target.parentNode.parentNode.getElementsByTagName('input')[0].select();
    }

    handleSubmit = (e, id) => {
        e.preventDefault();
        this.props.editListName(id, e.target.getElementsByTagName('input')[0].value);

        //Reset DOM State
        e.target.parentNode.getElementsByTagName('h1')[0].style.visibility = 'visible';
        e.target.parentNode.getElementsByTagName('input')[0].style.visibility = 'hidden';
        e.target.parentNode.getElementsByClassName('List-Title')[0].style.zIndex = '1';
    }

    handleBlur = (e, id) => {
        this.props.editListName(id, e.target.value);

        //Reset DOM State
        e.target.parentNode.parentNode.getElementsByTagName('h1')[0].style.visibility = 'visible';
        e.target.style.visibility = 'hidden';
        e.target.parentNode.parentNode.getElementsByClassName('List-Title')[0].style.zIndex = '1';
    }

    handleDeleteList = (id) => {
        this.props.deleteList(id);
    }

    render() {
    
        const { lists } = this.props;

        const taskLists = lists.map(list => {
            return(
                <div className="List w3-col m4 l5" id={list.id} key={list.id}>
                    <div className="List-Header">
                        <form onSubmit={(e) => this.handleSubmit(e, list.id)}>
                            <input type="text" onBlur={(e) => this.handleBlur(e, list.id)}></input>
                        </form>
                        <div className="List-Title" onClick={(e) => this.handleEditList(e)}> 
                            <h1> {list.name} </h1>                        
                        </div>                        
                        <i className="material-icons" onClick={() => this.handleDeleteList(list.id)}>clear</i>    
                    </div>
                    <TaskList id={list.id} name={list.name}/>
                </div>
            )
        })
        return(
            <div className="ListContainer">
                { taskLists }
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
        editListName: (id, text) => {
            dispatch({type: 'EDIT_LIST_NAME', id: id, text: text})
        },
        deleteList: (id) => {
            dispatch({type: 'DELETE_LIST', id: id})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
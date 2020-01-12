import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './w3.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

let appState = {};

fetch('http://localhost:5000', {mode: 'cors'}).then((response) => response.json()).then((data) => {appState = data}).then(() => {
    
    let id = appState._id;
    function calcId(list) {
        var name = list.name;
        var tasks = "";
        for (var i = 0; i < list.tasks.length; i++) {
            tasks += list.tasks[i].text;
        }

        return name + tasks;
    }

    const rootReducer = (state = appState, action) => {
        if (action.type === 'ADD_LIST') {
            appState.lists = [...appState.lists, {name: "New List", tasks: [], id: "New List", color: "blue"}];
            
            let newState = JSON.parse(JSON.stringify(appState));

            fetch('http://localhost:5000/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newState)
            });

            return {
                lists: newState.lists
            }
        }

        if (action.type === 'ADD_TASK') {
            var listEdited = appState.lists[0];
            for (var i = 0; i < appState.lists.length; i++) {
                if (appState.lists[i].id === action.id) {
                    listEdited = appState.lists[i];
                    break;
                }
            }  
            listEdited.tasks.push({text: "Newly Added", color: "red", completed: false});
            
            listEdited.id = calcId(listEdited);
            let newState = JSON.parse(JSON.stringify(appState));
            
            fetch('http://localhost:5000/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newState)
            });

            return {
                lists: newState.lists
            }
        }

        if (action.type === 'EDIT_TASK') {
            listEdited = appState.lists[0];
            for (i = 0; i < appState.lists.length; i++) {
                if (appState.lists[i].id === action.id) {
                    listEdited = appState.lists[i];
                    break;
                }
            }  

            for (i = 0; i < listEdited.tasks.length; i++) {
                if (listEdited.tasks[i].text === action.originalText) {
                    listEdited.tasks[i].text = action.newText;
                }
            }

            listEdited.id = calcId(listEdited);
            let newState = JSON.parse(JSON.stringify(appState));

            fetch('http://localhost:5000/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newState)
            });

            return {
                lists: newState.lists
            };

        }

        if (action.type === 'DELETE_TASK') {
            listEdited = appState.lists[0];
            for (i = 0; i < appState.lists.length; i++) {
                if (appState.lists[i].id === action.id) {
                    listEdited = appState.lists[i];
                    break;
                }
            }
            
            listEdited.tasks = listEdited.tasks.filter(task => task.text !== action.text);
            
            listEdited.id = calcId(listEdited);
            let newState = JSON.parse(JSON.stringify(appState));

            fetch('http://localhost:5000/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newState)
            });

            return {
                lists: newState.lists
            }

        }

        if (action.type === 'DELETE_LIST') {
            appState.lists = appState.lists.filter(list => list.id !== action.id);

            let newState = JSON.parse(JSON.stringify(appState));
            
            fetch('http://localhost:5000/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newState)
            });

            return {
                lists: newState.lists
            }
        }

        if (action.type === 'EDIT_LIST_NAME') {
            listEdited = appState.lists[0];
            for (i = 0; i < appState.lists.length; i++) {
                if (appState.lists[i].id === action.id) {
                    listEdited = appState.lists[i];
                    break;
                }
            }  

            listEdited.name = action.text;
            listEdited.id = calcId(listEdited);
            let newState = JSON.parse(JSON.stringify(appState));

            fetch('http://localhost:5000/' + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newState)
            });

            return {
                lists: newState.lists
            }
        }

        return state;
    }

    const store = createStore(rootReducer);

    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

    serviceWorker.unregister();

});
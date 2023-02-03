import React, {useState} from "react";

// Importing packages
import { Draggable } from 'react-beautiful-dnd';
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import Colleagues from "./Colleagues";

let taskStyles = {
    'column-0': {
      color: 'white',
      background: '#CA4A3D',
      border: '2px solid #CA4A3D',
      iconColor: 'white'
    },
    'column-1': {
        background: 'rgba(246, 108, 14, 0.06)',
        border: '2px dashed #FFA550',

        // Adding border source, slice, width and distance from the box
        borderImage: "url('../imgs/Main_dashed.png') 10 / 5 / 0 round",
        iconColor: '#FFA550',
    },
    'column-2': {
      background: 'rgba(25, 201, 41, 0.06)',
      border: '2px solid #19C929',
      opacity: '0.5',
      iconColor: '#19C929'
    }
}

let colleagues = {
    'Phil': '👽',
    'Larry': '👾',
    'James': '🐴',
    'Emma': '🦄',
    'Robin': '🐥',
    'Assign': '▼',
    'Ruslan': '😍 ',
    names: ['Phil', 'Larry', 'James', 'Emma', 'Robin', 'Ruslan', 'Assign']
}

const Task = styled.div`
    padding: 24px 32px 24px 23px;
    border-radius: 8px;
    user-select: none;
    transition: all 300ms ease;
    // top: auto !important;
    // left: auto !important;
`

function DraggableItem(props) {
    
    // Hooks
    const [showColleagues, setShowColleagues] = useState(false)
    
    // Event handlers
    function getTaskStyle(columnId, snapshot) {
        if (!snapshot.draggingOver) {
            return taskStyles[columnId]
        }
        else {
            return taskStyles[snapshot.draggingOver]
        }
    }

    const colleagueHandler = (e) => {
        
        setShowColleagues(!showColleagues)

        // remove whitespaces
        let name = e.target.innerText.trim()

        if (name === 'Assign') {
            props.task.colleague = null
        } 
        else {
            props.task.colleague = name
        }
    }

    
    return (
        <Draggable draggableId={`draggable-${props.task.id}`} index={props.index}>
            {
                (provided, snapshot) => {

                    return (
                        <div className="App-main-column-body-item-wrapper" ref={provided.innerRef}
                        {...provided.draggableProps} {...provided.dragHandleProps} 
                        >

                            {/* Adding props */}
                            <Task style={getTaskStyle(props.column.id, snapshot)}>
                                <li className="App-main-column-body-item" 
                                >
                                    <div className="App-main-column-body-item-column">
                                        <div className="App-main-column-body-item-column-main"> 
                                            <div className="App-main-column-body-item-column-main-icon">

                                                {/* Adding the svg */}
                                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14.75 0C16.5449 0 18 1.45507 18 3.25V10.1287C18 10.7254 17.7629 11.2977 17.341 11.7197L11.7197 17.341C11.2977 17.7629 10.7254 18 10.1287 18H3.25C1.45507 18 0 16.5449 0 14.75V3.25C0 1.45507 1.45507 0 3.25 0H14.75ZM14.75 1.5H3.25C2.2835 1.5 1.5 2.2835 1.5 3.25V14.75C1.5 15.7165 2.2835 16.5 3.25 16.5H10V13.25C10 11.517 11.3565 10.1008 13.0656 10.0051L13.25 10H16.5V3.25C16.5 2.2835 15.7165 1.5 14.75 1.5ZM15.439 11.5H13.25C12.3318 11.5 11.5788 12.2071 11.5058 13.1065L11.5 13.25V15.439L15.439 11.5Z"
                                                    fill={`${taskStyles[snapshot.draggingOver ? snapshot.draggingOver : props.column.id].iconColor}`}/>
                                                </svg>
                                            </div>

                                            <div className="App-main-column-body-item-column-main-text">
                                                {props.task.text}
                                            </div>
                                        </div> 
                                        
                                        <div className="App-main-column-body-item-column-footer">
                                            {props.task.footer}
                                        </div>
                                    </div>

                                    <div className="App-main-column-body-item-column">
                                        <div className="App-main-column-body-item-column-state">

                                            {
                                                snapshot.draggingOver ?
                                                <span className="App-main-column-body-item-column-state-text">
                                                    { props.columnData[snapshot.draggingOver].icon }

                                                    <span> { props.columnData[snapshot.draggingOver].state }</span>
                                                </span> :
                                                
                                                <span className="App-main-column-body-item-column-state-text">
                                                    { props.columnData[props.column.id].icon }
                                                    
                                                    <span> {props.columnData[props.column.id].state}</span>
                                                </span>
                                            }
                                        </div>

                                        <span className="App-main-column-body-item-column-employee">
                                            {
                                                props.task.colleague ?
                                                <span onClick={colleagueHandler} className="App-main-column-body-item-column-employee-text assign">
                                                    <span className="assign-emoji"> {colleagues[props.task.colleague]} </span>

                                                    <span className="assign-name"> { props.task.colleague } </span>
                                                </span> :

                                                <span onClick={colleagueHandler} className="App-main-column-body-item-column-employee-text assign">
                                                    <span className="assign-name"> Assign </span>
                                                    
                                                    <span className="assign-emoji"> { colleagues['Assign'] } </span>
                                                </span>      
                                            }
                                        </span>
                                    </div>
                                </li>
                            </Task>
                            
                            <CSSTransition
                                in={showColleagues}
                                timeout={500}
                                classNames="colleagues"
                                unmountOnExit
                                >
                                <Colleagues colleagues={colleagues} colleagueHandler={colleagueHandler}/>
                            </CSSTransition>
                        </div>
                    )
                }
            }
        </Draggable>
    )
}

export default DraggableItem
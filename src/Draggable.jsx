import React from "react";

// Importing packages
import { Draggable } from 'react-beautiful-dnd';
import styled from "styled-components";

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
      iconColor: '#FFA550' 
    },
    'column-2': {
      background: 'rgba(25, 201, 41, 0.06)',
      border: '2px solid #19C929',
      opacity: '0.5',
      iconColor: '#19C929'
    }
}

const Task = styled.div`
    padding: 24px 32px 24px 23px;
    border-radius: 8px;
    user-select: none;
    transition: all 300ms ease;
    // top: auto !important;
    // left: auto !important;
`

const Svg = styled.div`
    fill: white;    
`

function DraggableItem(props) {

    function getTaskStyle(columnId, snapshot) {
        if (!snapshot.draggingOver) {
            return taskStyles[columnId]
        }
        else {
            return taskStyles[snapshot.draggingOver]
        }
    }
    
    return (

        <Draggable draggableId={`draggable${props.task.id}`} index={props.index}>
            {
                (provided, snapshot) => {

                    return (
                        <div className="App-main-column-body-item-wrapper" ref={provided.innerRef}
                        {...provided.draggableProps} {...provided.dragHandleProps}
                        >

                            {/* Adding props */}
                            <Task style={getTaskStyle(props.columnId, snapshot)}>
                                <li className="App-main-column-body-item" 
                                >

                                    <div className="App-main-column-body-item-main"> 
                                        <div className="App-main-column-body-item-main-icon">
                                            {/* <img className="App-main-column-body-item-main-icon-img" src="./imgs/Main_copy.svg" alt="copy_icon"/> */}

                                            {/* Adding the svg */}
                                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.75 0C16.5449 0 18 1.45507 18 3.25V10.1287C18 10.7254 17.7629 11.2977 17.341 11.7197L11.7197 17.341C11.2977 17.7629 10.7254 18 10.1287 18H3.25C1.45507 18 0 16.5449 0 14.75V3.25C0 1.45507 1.45507 0 3.25 0H14.75ZM14.75 1.5H3.25C2.2835 1.5 1.5 2.2835 1.5 3.25V14.75C1.5 15.7165 2.2835 16.5 3.25 16.5H10V13.25C10 11.517 11.3565 10.1008 13.0656 10.0051L13.25 10H16.5V3.25C16.5 2.2835 15.7165 1.5 14.75 1.5ZM15.439 11.5H13.25C12.3318 11.5 11.5788 12.2071 11.5058 13.1065L11.5 13.25V15.439L15.439 11.5Z"
                                                fill={`${taskStyles[snapshot.draggingOver ? snapshot.draggingOver : props.columnId].iconColor}`}/>
                                            </svg>
                                        </div>

                                        <div className="App-main-column-body-item-main-text">
                                            {props.task.text}
                                        </div>
                                        
                                    </div> 

                                    <div className="App-main-column-body-item-main-footer">
                                        {props.task.footer}
                                    </div>

                                    <div className="App-main-column-body-item-sidebar"></div>   
                                </li>
                            </Task>
                        </div>
                    )
                }
            }

        </Draggable>
    )
}

export default DraggableItem
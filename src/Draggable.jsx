import React from "react";

// Importing packages
import { Draggable } from 'react-beautiful-dnd';

function DraggableItem(props) {

    return (

        <Draggable draggableId={`draggable${props.task.id}`} index={props.task.index}>
            {
                (provided) => {

                    return (
                        <div className="App-main-column-body-item" ref={provided.innerRef}
                        {...provided.draggableProps} {...provided.dragHandleProps}
                        >
                            <div className="App-main-column-body-item-main"> 
                                <div className="App-main-column-body-item-main-icon">
                                
                                </div>   
                                <div className="App-main-column-body-item-main-text">
                                    {props.task.text}
                                </div>
                                <div className="App-main-column-body-item-main-footer">
                                    {props.task.footer}
                                </div>
                            </div> 

                            <div className="App-main-column-body-item-sidebar"></div>   
                        </div>
                    )
                }
            }

        </Draggable>
    )
}

export default DraggableItem
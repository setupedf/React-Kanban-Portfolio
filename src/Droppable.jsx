import React from "react";

// Importing packages
import { Droppable } from 'react-beautiful-dnd';

// Importing components
import DraggableItem from "./Draggable";


function DroppableColumn(props) {
    
    return (
        <Droppable droppableId={`column-${props.index}`} > 
            {
                (provided) => {
                    if (props.tasks) {

                        return (
                            <ul className="App-main-column-body" ref={provided.innerRef} {...provided.droppableProps}>
                                {   
                                    props.tasks.map((task, index) => {
                                        return (
                                            <DraggableItem task={task} key={task.id} index={index} color={props.color} columnId={props.id} />
                                        )
                                    })
                                }
    
                                {/* Providing additional space for draggable elements */}
                                {provided.placeholder}
                            </ul>
                        )
                    }
                    else {
                        return (
                            <div className="App-main-column-body" ref={provided.innerRef} {...provided.droppableProps}>
                                {/* Providing additional space for draggable elements */}
                                {provided.placeholder}
                            </div>
                        )
                    }
                    
                }
            }
        </Droppable>
    )
}

export default DroppableColumn
import React from "react";

// Importing packages
import { Droppable } from 'react-beautiful-dnd';

// Importing components
import DraggableItem from "./Draggable";


function DroppableColumn(props) {
    
    return (
        <Droppable droppableId={`droppable-${props.index}`}> 
            {
                (provided) => {
                    if (props.tasks) {

                        return (
                            <div className="App-main-column-body" ref={provided.innerRef} {...provided.droppableProps}>
                                {   
                                    props.tasks.map(task => {
                                        return (
                                            <DraggableItem task={task} key={task.id}/>
                                        )
                                    })
                                }
    
                                {/* Providing additional space for draggable elements */}
                                {provided.placeholder}
                            </div>
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
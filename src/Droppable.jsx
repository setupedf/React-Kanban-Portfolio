import React from "react";

// Importing packages
import { Droppable } from 'react-beautiful-dnd';

// Importing components
import DraggableItem from "./Draggable";


function DroppableColumn(props) {
    
    return (
        <Droppable droppableId={props.column.id} > 
            {
                (provided) => {
                    if (props.column.tasks) {

                        return (
                            <ul className="App-main-column-body" ref={provided.innerRef} {...provided.droppableProps}>
                                {   
                                    props.column.tasks.map((task, index) => {
                                        return (
                                            <DraggableItem task={task} column={props.column} columnData={props.columnData} index={index} key={task.id}/>
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
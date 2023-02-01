

// Importing packages
import { DragDropContext } from 'react-beautiful-dnd';
import 'reset-css'

// Importing styles
import './styles/styles.css';

// Importing components
import DroppableColumn from './Droppable';
import { useState } from 'react';

// Droppable and draggable data
let initData = [
  {
    id: 'column-0',
    index: 0,
    icon: '🍅',
    title: 'To do',
    color: '#FFFFFF',
    tasks: [
      {
        id: 1,
        text: 'Design a mobile in-flight wifi experience.',
        footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow'
      }
    ]
  },
  {
    id: 'column-1',
    index: 1,
    icon: '🥕',
    title: 'Doing',
    color: '#FFA550',
    tasks: [
      {
        id: 2,
        text: 'Design a mobile in-flight wifi experience.',
        footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow'
      },
    ]
  },
  {
    id: 'column-2',
    index: 2,
    icon: '✅',
    title: 'Done',
    color: '#19C929',
    tasks: [
      {
        id: 3,
        text: 'Design a mobile in-flight wifi experience.',
        footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow'
      },
    ],
  }
]

let columnIndexes = {
  'column-0': 0,
  'column-1': 1,
  'column-2': 2
}

function App() {

  // Making a state copy of the array
  let [data, updateData] = useState(initData)

  function onDragEnd(info) {

    // console.log(info)
    
    // Copying the data array
    let newData = Array.from(data)

    // Getting the reordered task
    let sourceColumn = newData[columnIndexes[info.source.droppableId]]
    let targetColumn = newData[columnIndexes[info.destination.droppableId]]

    const [reorderedTask] = sourceColumn.tasks.splice(info.source.index, 1)
    
    // Inserting the task
    targetColumn.tasks.splice(info.destination.index, 0, reorderedTask)
    
    // Updating the array
    updateData(newData)
  }

  function onDragStart(info) {
    console.log(info)
  }
  
  return (
    <div className="App">
      <div className="container">
        <header className="App-header">
          <span className="App-header-title"><span className="App-hader-text">📝</span>Kanban Board</span>
        </header>

        <main className="App-main">

          {/* Declaring Dnd-able part of the site and passing
              a function required when a draging ends*/}
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
              {

                // Mapping over all columns in the data list
                data.map(column => {
                  return(
                    <div className="App-main-column" key={column.index}>
                      <div className="App-main-column-title">
                          <span className="App-main-column-title-icon">{column.icon}</span>
                          {column.title}   
                      </div>
                      
                      {/* Passing column data through props */}
                      <DroppableColumn id={`${column.id}`} index={column.index} tasks={column.tasks} color={column.color} />
                    </div>
                  )
                })
              }
          </DragDropContext>


        </main>
      </div>
    </div>
  );
}

export default App;

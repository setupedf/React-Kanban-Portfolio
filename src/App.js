

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
    tasks: [
      {
        id: 1,
        text: 'Design a mobile in-flight wifi experience.',
        footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow',
        colleague: 'Phil'
      }
    ]
  },
  {
    id: 'column-1',
    index: 1,
    tasks: [
      {
        id: 2,
        text: 'Design a mobile in-flight wifi experience.',
        footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow',
        colleague: null
      },
    ]
  },
  {
    id: 'column-2',
    index: 2,
    tasks: [
      {
        id: 3,
        text: 'Design a mobile in-flight wifi experience.',
        footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow',
        colleague: null
      },
    ],
  }
]

let columnData = {
  'column-0': {
      icon: '🍅',
      state: 'TBD'
  },
  'column-1': {
      icon: '🥕',
      state: 'Doing'
  },
  'column-2': {
      icon: '✅',
      state: 'Done'
  }
}

let columnIndexes = {
  'column-0': 0,
  'column-1': 1,
  'column-2': 2
}

let initIdCount = 3 

function App() {

  // Making the controlled items
  const [data, updateData] = useState(initData)
  const [idCount, updateIdCount] = useState(initIdCount)
  const [text, updateText] = useState("")
  const [footer, updateFooter] = useState("")
  
  function onDragEnd(info) {
    
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
  
  const textHandler = (e) => {
    updateText(e.target.value)
  }
  
  const footerHandler = (e) => {
    updateFooter(e.target.value)
  }
  
  function onSubmit(e) {
    
    // Prevent default behaviour - page reload
    e.preventDefault()

    // Copying the existing data array
    let targetTasksList = data[0].tasks
    
    let inputFields = e.target.querySelectorAll('input')
    
    // Pushing a new task in the list
    targetTasksList.push({
      id: idCount + 1,
      text: `${inputFields[0].value}`,
      footer: `${inputFields[1].value}`
    })
    
    // Updating the id count
    updateIdCount(idCount + 1)

    // Deleting previous values
    updateText("")
    updateFooter("")
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
          <DragDropContext onDragEnd={onDragEnd}>
              {

                // Mapping over all columns in the data list
                data.map(column => {
                  return(
                    <div className="App-main-column" key={column.index}>
                      <div className="App-main-column-title">
                          <span className="App-main-column-title-icon">{columnData[column.id].icon}</span>
                          {columnData[column.id].state}   
                      </div>
                      
                      {/* Passing column data through props */}
                      <DroppableColumn column={column} columnData={columnData}/>
                    </div>
                  )
                })
              }
          </DragDropContext>
        </main>

        <div className="App-footer">
          <form onSubmit={onSubmit} action="" className="App-footer-form">
            <input value={text} onChange={textHandler} className='App-footer-form-input' type="text" placeholder='Type task text' required/>
            <input value={footer} onChange={footerHandler} className='App-footer-form-input' type="text" placeholder='Type task footer' required/>

            <button className="App-footer-form-btn" type="submit">
              <span className="App-footer-form-btn-text">Create new task</span>
              <span className="App-footer-form-btn-emoji">👆</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;

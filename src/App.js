// Importing packages
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import 'reset-css'

// Importing styles
import './styles/styles.css';

// Importing components
import DroppableColumn from './Droppable';

// Setting variables
let emojisFiltered = false
const categories = ['animals_and_nature']
const initIdCount = 3

const initData = [
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

/** Returns a random element from an array and cut it off if needed */
function getRandom(array, modify=false) {
  const max = array.length - 1
  const index = Math.floor(Math.random() * max)

  if (!modify) {
    return array[index]
  }
}

function App(props) {

  const [data, updateData] = useState(initData)
  const [emojis, updateEmojis] = useState(props.emojis)
  const [idCount, updateIdCount] = useState(initIdCount)
  const [footer, updateFooter] = useState("")
  const [text, updateText] = useState("")
  
  const onDragEnd = (e) => {
    
    // Copying the data array
    let copy = Array.from(data)

    if (!e.destination) {
      return null
    }
    
    // Getting the reordered task
    let sourceColumn = copy[columnIndexes[e.source.droppableId]]
    let targetColumn = copy[columnIndexes[e.destination.droppableId]]
    
    const [reorderedTask] = sourceColumn.tasks.splice(e.source.index, 1)
    
    // Inserting the task
    targetColumn.tasks.splice(e.destination.index, 0, reorderedTask)
    
    // Updating the array
    updateData(copy)
  }
  
  const onSubmit = (e) => {
    
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

  const textHandler = (e) => {
    updateText(e.target.value)
  }

  const footerHandler = (e) => {
    updateFooter(e.target.value)
  }
  
  // Filtering the emoji array
  if (!emojisFiltered) {
    const result = emojis.filter(obj => {return categories.includes(obj.category)})
    updateEmojis(result)
    emojisFiltered = true
  }

  return (
    <div className="App"> 	
      <div className="container">
        <header className="App-header">
          <span className="App-header-title"><span className="App-hader-text">📝</span>Kanban Board</span>
        </header>

        <main className="App-main">
          <DragDropContext onDragEnd={onDragEnd}>
              {
                data.map(column => {
                  return(
                    <div className="App-main-column" key={column.index}>
                      <div className="App-main-column-title">
                          <span className="App-main-column-title-icon">{columnData[column.id].icon}</span>
                          {columnData[column.id].state} 
                      </div>
                      
                      <DroppableColumn column={column} columnData={columnData}/>
                    </div>
                  )
                })
              }
          </DragDropContext>
        </main>
        
        <div className="App-footer">
          <div className="App-footer-btns">

            <button className="App-footer-btns-btn" type="button">
              <span className="App-footer-btns-btn-text">Create new task</span>
              <span className="App-footer-btns-btn-emoji">👆</span>
            </button>
            
            <button className="App-footer-btns-btn" type="button">
              <span className="App-footer-btns-btn-text">Add your team mates</span>
              <span className="App-footer-btns-btn-emoji">➕</span>
            </button>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App;

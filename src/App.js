// Importing packages
import { CSSTransition } from 'react-transition-group';
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from 'react';
import 'reset-css'

// Importing styles
import './styles/styles.css';

// Importing components
import DroppableColumn from './Droppable';
import Inputs from './Inputs';
import Colleagues from './Colleagues';

// Setting variables
let emojisFiltered = false
let popupTarget = ""
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

let colleagues = {
  'Phil': '👽',
  'Larry': '👾',
  'Emma': '🦄',
  'Assign': '▼',
  names: ['Assign', 'Phil', 'Larry', 'Emma']
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
  const [showPopup, setShowPopup] = useState(false)
  const [colleagueError, setColleagueError] = useState("")
  
  /** Reorders a card within the dnd context*/
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
  
  /** Creates a new draggable card*/
  const createCard = (e) => {
    
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

    inputFields[0].value = ''
    inputFields[1].value = ''

    setShowPopup(false)
  }

  /** */
  const addColleague = (e) => {

    // Prevent default behaviour - page reload
    e.preventDefault()

    const input = e.target.querySelector('input')

    if (input.value.split(" ").length > 1) {
      setColleagueError("The name should consist of one word.")
      return;
    }
    
    if (input.value.length > 10 || input.value.length < 2) {
      setColleagueError(`The name is too ${(input.value.length < 2) ? "short" : "long"}.`)
      return;
    }

    colleagues.names.push(input.value)
    colleagues[input.value] = getRandom(emojis).emoji

    input.value = ""

    setShowPopup(false)
    setColleagueError("")
  }

  const closePopup = (e) => {
    setShowPopup(false)
    setColleagueError("")
  }

  /** Chooses event handler to process proper popup form data*/
  const submitInput = (e) => {

    e.preventDefault()
    
    switch(popupTarget) {
      case "card":
        createCard(e)
        break;

      case "colleague":
        addColleague(e)
        break;

      default:
        console.log("Цель отправки формы не найдена.")
        break;
    }
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
                      
                      <DroppableColumn column={column} columnData={columnData} colleagues={colleagues}/>
                    </div>
                  )
                })
              }
          </DragDropContext>
        </main>
        
        <div className="App-footer">
          <div className="App-footer-btns">

            <button className="App-footer-btns-btn"
                    onClick={() => {setShowPopup(true); popupTarget = "card"}}
                    type="button"
                    >
              <span className="App-footer-btns-btn-text">Create new task</span>
              <span className="App-footer-btns-btn-emoji">👆</span>
            </button>
            
            <button className="App-footer-btns-btn"
                    onClick={() => {setShowPopup(true); popupTarget = "colleague"}}
                    type="button"
                    >
              <span className="App-footer-btns-btn-text">Add your team mates</span>
              <span className="App-footer-btns-btn-emoji">➕</span>
            </button>
            
          </div>
        </div>
      </div>
      
      <CSSTransition
        in={showPopup}
        timeout={300}
        classNames="popup"
        unmountOnExit
        >
        
        <div className="App-popup">
          <div className="App-popup-window">
              <form onSubmit={submitInput} className="App-popup-window-form">
                <div 
                  onClick={closePopup}
                  className="App-popup-window-form-control"
                  >
                  <span>&#10006;</span>
                </div>
                
                <Inputs 
                  target={popupTarget}
                  />
                { colleagueError && <p className="App-popup-window-form-error">{colleagueError}</p> }

                <button className="App-popup-window-form-button">
                  <span>Submit</span>
                </button>
              </form>
          </div>
        </div>
        
      </CSSTransition>
    </div>
  );
}

export default App;

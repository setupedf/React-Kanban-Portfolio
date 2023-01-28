

// Importing packages
import { DragDropContext } from 'react-beautiful-dnd';
import 'reset-css'

// Importing styles
import './styles/styles.css';

// Importing components
import DroppableColumn from './Droppable';

// Droppable and draggable data
let data = {
  columns: [
    {
      index: 1,
      icon: '🍅',
      title: 'To do',
      tasks: [
        {
          index: 1,
          id: 1,
          text: 'Design a mobile in-flight wifi experience.',
          footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow'
        },
        {
          index: 2,
          id: 2,
          text: 'Design a mobile in-flight wifi experience.',
          footer: 'Lorem ipsum dolor blabla let’s carpool toogethr tomorrow'
        }
      ]
    },
    {
      index: 2,
      icon: '🥕',
      title: 'Doing',
    },
    {
      index: 3,
      icon: '✅',
      title: 'Done',
    },
  ]
}

function App() {

  function onDragEnd() {
    console.log('onDragEnd')
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
                data.columns.map(column => {
                  return(
                    <div className="App-main-column" key={column.index}>
                      <div className="App-main-column-title">
                          <span className="App-main-column-title-icon">{column.icon}</span>
                          {column.title}   
                      </div>
                      
                      {/* Passing column data through props */}
                      <DroppableColumn index={column.index} tasks={column.tasks}/>
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

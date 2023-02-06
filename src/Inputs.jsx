function Inputs(props) {

    switch (props.target) {
        case "card":
            return (
                <div className="App-popup-window-form-inputs">
                    <input type="text" placeholder="Task text" required/>
                    <input type="text" placeholder="Task footer text"/>
                </div>
            )
        case "colleague":
            return (
                <div className="App-popup-window-form-inputs">
                    <input type="text" placeholder="Employee name" required/>
                </div>
            )
        default:
            break;
    }
}

export default Inputs
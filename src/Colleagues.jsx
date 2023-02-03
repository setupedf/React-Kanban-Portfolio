import React from "react";

// Importing packages

function Colleagues(props) {
    
    return (

        <div className="window">
            <ul className="window-list">
                {
                    props.colleagues.names.map((colleague, index) => {
                        return(
                            // <li onClick={props.colleagueHandler} className="window-list-item" key={index}>
                            <li onClick={props.colleagueHandler} className="window-list-item" key={index}>
                                <span className="window-list-item-emoji"> {props.colleagues[colleague]} </span>
                                <span className="window-list-item-name"> {colleague} </span>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Colleagues
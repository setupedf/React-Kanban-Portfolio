import React from "react";

// Importing packages
import styled from "styled-components";

function Colleagues(props) {
    
    if (props.show) {
        return (
    
            <div className="window">
                {/* <div className="window-header">
                    <span className="window-header-emoji">➕</span>
                    <span className="window-header-title">Add your team mates</span>
                </div> */}
                <ul className="window-list">
                    {
                        props.colleagues.names.map((colleague, index) => {
                            return(
                                <li onClick={props.clickHandler} className="window-list-item" key={index}>
                                    <span> {props.colleagues[colleague]} </span>
                                    <span className="window-list-item-name"> {colleague} </span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Colleagues
import React, { useEffect, useState } from 'react';
import { areArraysEqual } from '../../utils';
import Square from './Square';

export default function Board(props) {
  
  // deconstruct props
  let { theme, positions, onClick, startingSquare } = props;

  // Initalize state
  const [squareSize, setSize] = useState(window.innerHeight < window.innerWidth ? window.innerHeight / 9 : window.innerWidth / 9);

  // Add event listeners for changes in the window height and width
  useEffect(() => {
    window.addEventListener("resize", () => {

      if (window.innerHeight < window.innerWidth) {
        setSize(window.innerHeight / 9)
      } else {
        setSize(window.innerWidth / 9)
      };
  
    });

  }, []);

  // Set default theme
  if (!theme) {
    theme = {
      light: "wheat",
      dark: "chocolate",
      highlight: 'rgb(111,143,114)'
    }
  }

  // Initalize array to store the board
  const board = [];

  // Create the board
  for (let i = 0; i < 8; i++) {

    // Initalize the array for board
    let boardRow = []
    // Initalize square color for row
    let color;
    if (i % 2 === 0) {
      color = theme.light;
    } else {
      color = theme.dark;
    }

    // The board has 8 rows, for each row add 8 columns
    for (let j = 0; j < 8; j++) {
      
      // If the starting square is the current square, highlight it use the color
      let squareColor;
      if (areArraysEqual(startingSquare, [i, j])) {
        squareColor = theme.highlight;
      } else {
        squareColor = color;
      }

      // Add a square to the row
      boardRow.push(
        <Square 
          key={`${i}${j}`}
          color={squareColor} 
          row={i} 
          column={j} 
          size={squareSize} 
          pieceImage={positions[i][j] ? positions[i][j].image : null}
          onClick={onClick}
        />
      )

      // Change the square color for the next square
      color = color === theme.light ? theme.dark : theme.light;
    }
    board.push(<div key={`row${i}`}style={{display: 'flex'}}>{boardRow}</div>)
  }

  return (
    <div>
      {board}
    </div>
  )
}

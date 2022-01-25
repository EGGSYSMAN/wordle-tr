import './App.css';
import { useEffect, useState } from 'react'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container, Snackbar, TextField, Button, Backdrop, Alert } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import styled from 'styled-components'
import words from './words.js'
import { Helmet } from "react-helmet";

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function App() {
  const [wordGrid, setWordGrid] = useState([])
  const [currentRow, setCurrentRow] = useState(0)
  const [currentCol, setCurrentCol] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [isLost, setIsLost] = useState(false)
  const [doesWordExist, setDoesWordExit] = useState(true)
  const [solution] = useState(words[Math.floor(Math.random() * words.length)])
  // const [solution] = useState("CLEAR")
  const [listCorrect, setListCorrect] = useState([])
  const [listWrongPos, setListWrongPos] = useState([])
  const [listWrong, setListWrong] = useState([])
  const KBRow1 = "ERTYUIOPĞÜ"
  const KBRow2 = "ASDFGHJKLŞİ"
  const KBRow3 = "ZCVBNMÖÇ"
  const row1 = [];
  const row2 = [];
  const row3 = [];

  const Key = styled.button`
  border-radius: 4px;
  background-color: ${(props) => {
      if ((listCorrect).indexOf(props.value) > -1) {
        return ("#538d4e;")
      } else if ((listWrongPos).indexOf(props.value) > -1) {
        return ("#b59f3b;")
      } else if ((listWrong).indexOf(props.value) > -1) {
        return ("#3a3a3c")
      }

    }}
}
`

  const SpecialButton = styled.button`
  background-color: #1976d2;
  border-radius: 4px;
}
`

  const Box = styled.button`
  padding: 8px;
  max-width: 62px;
  max-height: 62px;
  border: ${(props) => {
      if (props.status === "empty") {
        return ("2px solid #3a3a3c");
      } else if (props.status === "fill") {
        return ("2px solid #565758");
      }
    }};
  background-color: ${(props) => {
      if (props.status === "correct") {
        return ("#538d4e")
      } else if (props.status === "wrongPos") {
        return ("#b59f3b")
      } else if (props.status === "wrong") {
        return ("#3a3a3c")
      } else {
        return ("#121213")
      }
    }};
  `

  for (let i = 0; i < KBRow1.length; i++) {
    row1.push(<Key className="KBLetter" value={KBRow1[i]} onClick={(e) => handleClick(e)}>{KBRow1[i]}</Key>)
  }
  for (let i = 0; i < KBRow2.length; i++) {
    row2.push(<Key className="KBLetter" value={KBRow2[i]} onClick={(e) => handleClick(e)}>{KBRow2[i]}</Key>)
  }
  for (let i = 0; i < KBRow3.length; i++) {
    row3.push(<Key className="KBLetter" value={KBRow3[i]} onClick={(e) => handleClick(e)}>{KBRow3[i]}</Key>)
  }

  useEffect(() => {

    function initializeWordGrid() {
      let newWordGrid = [];
      for (let i = 0; i < 6; i++) {
        newWordGrid.push([])
      }

      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
          newWordGrid[i].push({ letter: "", state: "empty" })
        }
      }

      setWordGrid(newWordGrid)
    }

    if (wordGrid.length === 0) {
      initializeWordGrid();
    }
  })

  const handleClick = (e) => {
    if (currentCol < 5) {
      const newWordGrid = [...wordGrid]
      newWordGrid[currentRow][currentCol] = { letter: e.target.value, state: "fill" }
      setWordGrid(newWordGrid)
      if (currentCol < 6) {
        setCurrentCol(currentCol + 1)
      }
    }
  }

  const handleErase = (e) => {
    const newWordGrid = [...wordGrid]
    newWordGrid[currentRow][currentCol - 1] = { letter: "", state: "empty" }
    setWordGrid(newWordGrid)
    if (currentCol > 0) {
      setCurrentCol(currentCol - 1)
    }
  }

  const handleSubmit = () => {
    if (currentCol === 5) {
      let word = ""
      for (let i = 0; i < 5; i++) {
        word = word + wordGrid[currentRow][i].letter
      }
      if (words.includes(word.toUpperCase())) {
        var newSolution = solution
        for (let i = 0; i < 5; i++) {
          if (wordGrid[currentRow][i].letter === newSolution[i]) {
            setListCorrect(listCorrect => [...listCorrect, wordGrid[currentRow][i].letter])
            wordGrid[currentRow][i].state = "correct"
            newSolution = setCharAt(newSolution, i, "!")
          }
        }

        for (let i = 0; i < 5; i++) {
          if (wordGrid[currentRow][i].state != "correct") {
            if (newSolution.includes(wordGrid[currentRow][i].letter)) {
              wordGrid[currentRow][i].state = "wrongPos"
              setListWrongPos(listWrongPos => [...listWrongPos, wordGrid[currentRow][i].letter])
              for (let j = 0; j < newSolution.length; j++) {
                if (newSolution[j] === wordGrid[currentRow][i].letter) {
                  newSolution = setCharAt(newSolution, j, "?")
                  break;
                }
              }
            } else {
              setListWrong(listWrong => [...listWrong, wordGrid[currentRow][i].letter])
              wordGrid[currentRow][i].state = "wrong"
            }
          }
        }
        if (word === solution) {
          setIsWon(true)
        } else if (currentRow > 4) {
          setIsLost(true)
        } else {
          setCurrentRow(currentRow + 1)
          setCurrentCol(0)
        }
      } else {
        setDoesWordExit(false)
      }
    }
  }

  const handleClose = () => {
    setIsLost(false);
    setIsWon(false);
    setDoesWordExit(true)
  };

  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
      </Helmet>
      <Container maxWidth="sm">
        <div className="Header">WORDLE CLONE TÜRKÇE</div>
        <div className="App">
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isWon}
            onClick={handleClose}>
            You Won!
          </Backdrop>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLost}
            onClick={handleClose}>
            You Lost!
            The answer was {solution}
          </Backdrop>
          <div className="Grid">
            {wordGrid.map((row, rowIndex) => (
              <div className="Row">
                {row.map((col, colIndex) => (
                  <Box status={wordGrid[rowIndex][colIndex].state}>
                    <div className="Letter">
                      {wordGrid[rowIndex][colIndex].letter}
                    </div>
                  </Box>
                ))
                }
              </div>
            ))}
          </div>
          <Snackbar open={!doesWordExist} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Kelime dağarcığımızda böyle bir kelime bulunmuyor.
            </Alert>
          </Snackbar>
          <div className="Keyboard">
            <div className="KBRow">
              {row1}
            </div>
            <div className="KBRow">
              {row2}
            </div>
            <div className="KBRow">
              <SpecialButton onClick={(e) => handleSubmit(0)}>ENTER</SpecialButton>
              {row3}
              <SpecialButton onClick={(e) => handleErase(e)}><BackspaceIcon /></SpecialButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}



export default App;
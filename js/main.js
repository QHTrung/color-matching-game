import { GAME_STATUS, PAIRS_COUNT } from './constants.js'
import {
  getColorElementList,
  getColorListElement,
  getInActiveColorList,
  getPlayAgainButton,
} from './selectors.js'
import {
  getRandomColorPairs,
  hidePlayAgainButton,
  setTimerText,
  showPlayAgainButton,
} from './utils.js'

// Global variables
let selections = []
let gameStatus = GAME_STATUS.PLAYING

// TODOs
// 1. Generating colors using https://github.com/davidmerfield/randomColor
// 2. Attach item click for all li elements
// 3. Check win logic
// 4. Add timer
// 5. Handle replay click

function handleColorClick(liElement) {
  const shouldBlockClick = [GAME_STATUS.BLOCKING, GAME_STATUS.FINISHED].includes(gameStatus)
  const isClicked = liElement.classList.contains('active')
  if (!liElement || isClicked || shouldBlockClick) return
  liElement.classList.add('active')
  // save clicked cell to selections
  selections.push(liElement)
  if (selections.length < 2) return
  // check match
  const firstColor = selections[0].dataset.color
  const secondColor = selections[1].dataset.color
  const isMatch = firstColor === secondColor
  if (isMatch) {
    // check Win
    const isWin = getInActiveColorList().length === 0
    if (isWin) {
      //show replay button
      showPlayAgainButton()
      // show YOU WIN
      setTimerText('YOU WIN 👑')
      gameStatus = GAME_STATUS.FINISHED
    }
    selections = []
    return
  }
  gameStatus = GAME_STATUS.BLOCKING
  // in casse of not match
  setTimeout(() => {
    // remove class active from 2 liElement
    selections[0].classList.remove('active')
    selections[1].classList.remove('active')
    // reset selections for the next turn
    selections = []
    gameStatus = GAME_STATUS.PLAYING
  }, 500)
}
function initColorList() {
  const colorList = getRandomColorPairs(PAIRS_COUNT)
  const liList = getColorElementList()
  liList.forEach((liElement, index) => {
    liElement.dataset.color = colorList[index]
    const overlayElement = liElement.querySelector('.overlay')
    overlayElement.style.backgroundColor = colorList[index]
  })
}
function attachEventForLiElemnt() {
  const ulElement = getColorListElement()
  if (!ulElement) return
  ulElement.addEventListener('click', (event) => {
    if (event.target.tagName !== 'LI') return
    handleColorClick(event.target)
  })
}
function resetGame() {
  // reset global variables
  selections = []
  gameStatus = GAME_STATUS.PLAYING
  // reset DOM element
  // remove class active from liList
  const colorElementList = getColorElementList()
  for (const colorElement of colorElementList) {
    colorElement.classList.remove('active')
  }
  // hide play agint button
  hidePlayAgainButton()
  // set text timer
  setTimerText('')
  // generate new color list
  initColorList()
}
function attachEventForPlayAgainButton() {
  const playAgianButton = getPlayAgainButton()
  if (!playAgianButton) return
  playAgianButton.addEventListener('click', resetGame)
}
;(() => {
  initColorList()
  attachEventForLiElemnt()
  attachEventForPlayAgainButton()
})()

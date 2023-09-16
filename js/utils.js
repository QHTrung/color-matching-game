import { getColorBackground, getPlayAgainButton, getTimerElement } from './selectors.js'

function shufle(colorList) {
  if (!Array.isArray(colorList) || colorList.length < 2) return colorList
  for (let i = colorList.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * i)
    let temp = colorList[i]
    colorList[i] = colorList[j]
    colorList[j] = temp
  }
}
export const getRandomColorPairs = (count) => {
  // receive count --> return count * 2 random colors
  // using lib: https://github.com/davidmerfield/randomColor
  const colorList = []
  const hueList = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']
  for (let i = 0; i < count; i++) {
    const color = window.randomColor({
      luminosity: 'dark',
      hue: hueList[i % hueList.length],
    })
    colorList.push(color)
  }
  const fullColorList = [...colorList, ...colorList]
  shufle(fullColorList)
  return fullColorList
}

export function showPlayAgainButton() {
  const playAgainElement = getPlayAgainButton()
  if (playAgainElement) playAgainElement.classList.add('show')
}
export function hidePlayAgainButton() {
  const playAgainElement = getPlayAgainButton()
  if (playAgainElement) playAgainElement.classList.remove('show')
}
export function setTimerText(text) {
  const timerElement = getTimerElement()
  if (timerElement) timerElement.textContent = text
}
export function createTimer({ seconds, onChange, onFinish }) {
  let intervalId = null
  function start() {
    clear()
    let currentSeconds = seconds
    intervalId = setInterval(() => {
      onChange?.(currentSeconds)
      currentSeconds--
      if (currentSeconds < 0) {
        clear()
        onFinish?.()
      }
    }, 1000)
  }
  function clear() {
    clearInterval(intervalId)
  }

  return {
    start,
    clear,
  }
}
export function changeBackGroundColor(color) {
  const colorBackground = getColorBackground()
  if (colorBackground) colorBackground.style.backgroundColor = color
}

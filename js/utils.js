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

window.onload = () => {
  const getPalleteBoard = document.querySelector('#color-palette');
  const getColorPalette = document.getElementsByClassName('color');
  const getPixelBoard = document.getElementById('pixel-board');
  const getPixelBoardRow = document.getElementsByClassName('row');
  const getPixels = document.getElementsByClassName('pixel');
  const getColorSelected = document.getElementsByClassName('color selected');
  const getButtonSection = document.getElementById('my-buttons');
  const paletteColors = JSON.parse(localStorage.getItem('colorPalette'));
  const boardSize = JSON.parse(localStorage.getItem('boardSize'));
  let colorArray = [];

  const generateNumber = () => {
    const myRandomNumber = Math.floor(Math.random() * 255);
    return myRandomNumber;
  };

  const changeColor = () => {
    const redNumber = generateNumber();
    const greenNumber = generateNumber();
    const blueNumber = generateNumber();
    const myRGB = `rgb(${redNumber}, ${greenNumber}, ${blueNumber})`;
    return myRGB;
  };

  const createPaletteBoard = (place) => {
    for (let index = 0; index < 4; index += 1) {
      let myColor = '';
      const myPalette = document.createElement('div');
      const newColor = changeColor();
      place.appendChild(myPalette);
      if (index === 0) {
        myColor = 'black';
        colorArray.push(myColor);
        myPalette.className = 'color selected';
      } else {
        myColor = newColor;
        myPalette.className = 'color';
        colorArray.push(myColor);
      }
    }
  };

  createPaletteBoard(getPalleteBoard);

  const createButton = (place, id, type, text) => {
    const myButton = document.createElement('button');
    myButton.id = id;
    myButton.type = type;
    myButton.innerText = text;
    place.appendChild(myButton);
  };

  const createInput = (place) => {
    const myInput = document.createElement('input');
    myInput.id = 'board-size';
    myInput.type = 'number';
    myInput.min = '1';
    place.appendChild(myInput);
  };

  createButton(getButtonSection, 'button-random-color', 'button', 'Cores aleatórias');
  createInput(getButtonSection);
  createButton(getButtonSection, 'generate-board', 'button', 'VQV');
  createButton(getButtonSection, 'clear-board', 'button', 'Limpar');

  const getColorButton = document.getElementById('button-random-color');
  const getInputButton = document.getElementById('generate-board');
  const getInputText = document.getElementById('board-size');
  const getCleanButton = document.getElementById('clear-board');

  const generateNewColors = () => {
    getColorButton.addEventListener('click', () => {
      colorArray = [];
      for (let index = 0; index < getColorPalette.length; index += 1) {
        let newColor = '';
        if (index === 0) {
          newColor = 'black';
          getColorPalette[index].style.backgroundColor = newColor;
          colorArray.push(newColor);
        } else {
          newColor = changeColor();
          getColorPalette[index].style.backgroundColor = newColor;
          colorArray.push(newColor);
        }
      }
      localStorage.setItem('colorPalette', JSON.stringify(colorArray));
    });
  };

  generateNewColors();

  const getColor = () => {
    const selectedColor = getColorSelected[0].style.backgroundColor;
    return selectedColor;
  };

  const paintPixel = (color) => {
    const pixelArray = [];
    for (let index = 0; index < getPixels.length; index += 1) {
      const backgroundPixels = getPixels[index].style.backgroundColor;
      pixelArray.push(backgroundPixels);
      getPixels[index].addEventListener('click', () => {
        getPixels[index].style.backgroundColor = color;
        pixelArray[index] = color;
        localStorage.setItem('pixelBoard', JSON.stringify(pixelArray));
      });
    }
  };

  paintPixel(getColor());

  const selectColor = () => {
    for (let index = 0; index < getColorPalette.length; index += 1) {
      getColorPalette[index].addEventListener('click', (event) => {
        const myColor = event.target;
        for (let index2 = 0; index2 < getColorPalette.length; index2 += 1) {
          getColorPalette[index2].classList.remove('selected');
          myColor.classList.add('selected');
          paintPixel(getColor());
        }
      });
    }
  };

  selectColor();

  const clearBoard = () => {
    getCleanButton.addEventListener('click', () => {
      const pixelArray = [];
      for (let index = 0; index < getPixels.length; index += 1) {
        getPixels[index].style.backgroundColor = '';
        const myPixel = getPixels[index].style.backgroundColor;
        pixelArray.push(myPixel);
      }
      localStorage.setItem('pixelBoard', JSON.stringify(pixelArray));
    });
  };

  clearBoard();

  const removeTable = () => {
    const sizeBoard = getPixelBoard.children.length;
    for (let index = 0; index < sizeBoard; index += 1) {
      getPixelBoard.removeChild(getPixelBoard.firstElementChild);
    }
  };

  const createPixelElementRow = (place) => {
    const myPixel = document.createElement('div');
    myPixel.className = 'pixel';
    place.appendChild(myPixel);
  };

  const createRow = (place) => {
    const myRow = document.createElement('div');
    myRow.className = 'row';
    place.appendChild(myRow);
  };

  const createTable = (pixels) => {
    for (let index = 0; index < pixels; index += 1) {
      createRow(getPixelBoard);
      for (let index2 = 0; index2 < pixels; index2 += 1) {
        createPixelElementRow(getPixelBoardRow[index]);
      }
    }
  };

  createTable(5);

  const getTable = (pixels, color) => {
    removeTable();
    createTable(pixels);
    paintPixel(color);
  };

  const createNewTable = () => {
    getInputButton.addEventListener('click', () => {
      if (getInputText.value < 5 && getInputText.value > 0) {
        getTable(5, getColor());
        localStorage.setItem('boardSize', 5);
        localStorage.removeItem('pixelBoard');
      } else if (getInputText.value > 50) {
        getTable(50, getColor());
        localStorage.setItem('boardSize', 50);
        localStorage.removeItem('pixelBoard');
      } else if (getInputText.value >= 5 && getInputText.value <= 50) {
        getTable(getInputText.value, getColor());
        localStorage.setItem('boardSize', getInputText.value);
        localStorage.removeItem('pixelBoard');
      } else {
        alert('Board inválido!');
      }
      getInputText.value = '';
    });
  };

  createNewTable();

  const recoverColorPalette = (myPalettes) => {
    for (let index = 0; index < myPalettes.length; index += 1) {
      getColorPalette[index].style.backgroundColor = myPalettes[index];
    }
  };

  const recoverColorPixel = (myPixels) => {
    for (let index = 0; index < myPixels.length; index += 1) {
      getPixels[index].style.backgroundColor = myPixels[index];
    }
  };

  const initialize = () => {
    const pixelColors = JSON.parse(localStorage.getItem('pixelBoard'));
    if (paletteColors) {
      recoverColorPalette(paletteColors);
    }
    if (boardSize) {
      getTable(boardSize, getColor());
    }
    if (pixelColors) {
      recoverColorPixel(pixelColors);
    }
  };

  initialize();
};

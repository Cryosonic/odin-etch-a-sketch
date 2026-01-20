const resizeInput = document.getElementById("canvas-input")
const resizeBtn = document.getElementById("resize-button");
const resetBtn = document.getElementById("reset");
const canvas = document.getElementById("canvas");
const palette = document.getElementById("color-palette");
const colorList = [[0, 0, 0], [255, 0, 0], [255, 165, 0], [255, 255, 0], [0, 128, 0], [0, 0, 255], [128, 0, 128]];
let color = "rgb(0, 0, 0)";
const darkenBtn = document.getElementById("darken");
let canDarken = false;
const randomiseBtn = document.getElementById("random");
let canRandomise = false;

const generatePalette = () => {
    colorList.forEach(el=>{
        const colorSquare = document.createElement("div");
        colorSquare.classList.add("color");
        colorSquare.style.backgroundColor = `rgb(${el})`;
        palette.appendChild(colorSquare);
    })
    palette.children[0].classList.add("selected-color");
}

const selectedColor = (event) => {
    const paletteColors = palette.children;
    if (event.target.classList[0] == "color") {
        for (let i = 0; i < paletteColors.length; i++) {
            paletteColors[i].classList.remove("selected-color")
        }
        event.target.classList.add("selected-color");
    }
    color = event.target.style.backgroundColor;
    canRandomise = false;
    randomiseBtn.classList.remove("selected-option");
}

const getCanvasSize = () => {
    const userInput = Number(resizeInput.value);
    if (userInput < 10) {
        alert("Minimum size of canvas set to 10")
        return 10;
    } else if (userInput > 100) {
        alert("Maximum size of canvas set to 100")
        return 100;
    } else {
        return Math.floor(userInput);
    }
}

const generateCanvas = (size = getCanvasSize()) => {
    canvas.innerHTML = "";
    const pixelSize = 500 / size;

    for (let i = 0; i < size; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        for (let j = 0; j < size; j++) {
            const newPixel = document.createElement("div");
            newPixel.style.height = `${pixelSize}px`
            newPixel.style.width = `${pixelSize}px`
            newPixel.classList.add("pixel");
            newRow.appendChild(newPixel);
        }
        canvas.appendChild(newRow);
    }
}

const resetCanvas = () => {
    resizeInput.value = 16;
    generateCanvas(16);
}

const fillPixel = (pixel) => {
    if (canDarken) {
        const regex = /[\d]+/g;
        let rgb = color.match(regex);
        pixel.style.backgroundColor = color;
        const newrgb = rgb.map(el=>{
            if(Number(el) - 5 < 0) {
                return 0;
            } else {
                return Number(el) - 5;
            }
        })
        color = `rgb(${newrgb})`
    } else if (canRandomise) {
        color = `rgb(${setRandomColor()})`;
        pixel.style.backgroundColor = color;
    } else {
        pixel.style.backgroundColor = color;
    }
}

const checkDrawInput = (event) => {
    if(event.target.classList[0] == "pixel") {
        switch (event.type) {
            case "click":
            fillPixel(event.target, color);
            break;
            case "mouseover":
                if(event.buttons == "1") {
                    fillPixel(event.target, color);
                };
            break;
        }
    }
}

const checkResizeInput = (event) => {
    if (event.type == "click" || event.code == "Enter" || event.code == "NumpadEnter") {
        generateCanvas();
    }
}

const toggleDarken = () => {
    if (canDarken) {
        darkenBtn.classList.remove("selected-option");
        canDarken = false;
    } else if (!canDarken) {
        randomiseBtn.classList.remove("selected-option")
        canRandomise = false;
        darkenBtn.classList.add("selected-option");
        canDarken = true;
    }
}

const setRandomColor = () => {
    const randomNumber = Math.floor(Math.random()*colorList.length);
    return colorList[randomNumber];
}

const toggleRandom = () => {
    if (canRandomise) {
        const blackColor = palette.children[0]
        blackColor.classList.add("selected-color");
        color = blackColor.style.backgroundColor;
        randomiseBtn.classList.remove("selected-option");
        canRandomise = false;
    } else if (!canRandomise) {
        const paletteColors = palette.children;
        for (let i = 0; i < paletteColors.length; i++) {
            paletteColors[i].classList.remove("selected-color");
        }
        darkenBtn.classList.remove("selected-option")
        canDarken = false;
        randomiseBtn.classList.add("selected-option");
        canRandomise = true;
    }
}

resizeBtn.addEventListener("click", checkResizeInput);
resizeInput.addEventListener("keypress", checkResizeInput)
generateCanvas();
generatePalette();
canvas.addEventListener("click", checkDrawInput);
canvas.addEventListener("mouseover", checkDrawInput);
palette.addEventListener("click", selectedColor);
darkenBtn.addEventListener("click", toggleDarken);
resetBtn.addEventListener("click", resetCanvas);
randomiseBtn.addEventListener("click", toggleRandom);
const resizeInput = document.getElementById("canvas-input")
const resizeBtn = document.getElementById("resize-button");
const canvas = document.getElementById("canvas");
const palette = document.getElementById("color-palette");
const colorList = ["black", "red", "orange", "yellow", "green", "blue", "purple"];
let color = colorList[0];

const generatePalette = () => {
    colorList.forEach(el=>{
        const colorSquare = document.createElement("div");
        colorSquare.classList.add("color");
        colorSquare.style.backgroundColor = el;
        palette.appendChild(colorSquare);
    })
}

const selectedColor = (event) => {
    const paletteColors = palette.children;
    for (let i = 0; i < paletteColors.length; i++) {
        paletteColors[i].classList.remove("selected-color")
    }
    event.target.classList.add("selected-color");
    color = event.target.style.backgroundColor;
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

const generateCanvas = () => {
    canvas.innerHTML = "";
    const size = getCanvasSize();
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

const fillPixel = (pixel, selectedColor) => {
    pixel.style.backgroundColor = selectedColor;
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

resizeBtn.addEventListener("click", checkResizeInput);
resizeInput.addEventListener("keypress", checkResizeInput)
generateCanvas();
generatePalette();
canvas.addEventListener("click", checkDrawInput);
canvas.addEventListener("mouseover", checkDrawInput);
palette.addEventListener("click", selectedColor);
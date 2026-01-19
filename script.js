const resizeBtn = document.getElementById("resize-button");
const canvas = document.getElementById("canvas");

const getCanvasSize = () => {
    const userInput = Number(document.getElementById("canvas-size").value);
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

    for (let i = 0; i < size; i++) {
        const newRow = document.createElement("div");
        newRow.classList.add("row");
        for (let j = 0; j < size; j++) {
            const newPixel = document.createElement("div");
            newPixel.classList.add("pixel");
            newRow.appendChild(newPixel);
        }
        canvas.appendChild(newRow);
    }
}

const fillPixel = (pixel, selectedColor) => {
    pixel.style.backgroundColor = selectedColor;
}

const checkInputType = (event) => {
    if(event.target.classList[0] == "pixel") {
        switch (event.type) {
            case "click":
            fillPixel(event.target, "black");
            break;
            case "mouseover":
                if(event.buttons == "1") {
                    fillPixel(event.target, "red");
                };
            break;
        }
    }
}

resizeBtn.addEventListener("click", generateCanvas);
generateCanvas();
canvas.addEventListener("click", checkInputType);
canvas.addEventListener("mouseover", checkInputType);
import { TrackableArray } from "./TrackableArray";
import { Timer } from "./Timer";

const UpdateType = {
    COUNTER: 0,
    POSITION: 1,
}
export class ArrayDrawer { // TODO: each sorting tash should have an array drawer that is passed down and can tell aux from primary on method call

    counterCanvas: HTMLElement;
    posCanvas: HTMLElement;

    currentLength: number = 0;

    canvasWidth: number = 0;
    canvasHeight: number = 0;

    cWidthUnit: number = 0;
    cHeightUnit: number = 0;

    updateStack: any[][];


    constructor(counterCanvas: HTMLElement, posCanvas: HTMLElement) { // TODO: condense p and aux arrays to one, canvas will be null for aux, additional struct param: counter loc, will write all counter updates there and all pos update to canvas (which is null for aux cuz no need to update pos for aux)
        this.counterCanvas = counterCanvas;
        this.posCanvas = posCanvas;
        this.updateStack = [];

        // updates.shift

        this.resizeCanvas(500, 500);
    }

    resizeCanvas(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;

        this.posCanvas.setAttribute("width", String(this.canvasWidth));
        this.posCanvas.setAttribute("height", String(this.canvasHeight));

        this.setPrimaryArrayLength(this.currentLength);
    }

    setPrimaryArrayLength(length: number) {
        this.currentLength = length;
        this.cWidthUnit = 1.0 * this.canvasWidth / length; // assumes len = max - 1 (true if is consecuitive range of ints)
        this.cHeightUnit = 1.0 * this.canvasHeight / length;
    }

    setCounter(canvas: HTMLElement, acsesses: number, modifications: number) {
        canvas.innerHTML = `
        <text x="20" y="35">
        Acsesses     : ${acsesses}
        <br>
        Modifications: ${modifications}
        </text>`

    }

    setPositions(self: ArrayDrawer, arr: Array<number>) {
        self.posCanvas.innerHTML = "";
        let canvasHeight: number = Number(self.posCanvas.getAttribute("height"));
        for (var i = 0; i < arr.length; i++) {
            let height: number = arr[i] * self.cHeightUnit;
            self.posCanvas.innerHTML += `
                <rect
                width="${self.cWidthUnit}"
                height="${height}"
                x="${i * self.cWidthUnit}"
                y="${canvasHeight - height}">
                </rect>`;
        }
    }

    updateCounters(tArr: TrackableArray): void { // TODO: insteead of taking arguments, make two incrementors for the 2 vars that redir to setCounter, learn how to locate a div from within the canvas, then with that read its text conent, and asign it ot 1 + that number
        if (tArr.isAux) {

        } else {
            setTimeout(this.setCounter, 10, this.counterCanvas, tArr.acsesses, tArr.modifications);
        }



        // var newElement: SVGTextElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        // newElement.textContent = `
        // Acsesses     : ${acsesses}
        // Modifications: ${modifications}`

        // canvas.append(newElement)
        // }, 10, this.canvas);

    };

    updatePositions(tArr: TrackableArray): void { // TODO: this gets wierd slightly when u pop an element, instead we should try to restrict to only switches
        if (tArr.isAux) {

        } else {
            setTimeout(this.setPositions, 10, this, tArr.arr);
            // Timer.sleep(110);
        }
    };

}
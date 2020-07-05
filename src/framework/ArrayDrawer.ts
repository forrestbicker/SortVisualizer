import { TrackableArray } from "./TrackableArray";
import { Util, UpdateType } from "../Utility/Util";

export class ArrayDrawer { // TODO: each sorting tash should have an array drawer that is passed down and can tell aux from primary on method call

    counterCanvas: Element;
    posCanvas: Element;
    readerCanvas: Element;

    currentLength: number = 0;
    currentMax: number = 0;

    canvasWidth: number = 0;
    canvasHeight: number = 0;

    cWidthUnit: number = 0;
    cHeightUnit: number = 0;

    updateStack: any[];

    READER_HEIGHT: number = 15;


    constructor(counterCanvas: HTMLElement, posCanvas: HTMLElement, readerCanvas: HTMLElement) { // TODO: condense p and aux arrays to one, canvas will be null for aux, additional struct param: counter loc, will write all counter updates there and all pos update to canvas (which is null for aux cuz no need to update pos for aux)
        this.counterCanvas = counterCanvas;
        this.posCanvas = posCanvas;
        this.readerCanvas = readerCanvas;

        this.updateStack = [];

        this.resizeCanvas(500, 500);
    }

    resizeCanvas(width: number, height: number): void {
        this.canvasWidth = width;
        this.canvasHeight = height;

        this.posCanvas.setAttribute("width", String(this.canvasWidth));
        this.posCanvas.setAttribute("height", String(this.canvasHeight));
        this.counterCanvas.setAttribute("width", String(this.canvasWidth));
        this.readerCanvas.setAttribute("width", String(this.canvasWidth));
        this.readerCanvas.setAttribute("height", String(this.READER_HEIGHT));

        this.setPrimaryArrayLength(this.currentLength, this.currentMax);
    }

    setPrimaryArrayLength(length: number, max: number): void {
        this.currentLength = length;
        this.cWidthUnit = 1.0 * this.canvasWidth / length; // assumes len = max - 1 (true if is consecuitive range of ints)
        this.cHeightUnit = 1.0 * this.canvasHeight / max; // 
    }


    setCounter(acsesses: number, modifications: number): void {
        this.counterCanvas.innerHTML = `
        <text x="20" y="35">
        Acsesses     : ${acsesses}
        <br>
        Modifications: ${modifications}
        </text>`
    }

    setPositions(arr: number[]): void { // todo: fix all array<number> to number<> and the likes
        let newInnerHTML: string = ""
        let canvasHeight: number = Number(this.posCanvas.getAttribute("height"));
        for (var i = 0; i < arr.length; i++) {
            let height: number = arr[i] * this.cHeightUnit;
            newInnerHTML += `
                <rect
                width="${this.cWidthUnit}"
                height="${height}"
                x="${i * this.cWidthUnit}"
                y="${canvasHeight - height}">
                </rect>`;
        }
        this.posCanvas.innerHTML = newInnerHTML;
    }

    setReader(ix: number): void {
        let height = this.READER_HEIGHT;
        let width = this.cWidthUnit;
        let xOffset: number = ix * width;

        // bottom left, top mid, bottom right
        this.readerCanvas.innerHTML = `<polygon points='
        ${xOffset},${height}
        ${xOffset + width / 2},0
        ${xOffset + width},${height}
        '></polygon>`;
    }

    pushCounterUpdate(tArr: TrackableArray): void { // TODO: insteead of taking arguments, make two incrementors for the 2 vars that redir to setCounter, learn how to locate a div from within the canvas, then with that read its text conent, and asign it ot 1 + that number
        this.updateStack.push({
            type: UpdateType.COUNTER,
            isAux: tArr.isAux,
            acsesses: tArr.acsesses,
            modifications: tArr.modifications
        });
    };

    pushPositionUpdate(tArr: TrackableArray): void { // TODO: this gets wierd slightly when u pop an element, instead we should try to restrict to only switches NOPE, because non comparison-only paragrims exist, i.e. radix sort
        if (!tArr.isAux) {
            this.updateStack.push({
                type: UpdateType.POSITION,
                arr: Util.copyOf(tArr.arr)
            });
        }
    };

    // startDisplayLoop(delay: number): void {
    //     this.stopDisplayLoop();
    //     this.intervalID = setInterval(this.displayNext, delay)
    // }

    // stopDisplayLoop() {
    //     clearInterval(this.intervalID!);
    // }

    display(delay: number): void {
        let len: number = this.updateStack.length;
        for (var i = 0; i < len; i++) {
            setTimeout(() => { this.displayNext() }, i * delay);
        }
    }

    displayNext(): void {
        let update = this.updateStack.shift(); // FIFO queue
        if (update != undefined) {
            switch (update.type) { // TODO: doing this as arrs works okay but would be better to do as dictionaries
                case UpdateType.COUNTER:
                    if (update.isAux) { // if is is an aux arr
                    } else {
                        this.setCounter(update.acsesses, update.modifications);
                    }
                    break;

                case UpdateType.POSITION:
                    this.setPositions(update.arr);
                    break;

                case UpdateType.READER:
                    break;
            }
        }
    }


    // TODO: idea of drawing directly to screen is moot beause way to slow. instead we will do new schedueler. it will work very well btu thte only problem is that it has high waiting time because must sort whole array first but bopefully if computers are fast enugh it should take less than 1 seccond. i think this will do well actually. we just push every frame into a stack and then we can do a loop to scheudel them at delayed intervals.
}
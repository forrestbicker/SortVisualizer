import { TrackableArray } from "./TrackableArray";
import { Util, UpdateType } from "../Utility/Util";
import { Config } from "../Utility/Config";

/** visual update schedueler */
export class ArrayDrawer { // TODO: each sorting tash should have an array drawer that is passed down and can tell aux from primary on method call

    counterCanvas: Element;
    posCanvas: Element;
    readerCanvas: Element;
    delaySlider: HTMLInputElement;

    currentLength: number = 0;
    currentMax: number = 0;

    canvasWidth: number = 0;
    canvasHeight: number = 0;

    cWidthUnit: number = 0;
    cHeightUnit: number = 0;

    updateStack: any[];

    READER_HEIGHT: number = 15;

    lastRead: number = 0;


    constructor(counterCanvas: HTMLElement, posCanvas: HTMLElement, readerCanvas: HTMLElement, delaySlider: HTMLInputElement) {
        this.counterCanvas = counterCanvas;
        this.posCanvas = posCanvas;
        this.readerCanvas = readerCanvas;
        this.delaySlider = delaySlider;

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
        this.cWidthUnit = Math.floor(1.0 * this.canvasWidth / length); // assumes len = max - 1 (true if is consecuitive range of ints)
        this.cHeightUnit = Math.floor(1.0 * this.canvasHeight / max); // 
    }


    setCounter(swaps: number, comparisons: number): void {
        this.counterCanvas.innerHTML = `
        <text x="20" y="35" style="color:${Config.colors.textColor}">
        Swaps      : ${swaps}
        <br>
        Comparisons: ${comparisons}
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
                y="${canvasHeight - height}"
                style="fill: ${Config.colors.barColor}">
                </rect>`;
        }
        this.posCanvas.innerHTML = newInnerHTML;
    }

    setColor(ix: number, color: String): void {
        let x = this.posCanvas.children[ix];
        x.setAttribute("style", `fill:${color}`);
    }

    setReader(ix: number, highlightColor?: string, permaBeacon?: boolean): void {
        // default values for optional params
        if (typeof highlightColor == "undefined") {
            highlightColor = Config.colors.readerColor
        }

        if (typeof permaBeacon == "undefined") {
            permaBeacon = false;
        }

        if (!permaBeacon) {
            // clear last color modification
            this.setColor(this.lastRead, Config.colors.barColor);
        }

        let height = this.READER_HEIGHT;
        let width = this.cWidthUnit;
        let xOffset: number = ix * width;

        // bottom left, top mid, bottom right
        this.readerCanvas.innerHTML = `<polygon
        points='
            ${xOffset},${height}
            ${xOffset + width / 2},0
            ${xOffset + width},${height}'
        style="fill: ${highlightColor!}"
        ></polygon>`;

        this.setColor(ix, highlightColor!);
        this.lastRead = ix;
    }

    pushCounterUpdate(tArr: TrackableArray): void {
        this.updateStack.push({
            type: UpdateType.COUNTER,
            swaps: tArr.swaps,
            comparisons: tArr.comparisons
        });
    };

    pushPositionUpdate(tArr: TrackableArray): void {
        if (!tArr.isAux) {
            this.updateStack.push({
                type: UpdateType.POSITION,
                arr: Util.copyOf(tArr.arr)
            });
        }
    };

    pushReaderUpdate(ix: number, highlightColor?: string, permaBeacon?: boolean): void {
        this.updateStack.push({
            type: UpdateType.READER,
            index: ix,
            highlightColor: highlightColor,
            permaBeacon: permaBeacon,
        })
    }
    pushColorUpdate(ix: number, color: String): void {
        this.updateStack.push({
            type: UpdateType.COLOR,
            index: ix,
            newColor: color
        })
    }

    pushBuffer(): void {
        this.updateStack.push({
            type: UpdateType.BUFFER,
        })
    }


    display(): void {
        let len: number = this.updateStack.length;
        this.displayNext();
    }

    displayNext(): void {
        let update = this.updateStack.shift(); // FIFO queue
        if (update != undefined) {
            switch (update.type) { // TODO: doing this as dicts is hacky but would be better to do as some type of custom object UpdateClass with several subclasses for each type of update
                case UpdateType.COUNTER: // update counter values
                    if (update.isAux) { // if is is an aux arr
                        // this.setCounter(0, 0);
                    } else {
                        this.setCounter(update.swaps, update.comparisons);
                    }
                    this.displayNext();
                    break;
                case UpdateType.POSITION: // update physical array
                    this.setPositions(update.arr);
                    this.displayNext();
                    break;
                case UpdateType.READER: // update location of reader head
                    this.setReader(update.index, update.highlightColor, update.permaBeacon);
                    this.displayNext();
                    break;
                case UpdateType.COLOR: // change color of bars
                    this.setColor(update.index, update.newColor);
                    this.displayNext();
                    break;
                case UpdateType.BUFFER:
                    setTimeout(() => { this.displayNext() }, 256 - parseFloat(this.delaySlider.value));
            }
        }
    }
}
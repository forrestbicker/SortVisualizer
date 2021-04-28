import { TrackableArray } from "./TrackableArray";
import { Util, UpdateType } from "../Utility/Util";
import { Config } from "../Utility/Config";

/** visual update schedueler */
export class ArrayDrawer { // TODO: each sorting tash should have an array drawer that is passed down and can tell aux from primary on method call

    counterCanvas: HTMLElement;
    posCanvas: HTMLElement;
    readerCanvas: HTMLElement;
    delaySlider: HTMLInputElement;

    currentLength: number = -1;
    currentMax: number = -1;

    widthUnit: number = -1;
    heightUnit: number = -1;
    canvasWidth: number = -1;
    canvasHeight: number = -1;

    updateStack: any[];

    READER_HEIGHT: number = 15;

    lastRead: number = 0;

    constructor(counterCanvas: HTMLElement, posCanvas: HTMLElement, readerCanvas: HTMLElement, delaySlider: HTMLInputElement) {
        this.counterCanvas = counterCanvas;
        this.posCanvas = posCanvas;
        this.readerCanvas = readerCanvas;
        this.delaySlider = delaySlider;

        this.updateStack = [];

        readerCanvas.setAttribute("height", String(this.READER_HEIGHT));
        window.addEventListener('resize', () => { this.resizeDisplay() }, true);
    }

    public setArrayData(length: number, max: number): void {
        this.currentLength = length;
        this.currentMax = max;
        this.resizeDisplay();
    }

    private resizeDisplay(): void {
        // calculate new dimensions
        this.canvasWidth = Math.floor(Config.canvasWidthPercent * document.documentElement.clientWidth);
        this.canvasHeight = Math.floor(Config.canvasHeightPercent * document.documentElement.clientHeight);

        // resize internal width/height units
        this.widthUnit = Math.floor(this.canvasWidth / this.currentLength);
        this.heightUnit = Math.floor(this.canvasHeight / this.currentMax);

        // set css variables
        document.documentElement.style.setProperty('--widthUnit', String(this.widthUnit) + "px");
        document.documentElement.style.setProperty('--heightUnit', String(this.heightUnit) + "px");
        document.documentElement.style.setProperty('--canvasHeight', String(this.canvasHeight) + "px");

        // resize canvas dimensions
        this.posCanvas.setAttribute("width", `${this.canvasWidth}px`);
        this.posCanvas.setAttribute("height", `${this.canvasHeight}px`);
        this.counterCanvas.setAttribute("width", `${this.canvasWidth}px`);
        this.readerCanvas.setAttribute("width", `${this.canvasWidth}px`);
    }


    private setCounter(swaps: number, comparisons: number): void {
        this.counterCanvas.innerHTML = `
        <text x="20" y="35" style="color:${Config.colors.textColor}">
        Swaps      : ${swaps}
        <br>
        Comparisons: ${comparisons}
        </text>`
    }

    private setPositions(arr: number[]): void { // todo: fix all array<number> to number<> and the likes
        let newInnerHTML: string = ""
        for (var i = 0; i < arr.length; i++) {
            newInnerHTML += `
                <rect
                style="
                height: calc(${arr[i]} * var(--heightUnit));
                x: calc(${i} * var(--widthUnit));
                y: calc(var(--canvasHeight) - ${arr[i]} * var(--heightUnit));
                "
                class="default">
                </rect>`;
            // newInnerHTML += `
            //     <rect
            //     height="calc(${arr[i]} * var(--heightUnit))"
            //     x="calc(${i} * var(--widthUnit))"
            //     y="calc(${this.canvasHeight} - ${arr[i]} * var(--heightUnit))"
            //     class="default">
            //     </rect>`;
            // newInnerHTML += `
            //     <rect
            //     width="${this.widthUnit}vw"
            //     height="${height}vh"
            //     x="${i * this.widthUnit * (15 / 16)}vw"
            //     y="${100 * Config.canvasHeightPercent - height}vh"
            //     class="default">
            //     </rect>
            // `; // would be nice to figure out how to get styling working by CSS classes such as rect.default, rect.comparing, rect.swaping but need to figure out how to dynamically change colors that way

        }
        this.posCanvas.innerHTML = newInnerHTML;
    }

    private setColor(ix: number, color: string): void {
        let x = this.posCanvas.children[ix];
        x.setAttribute("style", `fill:${color}`);
    }

    private setClass(ix: number, className: string): void {
        let x = this.posCanvas.children[ix];
        x.setAttribute("class", className);
    }

    private setReader(ix: number): void {
        let height = this.READER_HEIGHT;
        let width = this.widthUnit;
        let xOffset: number = ix * width;

        // bottom left, top mid, bottom right
        this.readerCanvas.innerHTML = `<polygon
        points='
            ${xOffset},${height}
            ${xOffset + width / 2},0
            ${xOffset + width},${height}'
        style="fill: ${Config.colors.readerColor}"
        ></polygon>`;

        this.lastRead = ix;
    }

    public pushCounterUpdate(tArr: TrackableArray): void {
        this.updateStack.push({
            type: UpdateType.COUNTER,
            swaps: tArr.swaps,
            comparisons: tArr.comparisons
        });
    };

    public pushPositionUpdate(tArr: TrackableArray): void {
        if (!tArr.isAux) {
            this.updateStack.push({
                type: UpdateType.POSITION,
                arr: Util.copyOf(tArr.arr)
            });
        }
    };

    public pushReaderUpdate(ix: number, highlightColor?: string): void {
        this.updateStack.push({
            type: UpdateType.READER,
            index: ix,
            highlightColor: highlightColor,
        })
    }

    public pushColorUpdate(ix: number, color: string): void {
        this.updateStack.push({
            type: UpdateType.COLOR,
            index: ix,
            newColor: color
        })
    }

    public pushClassUpdate(ix: number, className: string): void {
        this.updateStack.push({
            type: UpdateType.CLASS,
            index: ix,
            newClassName: className
        })
    }

    public pushBuffer(): void {
        this.updateStack.push({
            type: UpdateType.BUFFER,
        })
    }


    public display(): void {
        this.displayNext();
    }

    /** recursive loop that uses async to render all pre-calculated changes  */
    private displayNext(): void {
        let update = this.updateStack.shift(); // FIFO queue
        if (update != undefined) {
            switch (update.type) { // TODO: doing this as dicts is hacky but would be better to do as some type of custom object UpdateClass with several subclasses for each type of update
                // frame updates are encoded via this UpdateType mechanism earlier, but actual manipulation of elements is executed on runtime
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
                    this.setReader(update.index);
                    this.displayNext();
                    break;
                case UpdateType.COLOR: // change color of bars
                    this.setColor(update.index, update.newColor);
                    this.displayNext();
                    break;
                case UpdateType.CLASS:
                    this.setClass(update.index, update.newClassName);
                    this.displayNext();
                    break;
                case UpdateType.BUFFER:
                    setTimeout(() => { this.displayNext() }, 256 - parseFloat(this.delaySlider.value)); // when a buffer is hit, wait for a period specified by the slider, then display the next visual updates
                    break;
            }
        }
    }
}
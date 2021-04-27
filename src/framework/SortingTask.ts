import { TrackableArray } from "./TrackableArray";
import { ArrayDrawer } from "./ArrayDrawer";
import { Util } from "../Utility/Util";
export class SortingTask {
    tArr: TrackableArray;
    auxiliaryArrs: Array<TrackableArray>;
    // TODO: add constant space register storage with separate display
    drawer: ArrayDrawer;

    // swaps: number;
    // comparisons: number;

    constructor(array: Array<number>, drawer: ArrayDrawer) {
        this.drawer = drawer;
        this.drawer.setArrayData(array.length, Util.max(array));

        this.tArr = new TrackableArray(array, this.drawer, false);
        this.auxiliaryArrs = new Array<TrackableArray>();
    }

    public generateNewAuxArr(): TrackableArray {
        this.auxiliaryArrs.push(new TrackableArray([], this.drawer, true));
        return this.auxiliaryArrs[this.auxiliaryArrs.length - 1];
    }

    // getData(): any { };

    /** sets array to randomized order */
    public randomize(): void {
        let cutoff: number = 0;

        while (cutoff < this.tArr.arr.length) {
            let randIx: number = cutoff + Math.trunc(Math.random() * (this.tArr.arr.length - cutoff));
            let temp: number = this.tArr.arr[cutoff];
            this.tArr.arr[cutoff] = this.tArr.arr[randIx];
            this.tArr.arr[randIx] = temp;
            cutoff++
        }

    }

    // updateCanvas(): void {
    //     // this.canvas.innerHTML = "";
    //     // this.updatePositions();
    //     // this.updateCounters();
    //     this.canvas.innerHTML += ".\n"
    // }

    // updateCounters(): void {

    //     let auxAcsesses: number = 0;
    //     let auxModifications: number = 0;

    //     for (const arr of this.auxiliaryArrs) {
    //         auxAcsesses += arr.acsesses;
    //         auxModifications += arr.modifications;
    //     }

    //     this.canvas.innerHTML += `<text x="20" y="35">
    //     Acsesses     : ${this.tArr.acsesses}
    //     Modifications: ${this.tArr.modifications}
    //     Aux Acs's    : ${auxAcsesses}
    //     Aux Mod's    : ${auxModifications}  
    //     </text>`
    // };

    // updatePositions(): void {
    //     for (var i = 0; i < this.tArr.arr.length; i++) {
    //         let height: number = this.tArr.arr[i] * this.cHeightUnit;
    //         this.canvas.innerHTML += `<rect
    //         width="${this.cWidthUnit}"
    //         height="${height}"
    //         x="${i * this.cWidthUnit}"
    //         y="${Number(this.canvas.getAttribute("height")) - height}"></rect>`;
    //     }

    // };
}
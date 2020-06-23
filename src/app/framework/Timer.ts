import { TreeUtil } from "./TreeUtil";

export class Timer {

    static sleep(delay: number) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay) {
        };
    }
}
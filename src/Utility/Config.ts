export class Config {
    static white: string = "#E2E8F0";

    static colors: any = {
        barColor: Config.white, // default color for array element repersentations
        barSwapHighlight: "#37D7FF", // hightlight color durring element swaps
        barCompareHighlight: "#D787FF", // hightlight color durring element swaps
        barCheckHighlight: "#9AE6B4", // highlight color for correctly placed element in checking
        barErrorHighlight: "#FEB2B2", // highlight color for incorrectly placed element in checking

        writerColor: "#90cdf4",
        readerColor: "#FFA5FF",

        textColor: Config.white,
    };

    static canvasWidthPercent = 0.6;
    static canvasHeightPercent = 0.6;
}
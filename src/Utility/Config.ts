export class Config {
    private static white: string = "#E2E8F0";

    static colors: any = {
        barDefaultColor: Config.white, // default color for array element repersentations
        barSwapColor: "#37D7FF", // color durring element swaps
        barCompareColor: "#D787FF", // color durring element swaps
        barSetColor: "#37D7FF", // color durring element value retreival
        barGetColor: "#D787FF", // color durring element value modification
        barCorrectColor: "#9AE6B4", // color for correctly placed element in validation
        barIncorrecColor: "#FEB2B2", // color for incorrectly placed element in validation

        readerColor: "#FFA564", // color of the moving head triangle

        textColor: Config.white,
    };

    static canvasWidthPercent = 0.5;
    static canvasHeightPercent = 0.6;

    static init() {
        document.documentElement.style.setProperty('--textColor', Config.colors.textColor);
        document.documentElement.style.setProperty('--barDefaultColor', Config.colors.barDefaultColor);
        document.documentElement.style.setProperty('--barSwapColor', Config.colors.barSwapColor);
        document.documentElement.style.setProperty('--barCompareColor', Config.colors.barCompareColor);
        document.documentElement.style.setProperty('--barSetColor', Config.colors.barSwapColor);
        document.documentElement.style.setProperty('--barGetColor', Config.colors.barCompareColor);
        document.documentElement.style.setProperty('--barCorrectColor', Config.colors.barCorrectColor);
        document.documentElement.style.setProperty('--barIncorrecColor', Config.colors.barIncorrecColor);
    }
} 
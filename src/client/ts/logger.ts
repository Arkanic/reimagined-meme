/**
 * Logging system. Normally only one is needed
 */
export default class Logger {
    color:string;
    name:string

    constructor(name:string, color:string) {
        this.name = name;
        this.color = color;
    }

    /**
     * Log a message
     * 
     * @param message The message
     */
    log(message:string):void {
        console.log("[%c" + this.name + "%c]: " + message, "color:" + this.color + "; font-weight:bold", ""); // can't use `` style strings because it doesn't work with console.log
    }

    /**
     * Log an error
     * 
     * @param message The error
     */
    error(message:string):void {
        console.log("[%c" + this.name + "%c]: %c" + message, "color:" + this.color + "; font-weight:bold", "", "color:red; font-weight:bold;"); // can't use `` style strings because it doesn't work with console.log
    }
}
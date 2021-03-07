export function handleGameUpdate(update:any):void {
    document.getElementById("test")!.innerHTML = JSON.stringify(update);
}
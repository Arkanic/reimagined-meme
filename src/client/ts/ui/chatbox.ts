import {nanoid} from "nanoid";

let chatbox:HTMLElement = document.getElementById("chat")!;
let anchor:HTMLElement = document.getElementById("chat-anchor")!;

export function createMessage(content:string):string {
    let container:HTMLElement = document.createElement("div");
    container.classList.add("chat-message");
    container.id = nanoid();

    let text:HTMLElement = document.createElement("p");
    text.innerHTML = content; // html supported

    container.appendChild(text);
    chatbox.insertBefore(container, anchor);

    return container.id;
}

export function editMessage(id:string, content:string):boolean {
    let temp:HTMLElement | null = document.getElementById(id);
    let container:HTMLElement;
    if(!temp) return false;
    else container = temp!;

    container.firstElementChild!.innerHTML = content;
    return true;
}

export function deleteMessage(id:string):void {
    document.getElementById(id)?.remove();
}
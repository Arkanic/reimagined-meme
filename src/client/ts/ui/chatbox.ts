import {nanoid} from "nanoid";

export function createMessage(content:string):string {
    let container:HTMLElement = document.createElement("div");
    container.classList.add("chat-message");
    container.id = nanoid();

    let text:HTMLElement = document.createElement("p");
    text.innerHTML = content; // html supported

    container.appendChild(text);
    document.getElementById("chat")!.appendChild(container);

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
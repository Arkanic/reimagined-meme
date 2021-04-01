import {nanoid} from "nanoid";
import * as networking from "../networking";

let chatbox:HTMLElement = document.getElementById("chat-messages")!;
let inputbox:HTMLInputElement = <HTMLInputElement>document.getElementById("chat-text-input")!;

inputbox.addEventListener("keydown", e => {
    if(!(e.keyCode == 13)) return;
    networking.sendMessage({message:inputbox.value});
    inputbox.value = "";
});

function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}

setInterval(scrollToBottom, 500);

export function createMessage(content:string):string {
    let container:HTMLElement = document.createElement("div");
    container.classList.add("chat-message");
    container.id = nanoid();

    let text:HTMLElement = document.createElement("p");
    text.innerHTML = content; // html supported

    container.appendChild(text);
    chatbox.appendChild(container);

    scrollToBottom();

    return container.id;
}

export function editMessage(id:string, content:string):boolean {
    let temp:HTMLElement|null = document.getElementById(id);
    let container:HTMLElement;
    if(!temp) return false;
    else container = temp!;

    container.firstElementChild!.innerHTML = content;
    return true;
}

export function deleteMessage(id:string):void {
    document.getElementById(id)?.remove();
    
    scrollToBottom();
}

export function colorMessage(message:string, color:string):string {
    return `<p style="color: ${color};">${message}</p>`;
}
import {nanoid} from "nanoid";
import * as networking from "../networking";

let chatbox:HTMLElement = document.getElementById("chat-messages")!;
let inputbox:HTMLInputElement = <HTMLInputElement>document.getElementById("chat-text-input")!;

inputbox.addEventListener("keydown", e => {
    if(!(e.keyCode == 13)) return;
    networking.sendMessage({message:inputbox.value});
    inputbox.value = "";
});

/**
 * Scroll to the bottom of the chatbox
 */
function scrollToBottom() {
    chatbox.scrollTop = chatbox.scrollHeight;
}

setInterval(scrollToBottom, 500);

/**
 * Create a chat message
 * 
 * @param content The message content
 * 
 * @returns The id of the message container
 */
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

/**
 * Edit a chat message
 * 
 * @param id The DOM id of the message
 * @param content The new content
 * 
 * @returns success?
 */
export function editMessage(id:string, content:string):boolean {
    let temp:HTMLElement|null = document.getElementById(id);
    let container:HTMLElement;
    if(!temp) return false;
    else container = temp!;

    container.firstElementChild!.innerHTML = content;
    return true;
}

/**
 * Deleta a chat message
 * 
 * @param id The DOM id of the message
 */
export function deleteMessage(id:string):void {
    document.getElementById(id)?.remove();
    
    scrollToBottom();
}

/**
 * Colour a message
 * 
 * @param message The message
 * @param color The colour of the message. works for CSS rgb, hex, and default colours.
 * 
 * @returns The result in the form of a HTML string
 */
export function colorMessage(message:string, color:string):string {
    return `<p style="color: ${color};">${message}</p>`;
}
function terminalAppend(string) {
    try {
        let terminal = document.getElementById("terminal-text")
        let term_anchor = document.getElementById("term-anchor")

        let msg = document.createElement("div");
        msg.className = "inserted-content";
        msg.innerText = string;

        terminal.insertBefore(msg, term_anchor);
    } catch (e) { }
}

function terminalReplace(string) {
    let terminal = document.getElementById("terminal-text")
    let msg = document.createElement("div");

    msg.className = "inserted-content";
    msg.innerText = string;

    terminal.replaceChild(msg, terminal.childNodes[terminal.childNodes.length - 3])
    console.log("Has replaced")
}

function consoleLog(string) {
    console.log(string);
    terminalAppend(string);
}

function testTerminalChange(e) {
    var key = e.keyCode;

    // If the user has pressed enter
    if (key === 13) {
        let command = document.getElementById("terminal-textarea").value;
        window.__TAURI__.invoke('send_terminal', { input: command })
        setTimeout(() => {
            document.getElementById("terminal-textarea").value = "";
        }, 10);
    }
}

window.__TAURI__.event.listen('terminal_out', (event) => {
    terminalAppend(event.payload);
})

window.__TAURI__.event.listen('terminal_out_replace', (event) => {
    terminalReplace(event.payload);
})

document.getElementById("terminal-textarea").addEventListener('keypress', (e) => {testTerminalChange(e)})

export {consoleLog, terminalAppend, testTerminalChange}
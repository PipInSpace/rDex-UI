var terminalActive = false;
// Is terminal capturing user input

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
    var te_ar = document.getElementById("terminal-textarea");
    console.log("Pressed " + key)

    // If the user has pressed enter
    if (key === 13) {
        let command = te_ar.innerHTML;
        window.__TAURI__.invoke('send_terminal', { input: command })
        setTimeout(() => {
            te_ar.innerHTML = "";
        }, 2);
    }

    // User has pressed control C
    if (e.ctrlKey && key == 67) {
        console.log("Control C")
        window.__TAURI__.invoke('send_terminal', { input: "\x03" })
    }

    setTimeout(() => {
        let carpos = getCaretPosition(te_ar);
        let textlen = te_ar.innerHTML.length;
        console.log(carpos);
        console.log(textlen);
        console.log(textlen - carpos);
        te_ar.style.setProperty("--caret-pos", textlen-carpos);
    }, 4);
    
}

function getCaretPosition(editableDiv) {
    var caretPos = 0,
        sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

window.__TAURI__.event.listen('terminal_out', (event) => {
    terminalAppend(event.payload);
})

window.__TAURI__.event.listen('terminal_out_replace', (event) => {
    terminalReplace(event.payload);
})

document.getElementById("terminal-textarea").addEventListener('keydown', (e) => {testTerminalChange(e)});

// Click detection to enable selection
let startX;
let startY;
const delta = 6;

document.getElementById("terminal-view").addEventListener('mousedown', (e) => {
    startX = e.pageX;
    startY = e.pageY;
});

document.getElementById("terminal-view").addEventListener('mouseup', (e) => {
    const diffX = Math.abs(e.pageX - startX);
    const diffY = Math.abs(e.pageY - startY);

    if (diffX < delta && diffY < delta) {
        // Click!
        document.getElementById("terminal-textarea").focus();
        document.getElementById("terminal-textarea").classList.add("active");
        terminalActive = true;
        let carpos = getCaretPosition(document.getElementById("terminal-textarea"));
        let textlen = document.getElementById("terminal-textarea").innerHTML.length;
        console.log(carpos);
        console.log(textlen);
        console.log(textlen - carpos);
        document.getElementById("terminal-textarea").style.setProperty("--caret-pos", textlen - carpos);
    }
    
});

document.getElementById("terminal-textarea").addEventListener('focusout', (e) => {
    document.getElementById("terminal-textarea").classList.remove("active");
    terminalActive = false;
})

export {consoleLog, terminalAppend, testTerminalChange}
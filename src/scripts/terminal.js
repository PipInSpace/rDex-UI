var termFontSize = 15;

function terminalAppend(string) {
    term.write(string + "\n\r")
}

function terminalReplace(string) {
    //let terminal = document.getElementById("terminal-text")
    //let msg = document.createElement("div");

    //msg.className = "inserted-content";
    //msg.innerText = string;

    //terminal.replaceChild(msg, terminal.childNodes[terminal.childNodes.length - 3])
    //console.log("Has replaced")
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

window.__TAURI__.event.listen('terminal_out', (event) => {
    terminalAppend(event.payload);
})

window.__TAURI__.event.listen('terminal_out_replace', (event) => {
    terminalReplace(event.payload);
})

let doCustomFilter = false;
import {Color} from './../node_modules/color/index.js'
let colorify;
if (doCustomFilter) {
    colorify = (base, target) => {
        //let newColor = color(base);
        //target = color(target);
        let newColor = new Color(base);

        //for (let i = 0; i < window.theme.terminal.colorFilter.length; i++) {
        //    if (window.theme.terminal.colorFilter[i].func === "mix") {
        //        newColor = newColor[window.theme.terminal.colorFilter[i].func](target, ...window.theme.terminal.colorFilter[i].arg);
        //    } else {
        //        newColor = newColor[window.theme.terminal.colorFilter[i].func](...window.theme.terminal.colorFilter[i].arg);
        //    }
        //}
        newColor = newColor["greyscale"](...window.theme.terminal.colorFilter[i].arg);
        return newColor.hex();
    };
} else {
    colorify = (base, target) => {
        return Color(base).grayscale().mix(Color(target), 0.3).hex();
    };
}

var fitAddon;
var ligaturesAddon;
var term;

function terminalInit() {
    var termCol = "#9caca1";
    var term = new Terminal({
        cols: 80,
        rows: 24,
        cursorBlink: true,
        cursorStyle: "block",
        allowTransparency: false,
        fontFamily: "Fira-Code",
        fontSize: 15,
        fontWeight: "normal",
        fontWeightBold: "bold",
        letterSpacing: 0,
        scrollback: 1500,
        allowProposedApi: true,
        theme: {
            foreground: colorify("#d3d7cf", termCol),
            background: "#020303",
            cursor: colorify("#d3d7cf", termCol),
            cursorAccent: colorify("#d3d7cf", termCol),
            selection: colorify("#d3d7cf", termCol),
            black: colorify("#2e3436", termCol),
            red: colorify("#cc0000", termCol),
            green: colorify("#4e9a06", termCol),
            yellow: colorify("#c4a000", termCol),
            blue: colorify("#3465a4", termCol),
            magenta: colorify("#75507b", termCol),
            cyan: colorify("#06989a", termCol),
            white: colorify("#d3d7cf", termCol),
            brightBlack: colorify("#555753", termCol),
            brightRed: colorify("#ef2929", termCol),
            brightGreen: colorify("#8ae234", termCol),
            brightYellow: colorify("#fce94f", termCol),
            brightBlue: colorify("#729fcf", termCol),
            brightMagenta: colorify("#ad7fa8", termCol),
            brightCyan: colorify("#34e2e2", termCol),
            brightWhite: colorify("#eeeeec", termCol)
        }
    });

    fitAddon = new FitAddon.FitAddon();
    ligaturesAddon = new LigaturesAddon.LigaturesAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebglAddon.WebglAddon());
    
    term.open(document.getElementById('terminal-text'));

    term.loadAddon(ligaturesAddon);
    return term;
}

function termFit(term) {
        let { cols, rows } = fitAddon.proposeDimensions();

        // Apply custom fixes based on screen ratio, see #302
        let w = screen.width;
        let h = screen.height;
        let x = 1;
        let y = 0;

        function gcd(a, b) {
            return (b == 0) ? a : gcd(b, a % b);
        }
        let d = gcd(w, h);

        if (d === 100) { y = 1; x = 3; }
        // if (d === 120) y = 1;
        if (d === 256) x = 2;

        if (termFontSize < 15) y = y - 1;

        cols = cols + x;
        rows = rows + y;

        if (term.cols !== cols || term.rows !== rows) {
            term.resize(cols, rows);
        }
}

document.addEventListener('DOMContentLoaded', function () {
    term = terminalInit();

    termFit(term);
    window.addEventListener('resize', function () {
        termFit(term);
    });
});

export {consoleLog, terminalAppend, testTerminalChange, term}
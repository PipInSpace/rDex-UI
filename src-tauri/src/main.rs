// Prevents additional console window on Windows in release, DO NOT REMOVE!!

use std::io::{BufRead, BufReader, Write, Read};
use std::process::{Command, Stdio};
use std::sync::mpsc::{channel, Receiver, Sender};
use std::thread;

use tauri::{State, Manager};

pub struct TerminalConnection(Sender<String>);

#[tauri::command]
fn send_terminal(input: String, term_input: State<'_, TerminalConnection>) {
    let term_input = term_input.0.clone();
    println!("{} send to terminal", input);
    term_input.send(input).unwrap();
}

fn terminal(rx: Receiver<String>, window: tauri::Window) {
    
    let mut cmd = Command::new("cmd")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to start shell process");

    let mut stdin = cmd.stdin.take().unwrap();
    let mut stdout = cmd.stdout.take().unwrap();
    let stderr = cmd.stderr.take().unwrap();
    //let stdout_reader = BufReader::new(stdout);
    let stderr_reader = BufReader::new(stderr);
    //let mut stdout_lines = stdout_reader.lines();
    let _stderr_lines = stderr_reader.lines();

    

    // Input thread
    thread::spawn(move || {
        loop {
            if let Ok(input) = rx.recv() {
                // Send input to the shell process
                // Needs newline char for execution
                stdin
                    .write_all((input + "\n").as_bytes())
                    .expect("Failed to write to shell process");
            }
        }
    });

    // Output loop
    let mut line: Vec<u8> = vec![];
    let mut lines: Vec<Vec<u8>> = vec![];
    let mut replace_line = false;

    loop {
        // Read and print output from the shell process

        let mut byte: [u8; 1] = [0]; 
        stdout.read(&mut byte).unwrap();
        let ch = byte[0] as char;

        if byte[0] != 0 {
            match ch {
                '\n' => {
                    println!("{}\\n", std::str::from_utf8(&line).unwrap());

                    lines.push(line.clone());

                    if line.len() != 0 {send(&line, replace_line, &window);}
                    //send(&line, replace_line, &window);
                    //if replace_line && line.as_bytes()[line.len() - 1] as char != '\r' {
                    //    window.emit("terminal_out_replace", &line).unwrap();
                    //} else {
                    //    window.emit("terminal_out", &line).unwrap();
                    //}
                    replace_line = false;

                    line = vec![];
                }
                '\r' => {
                    print!("{} \\r", std::str::from_utf8(&line).unwrap());

                    lines.push(line.clone());
                    send(&line, replace_line, &window);

                    replace_line = true;
                    line = vec![];
                }
                '\x1b' => {
                    // Escape char
                }
                _ => {
                    // print!("{} ", ch as u8);
                    line.push(ch as u8);
                }
            }
        }
    }
}

fn send(line: &[u8], replace: bool, window: &tauri::Window) {
    
    let line = std::str::from_utf8(line).unwrap();

    //println!("send {}", line);

    if replace {
        window.emit("terminal_out_replace", line).unwrap();
    } else {
        window.emit("terminal_out", line).unwrap();
    }
}


fn main() {
    let (tx, rx) = channel::<String>();

    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();

            thread::spawn(move || terminal(rx, main_window));

            Ok(())
        })
        .manage(TerminalConnection(tx))
        .invoke_handler(tauri::generate_handler![send_terminal,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

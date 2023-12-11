use std::io::{Write, Read};
use std::process::{Command, Stdio};
use std::sync::mpsc::Receiver;
use std::thread;

pub fn term(rx: Receiver<String>, window: tauri::Window) {
    
    // FIXME: Make spawned shell dynamic
    let mut cmd = Command::new("cmd")
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .expect("Failed to start shell process");

    let mut stdin = cmd.stdin.take().unwrap();
    let mut stdout = cmd.stdout.take().unwrap();
    //let stderr = cmd.stderr.take().unwrap();
    //let stdout_reader = BufReader::new(stdout);
    //let stderr_reader = BufReader::new(stderr);
    //let mut stdout_lines = stdout_reader.lines();
    //let _stderr_lines = stderr_reader.lines();

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
                    // New line. Send current line and exit replace mode
                    if let Ok(li) = std::str::from_utf8(&line) {
                        println!("{}\\n", li);
                    }

                    lines.push(line.clone());
                    if !(line.len() == 0 && replace_line) {send(&line, replace_line, &window);}
                    replace_line = false;

                    line = vec![];
                }
                '\r' => {
                    // Carret return. Send current line and enter replace mode
                    if let Ok(li) = std::str::from_utf8(&line) {
                        print!("{}\\r", li);
                    }

                    lines.push(line.clone());
                    send(&line, replace_line, &window);
                    replace_line = true;

                    line = vec![];
                }
                '\x1b' => {
                    // Escape char
                    print!("ESC ")
                }
                _ => {
                    print!("{} ", ch as u8);
                    line.push(ch as u8);
                }
            }
        }
    }
}

fn send(line: &[u8], replace: bool, window: &tauri::Window) {
    
    if let Ok(li) = std::str::from_utf8(line) {

        if replace {
            window.emit("terminal_out_replace", li).unwrap();
        } else {
            window.emit("terminal_out", li).unwrap();
        }
    }
}
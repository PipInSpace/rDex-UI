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
                println!("in: {:?}", (input).as_bytes());
                stdin
                    .write_all((input).as_bytes())
                    .expect("Failed to write to shell process");
            }
        }
    });

    // Output loop
    let mut line: Vec<u8> = vec![];
    let mut last_send = std::time::Instant::now();

    loop {
        // Read and print output from the shell process

        let mut byte_buffer: [u8; 1024] = [0; 1024]; 

        if let Ok(buffer_len) = stdout.read(&mut byte_buffer) {
            //println!("Send {}", ch);
            for b in 0..buffer_len {
                line.push(byte_buffer[b]);
            }
        }
        if last_send.elapsed().as_micros() > 100 && line.len() > 0 {
            if let Ok(li) = std::str::from_utf8(&line) {
                println!("out: {:?}", line);
                window.emit("terminal_out", li).unwrap();
                line.clear();
                last_send = std::time::Instant::now();
            } else {
                println!("Failed to build string")
            }
        }
        thread::sleep(std::time::Duration::from_micros(10));
    }
}
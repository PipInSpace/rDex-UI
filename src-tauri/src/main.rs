// Prevents additional console window on Windows in release, DO NOT REMOVE!! lol nah

mod terminal;

use std::sync::mpsc::{channel, Sender};
use std::thread;

use tauri::{State, Manager};

// Stores the mpsc channel sender to the terminal thread
pub struct TerminalConnection(Sender<String>);

#[tauri::command]
// Javascript command to send terminal input
fn send_terminal(input: String, term_input: State<'_, TerminalConnection>) {
    term_input.0.send(input).unwrap();
}


fn main() {
    let (tx, rx) = channel::<String>();

    tauri::Builder::default()
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();

            // Start terminal thread
            thread::spawn(move || terminal::term(rx, main_window));

            Ok(())
        })
        .manage(TerminalConnection(tx))
        .invoke_handler(tauri::generate_handler![send_terminal,])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

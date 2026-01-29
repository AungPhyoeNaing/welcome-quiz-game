# How Well Do You Know Each Other? - Quiz Game

A two-player online quiz game to test how well you know your friend or partner!

## Project Structure
- `server`: Node.js + Express + Socket.io backend.
- `client`: React + Vite frontend.

## How to Run

### 1. Start the Server
Open a terminal in the root directory and run:
```bash
cd server
npm start
```
The server will run on `http://localhost:3001`.

### 2. Start the Client
Open a **new** terminal in the root directory and run:
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173`.

### 3. Play the Game (Local & LAN)
1. **Localhost (Same PC):** Open `http://localhost:5173` in two browser windows.
2. **Two Laptops (LAN):**
   - Find the IP address of the computer running the server (e.g., `192.168.1.5`).
   - On the second laptop, access `http://192.168.1.5:5173`.
   - Ensure both devices are on the same Wi-Fi.
   - **Note:** You might need to allow Node.js through your firewall.

### 4. Gameplay Steps
1. Enter a name and the **same** Room ID (e.g., "room1") in both windows.
2. Click "Start Game".
4. Both players select 10 questions and answer them truthfully about themselves.
5. Once both submit, the quiz begins! Try to guess your opponent's answers.
6. See who knows whom better!

## Features
- **90 Hardcoded Questions**: Random selection of 30 per session.
- **Real-time Interaction**: Uses Socket.io for instant updates.
- **Cute UI**: Cloud/Sky themed design.
- **Score Calculation**: Automatically scores based on how many you got right about your partner.

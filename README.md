# Pickups
A web app that helps local people to find near pickup games, organize events, and connect with players.

## Project Overview
PICKUP is a web application designed to make finding and organizing casual sports games easier. Players can browse available events, create their own games, join other players, and communicate through event-specific chats.

The platform aims to reduce the difficulty of coordinating informal sports by bringing event discovery, player profiles, and communication together in one place.

### Key Features
1.Event Discovery: Browse and filter available pickup sports events to find games that match your interests.
2.Event Creation: Create new events and share game details with other players.
3.Event Participation: View event details and join games with other participants.
4.Real-Time Event Chat: Communicate with other players through event-specific chat rooms.
5.layer Profiles: Create a personal profile and view other players' profiles.
6.Player Ratings: Rate other players to support community interaction and accountability.
7.QR Code Sharing: Generate QR codes to make sharing events and accessing them easier.
8.User Authentication: Create an account and log in using Firebase Authentication..

### Slides for the pitch
Google slide: [https://docs.google.com/presentation/d/13NTIrkqaSQKT-TUSahjI9H6zHFcMCMAf4r6SGu20WH8/edit?usp=sharing]

### Pages
| File | Description |
|---|---|
| `html/index.html` | Home feed |
| `html/explore.html` | Browse & filter events |
| `html/create.html` | Create a new event |
| `html/event.html?id=XXX` | Event detail + join + chat |
| `html/chat.html?id=XXX` | Event chat |
| `html/profile.html` | Your profile |
| `html/player.html?id=XXX` | View another player + rate |
| `html/qr.html` | QR codes for sharing |
| `html/login.html` | Log in |
| `html/signup.html` | Sign up |

---
### Tech Stack
・HTML- structure and content of the web application.
・CSS-Styleing and responsive interface design.
・JacaScript-Cleint-side functionality and application logic.
・Firebase Authentication-User registration and login.
・Clound Firestore-Database for player profiles,events, messages, and ratings.
・qrcode.js-ORcode generation.
・GitHub Pages-web hosting.

## Getting Started
### Prerequisite 
・A modern web browser
・A GitHub account to host the application
・A Firebase project with Authntication and Clound Firestore enabled.

## Setup (one-time, ~10 minutes)
### 1. Firebase config
Open `js/firebase-config.js` and replace the placeholder values with your real Firebase project settings.

Find them at: **Firebase Console → Your Project → Project Settings → General → Your apps → Web app → Config**

```js
const firebaseConfig = {
  apiKey:            "AIza...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123...:web:abc..."
};
```

### 2. Enable Firebase services
In the Firebase Console, enable:
- **Authentication → Sign-in method → Email/Password** ✓
- **Firestore Database** (start in test mode for development) ✓

### 3. Add Firestore security rules
In **Firestore → Rules**, paste:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /players/{uid} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == uid;
    }
    match /events/{eventId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update: if request.auth != null;
    }
    match /events/{eventId}/messages/{msgId} {
      allow read, write: if request.auth != null;
    }
    match /ratings/{ratingId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. Deploy to GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages**
3. Set source to **main branch / root**
4. Your app will be live at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

> **Note:** Update the QR code URLs in `qr.html` if your GitHub Pages URL differs from `location.origin`.

---

## Project structure
```
pickup-js/
├── index.html          Home
├── explore.html        Explore events
├── create.html         Create event
├── event.html          Event detail
├── chat.html           Event chat
├── profile.html        Your profile
├── player.html         Another player's profile
├── qr.html             QR codes
├── login.html          Login
├── signup.html         Signup
├── css/
│   └── styles.css      Shared styles
└── js/
    ├── firebase-config.js   ← FILL THIS IN
    └── app.js               Shared utilities
```

## Project Owner
Yuzuki Sato - [good.future.to.2030@gmail.com]

## Version History
Version 1.0 -Initial web application implementation with event discovery, event creation, player profiles, chat authntication, and QR code sharing.
This project is licensed under the MIT License - see the LICENSE.md file for details

## License
This project is licensed underthe MIT license. See LICENCE.md for details.

## Acknowledgments
・Firebase
・GitHub Pages
・qrcode.js




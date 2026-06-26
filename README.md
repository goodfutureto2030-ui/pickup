# PICKUP 🏅
**Find pickup sports near campus — now as a static web app hosted on GitHub Pages.**

## Pages
| File | Route |
|---|---|
| `index.html` | Home feed |
| `explore.html` | Browse & filter events |
| `create.html` | Create a new event |
| `event.html?id=XXX` | Event detail + join + chat |
| `chat.html?id=XXX` | Event chat |
| `profile.html` | Your profile |
| `player.html?id=XXX` | View another player + rate |
| `qr.html` | QR codes for sharing |
| `login.html` | Log in |
| `signup.html` | Sign up |

---

## Setup (one-time, ~10 minutes)

### 1. Add your Firebase config
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

## Tech used
- **Firebase Auth** — user login/signup
- **Cloud Firestore** — real-time database (replaces Java backend)
- **qrcode.js** — QR code generation (replaces Java ZXing library)
- Pure HTML + CSS + Vanilla JS — no build step needed
- Hosted on **GitHub Pages** — 100% free

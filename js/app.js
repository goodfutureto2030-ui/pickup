const SPORTS = [
  { name: 'Basketball', emoji: '🏀' },
  { name: 'Soccer',     emoji: '⚽' },
  { name: 'Volleyball', emoji: '🏐' },
  { name: 'Tennis',     emoji: '🎾' },
  { name: 'Baseball',   emoji: '⚾' },
  { name: 'Football',   emoji: '🏈' },
  { name: 'Badminton',  emoji: '🏸' },
  { name: 'Frisbee',    emoji: '🥏' },
  { name: 'Hockey',     emoji: '🏒' },
  { name: 'Ping Pong',  emoji: '🏓' },
];
const SKILL_LEVELS = ['All Welcome', 'Beginner', 'Intermediate', 'Advanced', 'Competitive'];
const GRADES  = ['8', '9', '10', '11', '12', 'University'];
const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

function sportEmoji(name) {
  const s = SPORTS.find(x => x.name === name);
  return s ? s.emoji : '🏅';
}
function formatDateTime(isoString) {
  if (!isoString) return '';
  return new Date(isoString).toLocaleString('en-US', { month:'short', day:'numeric', hour:'numeric', minute:'2-digit', hour12:true });
}
function trustBadge(score) {
  if (score >= 91) return '👑';
  if (score >= 71) return '🟣';
  if (score >= 41) return '🔵';
  if (score >= 21) return '⭐';
  return '🌱';
}
function trustLabel(score) {
  if (score >= 91) return 'Legend';
  if (score >= 71) return 'Veteran';
  if (score >= 41) return 'Trusted';
  if (score >= 21) return 'Rising';
  return 'Newcomer';
}
function trustLevel(score) {
  if (score >= 91) return 5;
  if (score >= 71) return 4;
  if (score >= 41) return 3;
  if (score >= 21) return 2;
  return 1;
}
function showFlash(msg, type = 'success') {
  const el = document.getElementById('flash');
  if (!el) return;
  el.className = type === 'success' ? 'flash-success' : 'flash-error';
  el.textContent = msg;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 4000);
}
const NAV_ITEMS = [
  { label: 'Home',    href: 'index.html',   icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
  { label: 'Explore', href: 'explore.html', icon: '<circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/>' },
  { label: 'Create',  href: 'create.html',  icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>' },
  { label: 'QR Code', href: 'qr.html',      icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path stroke-linecap="round" d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3z"/>' },
  { label: 'Profile', href: 'profile.html', icon: '<path stroke-linecap="round" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>' },
];
function buildNav(activePage) {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;
  nav.innerHTML = NAV_ITEMS.map(item =>
    `<a href="${item.href}" class="nav-item${item.label === activePage ? ' active' : ''}">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">${item.icon}</svg>
      ${item.label}
    </a>`).join('');
}
async function getOrCreatePlayer(firebaseUser) {
  const snap = await db.collection('players').doc(firebaseUser.uid).get();
  if (snap.exists) return { id: snap.id, ...snap.data() };
  const name = firebaseUser.displayName || firebaseUser.email.split('@')[0];
  const player = { id: firebaseUser.uid, name, email: firebaseUser.email, grade: '', gender: '', school: '', avatar: '🏅', favoriteSports: [], trustScore: 50, eventsJoined: 0, eventsHosted: 0 };
  await db.collection('players').doc(firebaseUser.uid).set({ ...player, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
  return player;
}
async function getCurrentPlayer(uid) {
  const snap = await db.collection('players').doc(uid).get();
  return snap.exists ? { id: snap.id, ...snap.data() } : null;
}
function requireAuth(callback) {
  auth.onAuthStateChanged(user => {
    if (!user) window.location.href = 'login.html';
    else callback(user);
  });
}
function eventCardHTML(event) {
  const pct   = Math.round(((event.joinedPlayerIds||[]).length / event.maxPlayers) * 100);
  const spots = event.maxPlayers - (event.joinedPlayerIds||[]).length;
  const full  = spots <= 0;
  return `<div class="event-card" onclick="location.href='event.html?id=${event.id}'">
    <div class="event-card-header">
      <span class="sport-emoji">${sportEmoji(event.sport)}</span>
      <div style="flex:1">
        <div class="event-title">${event.title}</div>
        <div class="event-meta">📍 ${event.location}</div>
        <div class="event-meta">🕐 ${formatDateTime(event.dateTime)}</div>
      </div>
      <span class="badge ${full?'badge-gray':'badge-orange'}">${full?'Full':spots+' spots'}</span>
    </div>
    <div class="capacity-bar"><div class="capacity-fill ${full?'full':''}" style="width:${pct}%"></div></div>
    <div class="capacity-text"><span>${(event.joinedPlayerIds||[]).length}/${event.maxPlayers} players</span><span>${event.skillLevel}</span></div>
  </div>`;
}
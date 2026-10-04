# Dosho App — Screen-by-Screen Report

Two account types share one codebase: **Member** (man, pays for messages/calls/rooms) and **Creator** (woman, gets paid). Navigation is two custom 6-tab bars (no system TabView) — Member: Discover · Match · Rooms · Favorites · Messages · Account. Creator: Dashboard · Match · Rooms · Browse · Messages · Account. Dark theme throughout (near-black background, hot-pink accent).

---

## 0. App Shell

### SplashView
Shown only while restoring a saved session on launch. Dosho logo fades in over 0.6s while a soft radial pink glow behind it slowly breathes (scale 0.85→1.05, looping). Tagline "Private. Real. Intimate." No user interaction — it's a transition state, not a screen.

### WelcomeView
First thing an unauthenticated user sees. Full-bleed AI-generated hero portrait behind a bottom gradient scrim, logo, tagline, two buttons: "Continue with Email" → RoleSelectionView, "Sign In" → SignInView. Footer note: "You must be 18 or older."

---

## 1. Onboarding / Auth

### RoleSelectionView
"What are you?" — two tappable cards, Woman / Man (gender selection, which *is* the role: woman→creator, man→member). Selecting shows a "Continue" button → SignUpView.

### SignUpView
3-step wizard (step-dot indicator, slide transition between steps):
1. Username + Email
2. Password + Confirm Password
3. Country (via on-device location → reverse-geocode, with a manual picker fallback if location is denied) + Date of Birth, then "Create Account"

### SignInView
Email + password, "Forgot password?" link, "Sign In" button.

### ForgotPasswordView
Email field, "Send Reset Link" button, confirms "If that email exists, a reset link has been sent."

---

## 2. Member Tabs

### DiscoverView *(Tab 1)*
Grid of creator cards (2-column). Each `CreatorCard`: photo, name+age, verified badge, country flag, rate/min, a status badge that's one of **LIVE** (pulsing, red) / Engaged / Online, a heart (favorite) button, and — if free — a video-call quick-action button (becomes a waveform "join room" button when she's LIVE). Toolbar: sort menu (Online first / Hot / Rate ↑↓), notification bell (with unread badge), filter icon → PreferencesView (age-range slider). Tapping a card → CreatorProfileView.

### MatchView *(Tab 2)*
One big pink "MATCH" button — no browsing. States: idle → searching (spinner, "Finding someone available...") → matched (auto-pushes into VideoCallView) or no-one-available (shows how many creators are live in Rooms right now with a "Browse Rooms" link, plus "Try Again") → post-call summary (duration, coins spent, "Match Again"/"Done"). Filter icon → country/rate-range sheet.

### RoomsListView *(Tab 3)*
Feed of live Voice Rooms: host photo+LIVE marker, title, listener count, rate/min. Tapping a room joins it and opens VoiceRoomView full-screen. Pull-to-refresh.

### VoiceRoomView *(presented, not a tab)*
Live group audio room. Sections: Speakers, (host-only) Raised Hands, Listeners. Footer differs by role — listener sees "Raise Hand" + running coin cost; speaker sees a mic toggle; host sees mic toggle + "End Room". Auto-dismisses if the host ends it or the listener runs out of coins.

### FavoritesView *(Tab 4)*
Grid of favorited creator cards (same `CreatorCard` component as Discover), pulled from Discover's favorite-toggle state. Empty state if none yet.

### ConversationListView *(Tab 5, "Messages")*
List of conversations: photo (+ live/online dot), name (+ LIVE badge), last message preview, unread count badge. Tapping → ChatView.

### ChatView
Message thread. Composer shows the per-message coin cost in the placeholder. Header (tap → her profile) shows photo, name, verified badge, "LIVE now"/"Online" status. Trailing icon: video call (if free), disabled video-slash (if engaged in another call), or a waveform "join room" icon (if she's live).

### AccountView *(Tab 6)* — just redesigned
Profile photo (pink ring), @handle + verified badge, "Member" pill, bio. Tappable Following/Friends/Fans stats card. 4-tile primary row: Edit Profile, Wallet, Favorites, Visitors. 2-card row: Notifications (live unread badge), Settings. Grouped section: Privacy & Safety (→ Block List), Help Center (→ FAQ), Log Out. Version footer.

### WalletView
Balance display, "Buy Coins" → BuyCoinsView sheet, "Transaction History" → TransactionsView.

### BuyCoinsView
Grid of coin packages (coins, KES price, best-value badge). Select → "Buy" triggers Apple IAP via StoreKit.

### TransactionsView
Flat list of all wallet transactions (purchases, message/call/room charges, refunds), icon-coded by type.

### EditMemberProfileView
Photo picker, username, bio, gallery photo editor (up to 4).

### CreatorProfileView *(viewing a creator)*
Photo hero (LIVE badge overlay if hosting), name/age/rating/fan count, bio, message & video rate badges, Follow button, photo gallery. Action row: "Message" + one of "Join Room · LIVE" / disabled "Currently Engaged" / "Video Call". Polls her live/engaged state every 10s.

### VideoCallView
Full-screen video call. Screen-recording-blanked video tiles, top strip (duration, name, coins charged/rate), mute/camera/end-call controls that auto-hide after 4s of inactivity.

---

## 3. Creator Tabs

### CreatorDashboardView *(Tab 1, "Dashboard")*
Two stat tiles (Balance, Total Earnings), then a row list: Edit Profile, Manage Rates, Earnings, Transactions, Payouts, Verification.

### CreatorMatchView *(Tab 2)*
Status pill (Offline/Available/Engaged/**Live**), a live waiting-time counter while available, her own video rate shown read-only, Start/Stop Match toggle. Explains itself when unavailable ("You're hosting a Room, so Match is paused").

### RoomsListView *(Tab 3, same component as member's)*
Same live-rooms feed, plus a "+ Start a Room" entry point → CreateRoomView (title field, her rate shown read-only, "Go Live").

### BrowseMenView *(Tab 4, "Browse")*
Discover-equivalent for creators — grid of member cards, tap through to MemberProfileView, message for free (creators can't initiate calls).

### ConversationListView / ChatView *(Tab 5, same components as member's)*

### AccountView *(Tab 6)* — role-aware
Same layout as member's, but primary row is Edit Profile, Dashboard, Payouts, Visitors.

### CreatorProfileEditorView
Photo, display name, bio, online-status toggle, gallery editor.

### CreatorRatesView
Message-rate and video-rate steppers (10–30 coins), revenue-share note.

### CreatorEarningsView
Total earnings + a filtered list of only her creator-earning transactions.

### CreatorTransactionsView
Her full transaction ledger (earnings, room ticks, payouts, refunds).

### PayoutSettingsView
Balance, "N coins eligible for payout now" + a footnote naming the exact eligibility cutoff date, payout methods list (mpesa/paypal, pending-verification warning), a coin-amount request field (or "already requested this month"), payout history with status badges.

### IdentityVerificationView (3 steps)
1. Legal name, DOB, ID type, 18+ confirmation
2. ID photo upload
3. Selfie capture (in-app camera) → submit for review
Shows a status banner (pending/needs review/approved/rejected) at every visit.

### MemberProfileView *(viewing a member)*
Photo, name/age/flag/country, bio, Follow button, gallery. "Message" only — no call button.

---

## 4. Shared / Cross-Cutting Screens

### SettingsView
Toggles (push notifications, online-status visibility — currently local-only, not wired to backend), Report a Problem / Block List / Community Guidelines / Terms & Privacy / Help & FAQ, Sign Out, Delete Account (destructive, confirms).

### NotificationsView
Activity feed (currently: new-follow events). Tapping an entry opens that person's profile. Marks all read on open.

### SocialListView
Powers Following/Friends/Fans/Visitors from Account's stats row — own-account only, list of real profiles you can tap into.

### ProfileOptionsMenu
Three-dot menu on someone else's profile: Report (reason picker + optional details) or Block (confirm alert).

### FAQView *(just fixed — answers weren't expanding before)*
7-question accordion: Coins, Match, Rooms, why a call might be blocked, payout mechanics (dynamically states the live revenue-share %), blocking/reporting, account deletion.

### BlockListView
List of blocked user IDs with an "Unblock" action per row (currently shows raw IDs, no name/photo).

### WebPageView
In-app WKWebView wrapper for Community Guidelines / Privacy Policy / Support pages.

---

## Known rough edges — confirmed while writing this report

- **Favorites is currently non-functional.** There's no backend concept of a favorite at all — no model, no endpoint. `DiscoverView` keeps a `favoriteIds` set in memory on its own `DiscoverViewModel` instance; `FavoritesView` creates a **separate, brand-new** `DiscoverViewModel` with its own empty `favoriteIds`. So favoriting a creator in Discover never shows up in Favorites — the tab is permanently empty regardless of what you tap. This needs a real fix (a `Favorite` table + endpoints), not a quick patch. Want me to build it?
- **BlockListView** shows raw user IDs instead of names/photos — the blocking service only returns IDs today.
- **Settings' notification/online-status toggles** are local `@State` only — flipping them doesn't call any endpoint, so they don't persist or do anything server-side.

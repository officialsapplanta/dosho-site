# Gift animation sources

All 17 gift tiers use **Google's Noto Animated Emoji** set
(https://googlefonts.github.io/noto-emoji-animation/), licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — free for
commercial use, attribution required (credited as "Noto Emoji Animations by
Google" in the app's About/Credits screen).

This replaced an earlier approach of sourcing each gift from a different
individual LottieFiles creator: with 17 tiers reaching up to ~100,000 KES,
mixing many unrelated art styles made the gift shelf look like a grab-bag
instead of one designed set. Noto's set is maintained by one team in one
consistent glossy 3D style and covers nearly every tier we need directly.

Each file is the literal Lottie JSON for that Unicode emoji, downloaded from
`https://fonts.gstatic.com/s/e/notoemoji/latest/<codepoint>/lottie.json`.

| File | Emoji | Codepoint | Tier |
|---|---|---|---|
| heart.json | ❤️ Heart | 2764 | Heart |
| rose.json | 🌹 Rose | 1f339 | Rose |
| teddybear.json | 🐻 Bear face | 1f43b | Teddy Bear (no dedicated teddy-bear emoji is animated yet in this set; bear face substitutes) |
| confetti.json | 🎉 Party Popper | 1f389 | Confetti |
| cake.json | 🎂 Birthday Cake | 1f382 | Cake |
| giftbox.json | 🎁 Wrapped Gift | 1f381 | Gift Box |
| diamond.json | 💎 Gem Stone | 1f48e | Diamond |
| ring.json | 💍 Ring | 1f48d | Ring |
| crown.json | 👑 Crown | 1f451 | Crown |
| trophy.json | 🏆 Trophy | 1f3c6 | Trophy |
| rocket.json | 🚀 Rocket | 1f680 | Rocket |
| yacht.json | ⛵ Sailboat | 26f5 | Yacht |
| sportscar.json | 🚗 Automobile | 1f697 | Sports Car |
| privatejet.json | ✈️ Airplane | 2708 | Private Jet |
| mansion.json | 🏠 House | 1f3e0 | Mansion |
| island.json | 🌍 Globe Showing Europe-Africa | 1f30e | Private Island (no desert-island emoji is animated yet; globe substitutes) |
| galaxy.json | 🌌 Milky Way | 1f30c | Galaxy (top tier, ~100,000 KES) |

Coin costs and KES pricing are defined in `backend/src/config/giftCatalog.ts`
(source of truth) and mirrored in
`dosho_flutter/lib/features/gifts/gift_catalog.dart` (display only).

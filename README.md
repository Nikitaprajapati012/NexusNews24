# NEXUS NEWS 24 — Professional News Broadcasting Application

**Truth Unfiltered • 24/7 Global Stream**  
*React Native | TypeScript | 100% Frontend-Only | Offline-Ready Architecture*

---

## 📌 Project Overview

**Nexus News 24** is a newly developed, production-grade television news broadcasting application built from scratch for Android and iOS using **React Native CLI (0.88.1)**. 

The application is situated in its dedicated, isolated workspace:
```
/Users/nikita/Documents/Data/Nikita/Projects/NexusNews24
```
It does not touch, modify, or interfere with any other projects in the environment.

---

## ⚡ Architecture & Key Features

### 1. 100% Frontend-Only & Zero Server Dependency
- **Offline First:** All images, videos, articles, categories, and notifications are bundled locally within the application package.
- **No external network required:** Functions in airplane mode without remote APIs, Firebase, or external streaming servers.
- **Local Persistence:** Bookmarks, search query history, and theme settings are managed via `@react-native-async-storage/async-storage`.

### 2. Simulated 24/7 Live Television Broadcasting
- Continuous looping broadcast player simulating live television studio output.
- Dynamic lower-third graphics: Current bulletin, Anchor tag, Clock, and scrolling Breaking News marquee.
- Channel metadata with Live Viewer Counter (`2.4M Watching`), Ultra HD badge, and full audio/pause controls.
- Broadcast schedule featuring real-time "ON AIR" program status and upcoming line-ups.

### 3. Recorded News Video Clips
- Video catalog across Technology, Business, National, and Sports beats.
- Dedicated video player with interactive timeline scrub bar, play/pause controls, and volume toggles.
- Duration tags, view counters, and native sharing.

### 4. Vertical Short News Feed (Nexus Shorts ⚡)
- Full-screen vertical reels feed (9:16 aspect ratio).
- Auto-play on visible card, auto-pause on scroll.
- Interactive engagement overlay: Like counter toggle, Share, and Bookmark.

### 5. Breaking News Bulletin Center
- Urgent red alert identity with pulse indicator.
- Priority classification (`CRITICAL`, `HIGH`, `FLASH`).
- Instant shareable alerts.

### 6. Comprehensive Editorial Beats (12 Categories)
1. **National** (🇮🇳)
2. **International** (🌐)
3. **Gujarat** (🏛️)
4. **Ahmedabad** (🏙️)
5. **Politics** (⚖️)
6. **Business** (📈)
7. **Sports** (🏆)
8. **Entertainment** (🎬)
9. **Technology** (💻)
10. **Education** (📚)
11. **Health** (🩺)
12. **Lifestyle** (🌿)

### 7. Instant Offline Search
- Real-time client-side keyword and category search across all 30 bundled articles.
- Recent search tags with history management and clear cache action.

### 8. Theming Engine (Light & Dark Mode)
- Full application-wide support for deep navy dark mode and clean paper white light mode.
- System automatic preference syncing or manual toggle with persistent storage.

---

## 📱 Build & Installation Instructions

### Android Execution

```bash
# 1. Navigate to project root
cd /Users/nikita/Documents/Data/Nikita/Projects/NexusNews24

# 2. Build Debug APK
cd android && ./gradlew assembleDebug

# 3. Build Release Standalone APK
cd android && ./gradlew assembleRelease

# 4. Install onto emulator or connected device
adb -s <device_id> install -r app/build/outputs/apk/release/app-release.apk

# 5. Launch application
adb -s <device_id> shell am start -n com.nexusnews24/.MainActivity
```

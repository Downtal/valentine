<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LoveBox - Your Personal Love Journey

A beautiful love-themed web application with starry night features, heart animations, and photo memories.

## Setup & Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add your music file:
   - Place your music file as `public/music/LoveMyFriend.mp3`
   - Or update the path in `App.tsx` if using a different filename

3. Add your photos:
   - Place your photos in `public/img/` folder
   - Files should be named `(1).JPG`, `(2).jpg`, etc.
   - The StarField component randomly selects from these images

4. Run the app:
   ```bash
   npm run dev
   ```

## Deploy to Vercel

1. Push your code to GitHub
2. Connect your repo to Vercel
3. Deploy - all assets in `public/` folder will be automatically served
4. Make sure your music file is included in the `public/music/` folder

## Features

- 🔒 PIN-protected lock screen
- 🌟 Interactive starry night with clickable stars showing memories
- 💖 Beautiful heart animation
- 📊 Love statistics dashboard
- 🎵 Background music support
- 📱 Responsive design

## Important Notes

- All images and music files must be placed in the `public/` folder for deployment to work
- Image paths use `/img/filename.ext` format
- Music path uses `/music/filename.mp3` format
- Vercel automatically serves files from `public/` folder at root level

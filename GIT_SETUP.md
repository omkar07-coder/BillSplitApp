# Git Setup Guide - Connect to GitHub Repository

Complete guide to connect your BillSplit app to GitHub.

## 🔗 Repository URL
```
https://github.com/omkar07-coder/billsplit-.git
```

---

## 🚀 Quick Setup (First Time)

If you haven't initialized git yet, run these commands:

```bash
# 1. Initialize git repository
git init

# 2. Add all files to staging
git add .

# 3. Create initial commit
git commit -m "Initial commit: BillSplit app with all features"

# 4. Add remote repository
git remote add origin https://github.com/omkar07-coder/billsplit-.git

# 5. Push to GitHub (main branch)
git push -u origin main
```

---

## 🔄 If Repository Already Exists

If the repository already has content, you'll need to pull first:

```bash
# 1. Initialize git (if not already done)
git init

# 2. Add remote repository
git remote add origin https://github.com/omkar07-coder/billsplit-.git

# 3. Pull existing content
git pull origin main --allow-unrelated-histories

# 4. Add your files
git add .

# 5. Commit changes
git commit -m "Add BillSplit app features"

# 6. Push to GitHub
git push -u origin main
```

---

## 📝 Step-by-Step Instructions

### Step 1: Check Git Status

```bash
# Check if git is initialized
git status
```

**If you see**: "fatal: not a git repository"
- Run: `git init`

**If you see**: list of files
- Git is already initialized, proceed to next step

### Step 2: Check Remote Repository

```bash
# Check if remote is already added
git remote -v
```

**If empty**:
```bash
git remote add origin https://github.com/omkar07-coder/billsplit-.git
```

**If shows different URL**:
```bash
git remote set-url origin https://github.com/omkar07-coder/billsplit-.git
```

### Step 3: Add Files to Git

```bash
# Add all files
git add .

# Or add specific files
git add src/
git add package.json
git add README.md
```

### Step 4: Commit Changes

```bash
# Commit with descriptive message
git commit -m "Add BillSplit app with AsyncStorage, AI chat, and camera features"
```

### Step 5: Push to GitHub

```bash
# Push to main branch
git push -u origin main

# If main doesn't exist, try master
git push -u origin master
```

---

## 🔐 Authentication

### Using HTTPS (Recommended)

When you push, GitHub will ask for credentials:

**Username**: Your GitHub username
**Password**: Use a Personal Access Token (not your GitHub password)

#### Generate Personal Access Token:
1. Go to GitHub.com
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token
4. Select scopes: `repo` (full control)
5. Copy the token
6. Use it as password when pushing

### Using SSH (Alternative)

```bash
# Change remote to SSH
git remote set-url origin git@github.com:omkar07-coder/billsplit-.git

# Push
git push -u origin main
```

---

## 📂 Files to Commit

### ✅ Should Commit:
- `src/` - All source code
- `assets/` - Images and icons
- `package.json` - Dependencies
- `package-lock.json` - Locked versions
- `app.json` - Expo configuration
- `App.js` - Main app file
- `index.js` - Entry point
- `README.md` - Documentation
- All `.md` documentation files

### ❌ Should NOT Commit (Already in .gitignore):
- `node_modules/` - Dependencies (too large)
- `.expo/` - Expo cache
- `.env` - Environment variables (secrets)
- `src/config/keys.js` - API keys (if contains real keys)

---

## 🔍 Verify .gitignore

Make sure your `.gitignore` includes:

```
# Dependencies
node_modules/

# Expo
.expo/
dist/
web-build/

# Environment
.env
.env.local

# API Keys (if needed)
src/config/keys.js

# OS
.DS_Store
*.log
```

---

## 📤 Common Git Commands

### Daily Workflow

```bash
# 1. Check status
git status

# 2. Add changes
git add .

# 3. Commit
git commit -m "Your commit message"

# 4. Push to GitHub
git push
```

### Pull Latest Changes

```bash
# Pull from GitHub
git pull origin main
```

### Create New Branch

```bash
# Create and switch to new branch
git checkout -b feature/new-feature

# Push branch to GitHub
git push -u origin feature/new-feature
```

### View Commit History

```bash
# View commits
git log

# View commits (compact)
git log --oneline
```

---

## 🐛 Troubleshooting

### Issue: "fatal: remote origin already exists"

```bash
# Remove existing remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/omkar07-coder/billsplit-.git
```

### Issue: "failed to push some refs"

```bash
# Pull first, then push
git pull origin main --rebase
git push origin main
```

### Issue: "refusing to merge unrelated histories"

```bash
# Allow unrelated histories
git pull origin main --allow-unrelated-histories
```

### Issue: "Permission denied"

- Check your GitHub username
- Use Personal Access Token instead of password
- Or set up SSH keys

### Issue: "Large files"

```bash
# Remove large files from git
git rm --cached node_modules -r
git commit -m "Remove node_modules"
git push
```

---

## 📋 Recommended Commit Messages

### Good Examples:
```bash
git commit -m "Add AsyncStorage for groups and bills"
git commit -m "Fix camera permission handling"
git commit -m "Update HomeScreen UI with gradients"
git commit -m "Add AI chat with Groq API"
git commit -m "Create comprehensive documentation"
```

### Bad Examples:
```bash
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

---

## 🎯 Complete Setup Script

Copy and paste this entire script:

```bash
# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: BillSplit app

Features:
- AI-powered bill scanning with camera
- Smart expense splitting
- Group management with AsyncStorage
- AI chat assistant with Groq API
- Activity history tracking
- Premium fintech UI design
- Complete documentation"

# Add remote repository
git remote add origin https://github.com/omkar07-coder/billsplit-.git

# Push to GitHub
git push -u origin main
```

---

## 📊 After Pushing

### Verify on GitHub:
1. Go to: https://github.com/omkar07-coder/billsplit-
2. You should see all your files
3. README.md will be displayed on the main page

### Add Repository Description:
1. Go to repository settings
2. Add description: "Smart bill splitting app for college students with AI-powered features"
3. Add topics: `react-native`, `expo`, `bill-splitting`, `expense-tracker`, `ai-chat`

### Enable GitHub Pages (Optional):
1. Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: / (root)
4. Save

---

## 🔄 Keep Repository Updated

### Regular Updates:

```bash
# Every time you make changes:

# 1. Check what changed
git status

# 2. Add changes
git add .

# 3. Commit with message
git commit -m "Add new feature or fix bug"

# 4. Push to GitHub
git push
```

### Before Starting Work:

```bash
# Pull latest changes
git pull origin main
```

---

## 📱 Clone on Another Device

To work on another computer:

```bash
# Clone repository
git clone https://github.com/omkar07-coder/billsplit-.git

# Navigate to folder
cd billsplit-

# Install dependencies
npm install

# Start app
npm start
```

---

## ✅ Checklist

- [ ] Git initialized (`git init`)
- [ ] Remote added (`git remote add origin ...`)
- [ ] Files added (`git add .`)
- [ ] Initial commit created (`git commit -m "..."`)
- [ ] Pushed to GitHub (`git push -u origin main`)
- [ ] Verified on GitHub website
- [ ] .gitignore configured properly
- [ ] API keys not committed
- [ ] README.md visible on GitHub

---

**Your repository is now connected to GitHub!** 🎉

Repository URL: https://github.com/omkar07-coder/billsplit-

# Fix: Git Folder Locked Error

## Problem
The `.git` folder is locked because VS Code or another process is using it.

## Solution: Close VS Code Git Integration First

### Step 1: Close All Git-Related Processes

**Option A: Close VS Code Completely**
1. Save all your files
2. Close VS Code completely (File → Exit)
3. Open PowerShell in the project folder
4. Run the commands below

**Option B: Keep VS Code Open (Easier)**
Just run these commands - they will work even with the lock:

### Step 2: Use Alternative Git Reset Method

Instead of deleting `.git`, we'll reset it:

```powershell
# Navigate to your project
cd C:\app\bill_split\BillSplitApp

# Remove all git tracking (keeps folder)
git rm -r --cached .

# Remove all commits and history
git update-ref -d HEAD

# Now add files fresh
git add .

# Create new initial commit
git commit -m "Initial commit: BillSplit app - clean history"

# Force push to GitHub
git push -u origin master --force
```

### Step 3: If Above Doesn't Work, Try This

```powershell
# Stop any git processes
taskkill /F /IM git.exe 2>$null

# Wait 2 seconds
Start-Sleep -Seconds 2

# Now try removing .git folder again
Remove-Item -Recurse -Force .git

# Initialize fresh repo
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: BillSplit app"

# Add remote
git remote add origin https://github.com/omkar07-coder/billsplit-.git

# Force push
git push -u origin master --force
```

## Easiest Solution (Recommended)

Just run these 4 commands - they work without deleting `.git`:

```powershell
git rm -r --cached .
git add .
git commit -m "Initial commit: BillSplit app - clean history"
git push -u origin master --force
```

This removes all tracked files from git history and creates a fresh commit.

## If You Still Get API Key Error

If GitHub still blocks the push, it means the API key is in the current commit. Check:

```powershell
# View what's in the commit
git show HEAD:test-groq-api.js | Select-String "gsk_"
git show HEAD:src/config/keys.js | Select-String "gsk_"
```

If you see your API key, edit those files to use placeholders, then:

```powershell
git add .
git commit -m "Remove API keys"
git push -u origin master --force
```

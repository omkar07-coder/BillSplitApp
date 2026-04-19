# Deploy to GitHub - Step by Step Guide

## Problem
GitHub is blocking your push because it detected an API key in your git history (from previous commits). Even though you removed the API key from files, it still exists in old commits.

## Solution: Fresh Git Repository

Follow these steps exactly:

### Step 1: Remove Old Git History
```bash
Remove-Item -Recurse -Force .git
```

### Step 2: Initialize Fresh Repository
```bash
git init
```

### Step 3: Add All Files
```bash
git add .
```

### Step 4: Verify No Secrets (IMPORTANT!)
```bash
git status
```

Check that these files show placeholder values:
- `test-groq-api.js` → Should have `'your_groq_api_key_here'`
- `src/config/keys.js` → Should have `'your_groq_api_key_here'`

### Step 5: Create Initial Commit
```bash
git commit -m "Initial commit: BillSplit app"
```

### Step 6: Add Remote Repository
```bash
git remote add origin https://github.com/omkar07-coder/billsplit-.git
```

### Step 7: Force Push (This will overwrite GitHub repo)
```bash
git push -u origin master --force
```

## Important Notes

1. **This will DELETE all existing commits on GitHub** - The repository will start fresh
2. **Make sure you have your API key saved somewhere** - You'll need to add it back locally after pushing
3. **The `.gitignore` file will prevent future API key commits**

## After Successful Push

### Add Your API Key Back Locally

1. Open `src/config/keys.js`
2. Replace `'your_groq_api_key_here'` with your actual Groq API key
3. **DO NOT commit this change** - It's already in `.gitignore`

### Verify Git Ignores Your Key

```bash
git status
```

You should NOT see `src/config/keys.js` in the list of changed files.

## Troubleshooting

### If you still get "push declined" error:
- Make sure you removed the `.git` folder completely
- Verify placeholder values are in the files before committing
- Try using `--force` flag when pushing

### If you get "remote already exists" error:
```bash
git remote remove origin
git remote add origin https://github.com/omkar07-coder/billsplit-.git
```

### If you're on wrong branch:
```bash
git branch -M master
```

## Success!

Once pushed successfully, your code will be on GitHub without any API keys in the history.

Remember: Never commit real API keys to GitHub!

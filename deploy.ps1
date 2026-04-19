# BillSplit App - GitHub Deployment Script
# This script will reset git history and push to GitHub

Write-Host "🚀 BillSplit GitHub Deployment" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Remove old git history
Write-Host "Step 1: Removing old git history..." -ForegroundColor Yellow
if (Test-Path .git) {
    Remove-Item -Recurse -Force .git
    Write-Host "✅ Old git history removed" -ForegroundColor Green
} else {
    Write-Host "⚠️  No .git folder found (this is okay)" -ForegroundColor Yellow
}
Write-Host ""

# Step 2: Initialize fresh repository
Write-Host "Step 2: Initializing fresh git repository..." -ForegroundColor Yellow
git init
Write-Host "✅ Git repository initialized" -ForegroundColor Green
Write-Host ""

# Step 3: Add all files
Write-Host "Step 3: Adding all files..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green
Write-Host ""

# Step 4: Verify no secrets
Write-Host "Step 4: Verifying no secrets in files..." -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANT: Check these files have placeholder values:" -ForegroundColor Red
Write-Host "   - test-groq-api.js" -ForegroundColor White
Write-Host "   - src/config/keys.js" -ForegroundColor White
Write-Host ""
$continue = Read-Host "Have you verified the files? (yes/no)"
if ($continue -ne "yes") {
    Write-Host "❌ Deployment cancelled. Please verify files first." -ForegroundColor Red
    exit
}
Write-Host ""

# Step 5: Create initial commit
Write-Host "Step 5: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: BillSplit app"
Write-Host "✅ Commit created" -ForegroundColor Green
Write-Host ""

# Step 6: Add remote repository
Write-Host "Step 6: Adding remote repository..." -ForegroundColor Yellow
git remote add origin https://github.com/omkar07-coder/billsplit-.git 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Remote already exists, removing and re-adding..." -ForegroundColor Yellow
    git remote remove origin
    git remote add origin https://github.com/omkar07-coder/billsplit-.git
}
Write-Host "✅ Remote repository added" -ForegroundColor Green
Write-Host ""

# Step 7: Force push
Write-Host "Step 7: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  This will OVERWRITE the GitHub repository!" -ForegroundColor Red
$push = Read-Host "Continue with force push? (yes/no)"
if ($push -ne "yes") {
    Write-Host "❌ Push cancelled." -ForegroundColor Red
    exit
}
Write-Host ""

git push -u origin master --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS! Code deployed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Add your API key back to src/config/keys.js (locally only)" -ForegroundColor White
    Write-Host "2. DO NOT commit the API key" -ForegroundColor White
    Write-Host "3. Visit: https://github.com/omkar07-coder/billsplit-" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Check the error message above." -ForegroundColor Red
}

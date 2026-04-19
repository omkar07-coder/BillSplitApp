# Simple GitHub Deployment (No .git deletion needed)
# This resets git history without deleting the .git folder

Write-Host "🚀 BillSplit - Simple GitHub Deploy" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "⚠️  IMPORTANT: This will reset your git history!" -ForegroundColor Yellow
Write-Host ""
$continue = Read-Host "Continue? (yes/no)"
if ($continue -ne "yes") {
    Write-Host "❌ Cancelled." -ForegroundColor Red
    exit
}
Write-Host ""

# Step 1: Remove all tracked files
Write-Host "Step 1: Removing all tracked files from git..." -ForegroundColor Yellow
git rm -r --cached . 2>$null
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 2: Add all files fresh
Write-Host "Step 2: Adding all files fresh..." -ForegroundColor Yellow
git add .
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 3: Create new commit
Write-Host "Step 3: Creating fresh commit..." -ForegroundColor Yellow
git commit -m "Initial commit: BillSplit app - clean history"
Write-Host "✅ Done" -ForegroundColor Green
Write-Host ""

# Step 4: Force push
Write-Host "Step 4: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  This will overwrite GitHub repository!" -ForegroundColor Red
Write-Host ""
$push = Read-Host "Continue with push? (yes/no)"
if ($push -ne "yes") {
    Write-Host "❌ Push cancelled." -ForegroundColor Red
    exit
}
Write-Host ""

git push -u origin master --force

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS! Deployed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 https://github.com/omkar07-coder/billsplit-" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Push failed. See error above." -ForegroundColor Red
    Write-Host ""
    Write-Host "If you see 'API key detected' error:" -ForegroundColor Yellow
    Write-Host "1. Check test-groq-api.js has placeholder" -ForegroundColor White
    Write-Host "2. Check src/config/keys.js has placeholder" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
}


$unmergedFiles = @(
    ".env.example",
    "App.tsx",
    "components/AIConsultant.tsx",
    "components/Layout.tsx",
    "index.css",
    "index.html",
    "index.tsx",
    "metadata.json",
    "package-lock.json",
    "pages/AdminDashboard.tsx",
    "pages/Auth.tsx",
    "pages/Dashboard.tsx",
    "pages/Home.tsx",
    "pages/Portfolio.tsx",
    "pages/Services.tsx",
    "services/geminiService.ts",
    "services/storageService.ts",
    "types.ts"
)

$hasError = $false

Write-Host "Starting conflict resolution check..." -ForegroundColor Cyan

foreach ($file in $unmergedFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match "<<<<<<<") {
            Write-Host "Error: File '$file' still contains merge conflict markers!" -ForegroundColor Red
            $hasError = $true
        }
        else {
            Write-Host "File '$file' is clean. Staging..." -ForegroundColor Green
            git add $file
        }
    }
    else {
        Write-Host "Warning: File '$file' does not exist." -ForegroundColor Yellow
    }
}

# Also stage ARViewer since we fixed it
if (Test-Path "components/ARViewer.tsx") {
    Write-Host "Staging fixed components/ARViewer.tsx..." -ForegroundColor Green
    git add "components/ARViewer.tsx"
}

if (-not $hasError) {
    Write-Host "`nAll examined files are clean. Committing changes..." -ForegroundColor Cyan
    git commit -m "Resolve all merge conflicts and restore project integrity"
    Write-Host "Merge conflicts resolved successfully!" -ForegroundColor Green
}
else {
    Write-Host "`nProcess stopped due to remaining conflict markers." -ForegroundColor Red
}

# Copy example env to .env if it doesn't exist
if not Test-Path .env {
    Copy-Item .env.example .env
    Write-Host "Created .env file. Please check configuration."
}

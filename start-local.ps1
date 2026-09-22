param(
  [int]$Port = 8000
)

Write-Host "Portfolio running at http://localhost:$Port"
Write-Host "Press Ctrl+C to stop the server."

python -m http.server $Port

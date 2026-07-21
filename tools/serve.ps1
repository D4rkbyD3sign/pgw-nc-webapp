# Static preview server — pure PowerShell, no Node, no installs.
# Usage:  pwsh -File tools\serve.ps1            (localhost only, port 8080)
#         pwsh -File tools\serve.ps1 -Lan       (also on your LAN IP, for phone preview;
#                                                needs one-time admin: netsh http add urlacl)
param(
    [int]$Port = 8080,
    [switch]$Lan
)

$root = Split-Path -Parent $PSScriptRoot
$prefixes = @("http://localhost:$Port/")
if ($Lan) {
    $ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notmatch 'Loopback' } | Select-Object -First 1).IPAddress
    $prefixes += "http://${ip}:$Port/"
}

$mime = @{
    '.html' = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'text/javascript; charset=utf-8'
    '.json' = 'application/json'
    '.svg'  = 'image/svg+xml'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.ico'  = 'image/x-icon'
    '.woff2' = 'font/woff2'
}

$listener = [System.Net.HttpListener]::new()
$prefixes | ForEach-Object { $listener.Prefixes.Add($_) }
$listener.Start()
Write-Host "Serving $root"
$prefixes | ForEach-Object { Write-Host "  -> $_" }
Write-Host "Ctrl+C to stop."

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $reqPath = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
        if ($reqPath -eq '/') { $reqPath = '/index.html' }
        $file = Join-Path $root ($reqPath.TrimStart('/') -replace '/', [System.IO.Path]::DirectorySeparatorChar)

        # stay inside the app root
        $full = [System.IO.Path]::GetFullPath($file)
        if (-not $full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $full -PathType Leaf)) {
            $ctx.Response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes('404')
        }
        else {
            $ext = [System.IO.Path]::GetExtension($full).ToLower()
            $ctx.Response.ContentType = if ($mime.ContainsKey($ext)) { $mime[$ext] } else { 'application/octet-stream' }
            $bytes = [System.IO.File]::ReadAllBytes($full)
        }
        $ctx.Response.ContentLength64 = $bytes.Length
        $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $ctx.Response.Close()
    }
}
finally {
    $listener.Stop()
}

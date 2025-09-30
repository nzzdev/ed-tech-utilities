cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs",
    "dependencies": {
        "@cloudflare/speedtest": "^1.6.0"
    }
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module",
    "dependencies": {
        "@cloudflare/speedtest": "^1.6.0"
    }
}
!EOF
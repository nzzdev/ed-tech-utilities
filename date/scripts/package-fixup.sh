cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs",
    "dependencies": {
      "dayjs": "^1.11.2"
    }
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module",
    "dependencies": {
      "dayjs": "^1.11.2"
    }
}
!EOF
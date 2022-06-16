cat >dist/cjs/package.json <<!EOF
{
    "type": "commonjs",
    "dependencies": {
      "culori": "^2.0.3",
      "d3-scale": "^4.0.2"
    }
}
!EOF

cat >dist/mjs/package.json <<!EOF
{
    "type": "module",
    "dependencies": {
      "culori": "^2.0.3",
      "d3-scale": "^4.0.2"
    }
}
!EOF
# ed-tech-utilities

Contains all utility packages managed by editorial-tech

## Getting started
A new utility package can be generate with Q-cli:

```
Q new-et-utils-package package-name -d my-project-directory
```

## Development

1. `cd <package-folder>`
2. `npm run start`

## Testing

1. `cd <package-folder>`
2. `npm run test`

## Publication Process

1. `cd <package-folder>`
2. `npm publish` (automatically runs tests, typescript compiler & rollup bundler)
3. Go to [GitHub Repo](https://github.com/nzzdev/ed-tech-utilities)
4. Go to Releases
5. Create a new release
6. Add the tag & title `<package-name>-<package-version-number>` (e.g. `date-1.0.3`)
7. Add release description or point to package readme (if changes are documented)

## Install Package

`npm install <package-name>`

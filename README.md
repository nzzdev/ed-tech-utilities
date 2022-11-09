# ed-tech-utilities

Contains all utility packages managed by editorial-tech

## Getting started

1. A new utility package can be generate with Q-cli:

```
Q new-et-utils-package package-name "package author" "package description"
```

The directory name where the new ed-tech utility package project is being created defaults to the project name and can be overwritten by using option -d or --dir

```
Q new-et-utils-package package-name -d my-project-directory
```

NOTE: Sometimes the `.gitignore` & `.npmignore` do not get copied over

2. Run npm install from package folder

```
cd <package-folder>
npm install
```

## Development

1. `cd <package-folder>`
2. `npm run start`

## Testing

1. `cd <package-folder>`
2. `npm run test`

## Publication Process

For each npm package release we do a ed-tech-utilities repository release. 
This allows for easy tracking of commits releated to either package name/version or repository version.

1. `cd <package-folder>`
2. `npm publish` (automatically runs tests, typescript compiler & rollup bundler)
3. Go to [GitHub Repo](https://github.com/nzzdev/ed-tech-utilities)
4. Go to Releases
5. Create a new release
6. Add the tag `<package-name>-<package-version-number>` (e.g. `date-1.0.3`)
7. Add the tag & title `v<utilities-repository-new-release-version-number>` (e.g. `v1.3.5`)
7. Add release description or point to package readme (if changes are documented)

## Install Package

`npm install <package-name>`

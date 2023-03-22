# ed-tech-utilities

Contains all utility packages managed by editorial-tech

## Getting started

1. A new utility package can be generate with Q-cli:

```bash
Q new-et-utils-package package-name "package author" "package description"
```

The directory name where the new ed-tech utility package project is being created defaults to the project name and can be overwritten by using option -d or --dir

```bash
Q new-et-utils-package package-name -d my-project-directory
```

NOTE: Sometimes the `.gitignore` & `.npmignore` do not get copied over

2. Run npm install from package folder

```bash
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
This allows for easy tracking of commits related to either package name/version or repository version.

1. Create a PR from your fix- or feature-branch to main. Maybe have another team member do a code-review. Merge the PR.
2. Pull your changes and `cd <package-folder>`
3. Update the version in the package.json file
4. `npm publish` (automatically runs tests, typescript compiler & rollup bundler)
5. Commit the new build and updated package.json
6. Go to [GitHub Repo Releases](https://github.com/nzzdev/ed-tech-utilities/releases)
7. Create a new release with raised utility repo version as title `<package-name>-v<package-version-number>` (raise by change severity of package, e.g.`tracking-v1.1.3`)
8. Add the tag `<package-name>-<package-version-number>` (e.g. `date-1.0.3`)
9. Add release description or point to package readme (if changes are documented)

## Install Package

`npm install <package-name>`

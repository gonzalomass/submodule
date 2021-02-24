# Convetional Commits
Reference: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Commit Pattern
SEMANTIC VERSIONING PREFIX: TICKET: REPO: DESCRIPTION <br>
FOOTER

Example:

> feat: FREE-3124: GUI: re-build left navigation index <br>
> BEAKING CHANGE: use react in order to re-build the left navigation index

## Semantic Versioning Prefixes for Tag Bumping
| Prefix           | Description     | Note                                               |
| ---------------- | --------------- | -------------------------------------------------- |
| fix:             | *Patch* release |                                                    |
| build:           | *Patch* release |                                                    |
| chore:           | *Patch* release |                                                    |
| ci:              | *Patch* release |                                                    |
| docs:            | *Patch* release |                                                    |
| style:           | *Patch* release |                                                    |
| refactor:        | *Patch* release |                                                    |
| perf:            | *Patch* release |                                                    |
| test:            | *Patch* release |                                                    |
| feat:            | *Minor* release |                                                    |
| BREAKING CHANGE: | *Major* release | Use at the footer or desciption, not at the title. |
Reference: [GitHub Tag Action](https://github.com/marketplace/actions/github-tag#bumping)

## Commit Examples
Patch Example:
> fix: FREE-3122: GUI: left navigation margin

Minor Example:
> feat: FREE-3123: GUI: auto-populate left navigation index

Major Example:
> feat: FREE-3124: GUI: re-build left navigation index <br>
> BEAKING CHANGE: use react in order to re-build the left navigation index

first minor commit
# Embeds

This folder contains all the various flavours of embeds.

`core` contains the core library written in vanilla JS that manages the embed.
`snippet` contains the Vanilla JS Code Snippet that can be installed on any website and would automatically fetch the `core` library.

Please see the respective folder READMEs for details on them.

## Publishing to NPM
To publish the packages. Following commands should be run at the root.

1. `yarn changeset` -> Creates changelog files and adds summary to changelog.
2. `yarn changeset version` -> Bumps the versions as required
3. `yarn publish-embed` -> Releases all packages. We can't use `yarn changeset publish` because it doesn't support workspace: prefix removal yet. See https://github.com/changesets/changesets/issues/432#issuecomment-1016365428
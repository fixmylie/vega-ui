---
to: packages/components/<%= name %>/package.json
---
{
  "name": "@gpn-prototypes/vega-<%= name %>",
  "version": "0.0.1",
  "main": "dist/src/index.js",
  "module": "dist/src/index.js",
  "types": "dist/src/index.d.ts",
  "author": "csssr",
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "ssh://git@github.com/gpn-prototypes/vega-ui.git",
    "directory": "packages/components/<%= name %>"
  },
  "publishConfig": {
    "access": "public",
    "registry": "https://npm.pkg.github.com/gpn-prototypes"
  },
  "peerDependencies": {
    "react": "^16.8.0"
  },
  "dependencies": {
    "bem-cn": "^3.0.1"
  }
}

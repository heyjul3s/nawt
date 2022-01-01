#!/usr/bin/env node
const path = require('path');
const { build } = require('esbuild');
const { Generator } = require('npm-dts');

const currentWorkingPath = process.cwd();

const { src, name, dependencies, peerDependencies } = require(path.join(
  currentWorkingPath,
  'package.json'
));

const outFileName = name.replace('@artefakt/', '');
const DIR_PATH = path.resolve.bind(null, process.cwd());

const commonConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies))
};

new Generator({
  entry: DIR_PATH('src/index.ts'),
  output: DIR_PATH('dist/index.d.ts')
}).generate();

build({
  ...commonConfig,
  outfile: `dist/${outFileName}.js`
});

build({
  ...commonConfig,
  outfile: `dist/${outFileName}.esm.js`,
  format: 'esm'
});

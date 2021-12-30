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

const commonConfig = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies))
};

build({
  ...commonConfig,
  outfile: `dist/${outFileName}.js`
});

build({
  ...commonConfig,
  outfile: `dist/${outFileName}.esm.js`,
  format: 'esm'
});

new Generator({
  entry: 'src/typings.ts',
  output: 'dist/index.d.ts'
}).generate();

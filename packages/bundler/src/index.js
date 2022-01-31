#!/usr/bin/env node
const path = require('path');
const { build } = require('esbuild');
const { Generator } = require('npm-dts');

const currentWorkingPath = process.cwd();

const { src, name, dependencies, peerDependencies } = require(path.join(
  currentWorkingPath,
  'package.json'
));

const inputPath = path.join(currentWorkingPath, src);
const outFileName = name.replace('@nawt/', '');
const DIR_PATH = path.resolve.bind(null, process.cwd());

const dependencyKeys = !!dependencies ? Object.keys(dependencies) : [];
const peerDependencyKeys = !!peerDependencies
  ? Object.keys(peerDependencies)
  : [];

const commonConfig = {
  entryPoints: [inputPath],
  bundle: true,
  external: [...dependencyKeys, ...peerDependencyKeys]
};

new Generator({
  entry: inputPath || DIR_PATH('src/index.ts'),
  output: DIR_PATH('dist/index.d.ts')
}).generate();

build({
  ...commonConfig,
  outfile: `dist/${outFileName}.cjs.js`,
  format: 'cjs'
});

build({
  ...commonConfig,
  outfile: `dist/${outFileName}.esm.js`,
  format: 'esm'
});

import config from './config';
import * as fs from 'fs-extra';
import * as rm from 'rimraf';
import { resolve, join } from 'path';

const projectRoot = resolve(__dirname);
const packagesRoot = resolve(projectRoot, '../');

const paths = {
    web: join(packagesRoot, 'suite-web', 'public', 'static'),
    desktop: join(packagesRoot, 'suite-desktop', 'public', 'static'),
    native: join(packagesRoot, 'suite-native', 'public', 'static'),
};

const copyFiles = (from: string, to: string) => {
    rm.sync(join(packagesRoot, 'suite-web', 'public'));
    rm.sync(join(packagesRoot, 'suite-desktop', 'public'));
    rm.sync(join(packagesRoot, 'suite-native', 'public'));

    fs.copy(from, to, err => {
        if (err) return console.error(err);
        console.log('copied', from, to);
    });
};

Object.keys(config).map((project: string) =>
    config[project].map((path: string) =>
        copyFiles(join(projectRoot, 'files', path), join(paths[project], path)),
    ),
);

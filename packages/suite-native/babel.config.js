module.exports = api => {
    api.cache(false);
    return {
        presets: ['module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        'node-fetch': 'whatwg-fetch',

                        // === Custom overrides ===

                        // web and desktop use next.js router
                        '@suite-actions/routerActions':
                            './packages/suite-native/src/actions/suite/routerActions',
                        // unlike on web, messages are bundled with application and might be simply required
                        '@suite-actions/languageActions':
                            './packages/suite-native/src/actions/suite/languageActions',
                        // react-native custom store
                        '@suite/reducers/store': './packages/suite-native/src/reducers/store',
                        // react-native support
                        '^@suite-support/(.+)': './packages/suite-native/src/support/suite/\\1/\\2',

                        '^@suite/support/messages': './packages/suite/src/support/messages',

                        // relative to "projectRoot: ../../" defined in package.json
                        '^@suite/(.+)': './packages/suite/src/\\1',

                        // === Views - no reuse at all ===
                        // exclude .messages.*
                        '^@(suite|dashboard|onboarding|wallet|passwords|exchange|settings)-views/(?!.*[.]messages)(.+)':
                            './packages/suite-native/src/views/\\1/\\2',
                        '^@(.+)-views$': './packages/suite-native/src/views/\\1/index',

                        // === Components ===
                        // without (suite|wallet|onboarding) it was failing to resolve style-components/native in /packages/components/lib/components/buttons/Pin/index.native.js
                        '^@(suite|dashboard|onboarding|wallet|passwords|exchange|settings)-components/(?!.*[.]messages)(.+)':
                            './packages/suite-native/src/components/\\1/\\2',
                        // '^@(.+)-components': './packages/suite-native/src/components/\\1/index',

                        // === Standard resolvers ===
                        // to find something.messages from suite core
                        // '^@(.+)-views/(.+)': './packages/suite/src/views/\\1/\\2',
                        // '^@(.+)-components/(.+)': './packages/suite/src/components/\\1/\\2',

                        '^@(.+)-actions/(.+)': './packages/suite/src/actions/\\1/\\2',
                        '^@(.+)-actions': './packages/suite/src/actions/\\1/index',
                        '^@(.+)-reducers/(.+)': './packages/suite/src/reducers/\\1/\\2',
                        '^@(.+)-reducers': './packages/suite/src/reducers/\\1/index',
                        '^@(.+)-config/(.+)': './packages/suite/src/config/\\1/\\2',
                        '^@(.+)-config': './packages/suite/src/config/\\1/index',
                        '^@(.+)-constants/(.+)': './packages/suite/src/constants/\\1/\\2',
                        '^@(.+)-constants': './packages/suite/src/constants/\\1/index',
                        '^@(suite|dashboard|onboarding|wallet|passwords|exchange|settings)-utils/(.+)':
                            './packages/suite/src/utils/\\1/\\2',
                        '^@(suite|dashboard|onboarding|wallet|passwords|exchange|settings)-utils':
                            './packages/suite/src/utils/\\1/index',
                        '^@(.+)-types/(.+)': './packages/suite/src/types/\\1/\\2',
                        '^@(.+)-types': './packages/suite/src/types/\\1/index',
                        '^@(.+)-middlewares/(.+)': './packages/suite/src/middlewares/\\1/\\2',
                        '^@(.+)-middlewares': './packages/suite/src/middlewares/\\1/index',

                        // todo maybe use '^@(.+)-(.+)/(.+)': './packages/suite/src/\\1/\\2/\\3',

                        // ??????
                        '^@trezor/components$': './packages/components',
                        '^@trezor/suite-data$': './packages/suite-data',
                        '^@trezor/blockchain-link$': './packages/blockchain-link', // maybe not necessary, since blockchain-link is declared as extra node_modules in metro.config.js
                    },
                },
            ],
        ],
    };
};

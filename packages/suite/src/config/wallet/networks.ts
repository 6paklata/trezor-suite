import { ArrayElement } from '@suite/types/utils';

const networks = [
    // Bitcoin
    {
        name: 'Bitcoin',
        networkType: 'bitcoin',
        symbol: 'btc',
        bip44: "m/84'/0'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin (segwit)',
        networkType: 'bitcoin',
        accountType: 'segwit',
        symbol: 'btc',
        bip44: "m/49'/0'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'btc',
        bip44: "m/44'/0'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Litecoin
    {
        name: 'Litecoin',
        networkType: 'bitcoin',
        symbol: 'ltc',
        bip44: "m/49'/2'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Litecoin (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'ltc',
        bip44: "m/44'/2'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Bitcoin testnet
    {
        name: 'Bitcoin Testnet',
        networkType: 'bitcoin',
        symbol: 'test',
        bip44: "m/84'/1'/i'",
        hasSignVerify: true,
        decimals: 8,
        testnet: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Testnet (segwit)',
        networkType: 'bitcoin',
        accountType: 'segwit',
        symbol: 'test',
        bip44: "m/49'/1'/i'",
        hasSignVerify: true,
        decimals: 8,
        testnet: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Testnet (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'test',
        bip44: "m/44'/1'/i'",
        hasSignVerify: true,
        decimals: 8,
        testnet: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Ethereum
    {
        name: 'Ethereum',
        networkType: 'ethereum',
        symbol: 'eth',
        bip44: "m/44'/60'/0'/0/i",
        hasSignVerify: true,
        decimals: 18,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Ethereum Classic',
        networkType: 'ethereum',
        symbol: 'etc',
        bip44: "m/44'/61'/0'/0/i",
        hasSignVerify: true,
        decimals: 18,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Ethereum Ropsten',
        networkType: 'ethereum',
        symbol: 'trop',
        bip44: "m/44'/60'/0'/0/i",
        hasSignVerify: true,
        decimals: 18,
        testnet: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    // Ripple
    {
        name: 'XRP',
        networkType: 'ripple',
        symbol: 'xrp',
        bip44: "m/44'/144'/i'/0/0",
        decimals: 6,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'XRP Testnet',
        networkType: 'ripple',
        symbol: 'txrp',
        bip44: "m/44'/144'/i'/0/0",
        decimals: 6,
        testnet: true,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Cash',
        networkType: 'bitcoin',
        symbol: 'bch',
        bip44: "m/44'/145'/i'",
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Gold',
        networkType: 'bitcoin',
        symbol: 'btg',
        bip44: "m/49'/156'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Bitcoin Gold (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'btg',
        bip44: "m/44'/156'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Dash',
        networkType: 'bitcoin',
        symbol: 'dash',
        bip44: "m/44'/5'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'DigiByte',
        networkType: 'bitcoin',
        symbol: 'dgb',
        bip44: "m/49'/20'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'DigiByte (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'dgb',
        bip44: "m/44'/20'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Dogecoin',
        networkType: 'bitcoin',
        symbol: 'doge',
        bip44: "m/44'/3'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Namecoin',
        networkType: 'bitcoin',
        symbol: 'nmc',
        bip44: "m/44'/7'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Vertcoin',
        networkType: 'bitcoin',
        symbol: 'vtc',
        bip44: "m/49'/28'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Vertcoin (legacy)',
        networkType: 'bitcoin',
        accountType: 'legacy',
        symbol: 'vtc',
        bip44: "m/44'/28'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
    {
        name: 'Zcash',
        networkType: 'bitcoin',
        symbol: 'zec',
        bip44: "m/44'/133'/i'",
        hasSignVerify: true,
        decimals: 8,
        explorer: {
            tx: 'https://example.com',
            address: 'https://example.com/address/',
        },
    },
] as const;

type Network = {
    accountType?: 'normal' | 'legacy' | 'segwit';
    testnet?: boolean;
    isHidden?: boolean;
    hasSignVerify?: boolean;
} & ArrayElement<typeof networks>;

export default [...networks] as Network[];
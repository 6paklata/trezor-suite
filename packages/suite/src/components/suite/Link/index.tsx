import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import { Link as TLink } from '@trezor/components';
import { getPrefixedURL, isInternalRoute } from '@suite-utils/router';

interface Props extends LinkProps {
    className?: string;
    isGray?: boolean;
    isGreen?: boolean;
    hasNoStyle?: boolean;
    target?: string;
    children: React.ReactNode;
}

const Link = ({ children, href, className, target = '_self', ...rest }: Props) => {
    /*  
        if href prop refers to internal url puts assetPrefix in front and
        pass the prefixed value in 'as' prop to prevent refreshing the page
        TODO: handle UrlObject, Url type of href
    */
    const isInternalLink = typeof href === 'string' ? isInternalRoute(href) : false;
    const overrideAsProp = {
        ...(isInternalLink && typeof href === 'string' ? { as: getPrefixedURL(href) } : {}),
    };

    const { prefetch, shallow, scroll, replace, ...linkProps } = rest;
    const WrappedLink = React.forwardRef(() => (
        <TLink target={target} {...linkProps} className={className}>
            {children}
        </TLink>
    ));

    return (
        <NextLink
            href={href}
            prefetch={prefetch}
            scroll={scroll}
            shallow={shallow}
            replace={replace}
            passHref
            {...overrideAsProp}
        >
            <WrappedLink />
        </NextLink>
    );
};

export default Link;

import { Props } from './Container';
import { useEffect } from 'react';
import debounce from 'debounce';

const Resize = (props: Props) => {
    useEffect(() => {
        const handleResize = debounce(() => {
            props.updateWindowSize(window.innerWidth, window.innerHeight);
        }, 700);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    return null;
};

export default Resize;

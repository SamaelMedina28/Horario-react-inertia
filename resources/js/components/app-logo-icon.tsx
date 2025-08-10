import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/Logo-uabc.png" alt="Logo UABC" {...props} />
    );
}

import crypto from 'crypto';

function generateToken(videoID: string, expires: number, securityKey: string) {
    const data = securityKey + videoID + expires.toString();

    const hash = crypto.createHash('sha256');
    hash.update(data);

    return hash.digest('hex');
}

export function signStreamURL(
    iFrameURL: string,
    securityKey: string,
){
    const expiration = 3600

    const parsedURL = new URL(iFrameURL);
    const segments = parsedURL.pathname.split("/");
    const videoID = segments[3];

    const expires = Math.floor(Date.now() / 1000) + expiration;

    const token = generateToken(videoID, expires, securityKey)

    parsedURL.searchParams.set("token", token);
    parsedURL.searchParams.set("expires", expires.toString());

    return parsedURL.toString();
}

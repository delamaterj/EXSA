const IMG_REGEX = /^[A-Za-z0-9._~%-]+?\.(?:png|jpe?g|gif|webp|svg|bmp|ico|avif|tiff?)$/i;

export function isValidImg(img: string): boolean {
    return IMG_REGEX.test(img);
}
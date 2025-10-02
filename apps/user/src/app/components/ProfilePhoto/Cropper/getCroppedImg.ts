const createImage = (url: string) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });

function getRadianAngle(degreeValue: number) {
    return (degreeValue * Math.PI) / 180;
}

interface Image {
    width: number;
    height: number;
    x: number;
    y: number;
}

export default async function getCroppedImg(imageSrc: string | null, pixelCrop: Image, rotation = 0) {
    // @ts-ignore
    const image: Image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx?.translate(safeArea / 2, safeArea / 2);
    ctx?.rotate(getRadianAngle(rotation));
    ctx?.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx?.drawImage(
        // @ts-ignore
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5,
    );
    const data = ctx?.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx?.putImageData(
        // @ts-ignore
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y),
    );

    const IMAGE = {
        quality: 9.2,
        type: 'image/jpeg',
    };

    // As Base64 string
    return canvas.toDataURL(IMAGE.type, IMAGE.quality);
}

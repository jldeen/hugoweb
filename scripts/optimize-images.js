import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

(async () => {
    let fullImages = await convertFullImages();
    let previewImages = await convertPreviewImages();
    console.log('Converted ' + (fullImages.length + previewImages.length) + ' images to WEBP format.');
})();

/**
 * Converts raw input images into full-sized WEBP images.
 */
function convertFullImages(){
    return imagemin(['raw-images/*.{jpg,png,jpeg,JPEG,JPG}'], {
		destination: 'static/generated/full',
		plugins: [
			imageminWebp()
		]
    });
}

/**
 * Converts raw input images into preview-sized WEBP images.
 */
function convertPreviewImages(){
    return imagemin(['raw-images/*.{jpg,png,jpeg,JPEG,JPG}'], {
        destination: 'static/generated/preview',
        plugins: [
            imageminWebp({
                resize: {
                    width: 510,
                    height: 267
                }
            })
        ]
    });
}
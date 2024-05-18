import mammoth from 'mammoth';
export const ConvertDocToPlainText = async (arrayBuffer) => {
  return new Promise((resolve, reject) => {
    const options = {
      convertImage: mammoth.images.imgElement(function (image) {
        return image.read('base64');
      })
    };

    mammoth
      .extractRawText({ arrayBuffer }, options)
      .then((result) => {
        resolve(result.value);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

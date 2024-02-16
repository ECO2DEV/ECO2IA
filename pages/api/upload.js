import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'eco2',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export default async function POST(req) {
  const { imageData } = req.body;

  const {
    roomType,
    aiInterventionType,
    mode,
    designStyle,
    numberDesigns,
    originalImg,
    maskImg
  } = imageData;

  console.log('aqui esta todo el body', imageData);
  const imagePath = path.join(process.cwd(), 'public', 'original.png');
  const imageMaskPath = path.join(process.cwd(), 'public', 'maskimage.png');

  const base64image = originalImg.replace(/^data:image\/\w+;base64,/, '');
  console.log('base64image', base64image);
  writeFileSync(imagePath, base64image, 'base64');
  const base64mask = maskImg.replace(/^data:image\/\w+;base64,/, '');
  writeFileSync(imageMaskPath, base64mask, 'base64');

  // Use createReadStream to read the image file
  const imageReadStream = createReadStream(imagePath);
  const maskReadStream = createReadStream(imageMaskPath);

  // const imageBuffer = Buffer.from(base64image, 'base64');
  // const maskBuffer = Buffer.from(base64mask, 'base64');

  // console.log('image stream', imageReadStream);

  let prompt = `Generate an enhanced design for ${roomType} with ${aiInterventionType}. Utilize the ${mode} mode and incorporate a ${designStyle} design style within the specified masked areas in the given image. Provide a visual representation without using textual elements in the response.`;
  try {
    const response = await openai.images.edit({
      image: imageReadStream,
      mask: maskReadStream,
      prompt: prompt,
      n: numberDesigns,
      response_format: 'b64_json'
    });

    // image_url = response.data.data[0].url;

    console.log('this is the output', response);

    return ctx.send({ url: response.data }, 200);
  } catch (error) {
    console.log('Error processing request:', error);
    return ctx.badRequest({ error: 'Internal Server Error check' });
  }
}

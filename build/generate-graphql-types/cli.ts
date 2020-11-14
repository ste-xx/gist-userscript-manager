import download from './download-github-schema';
import generate from './generate-types';

const main = async () => {
  await download();
  await generate();
};

void main().catch((e) => {
  console.error(e);
  process.exit();
});

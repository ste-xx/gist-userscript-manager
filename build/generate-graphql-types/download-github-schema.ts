import {SCHEMA_PATH, SCHEMA_URL} from './config';
import {writeFile} from 'fs/promises';
import fetch from 'node-fetch';

export default async (): Promise<void> => {
  console.log('Downloading schema from github...');
  await fetch(SCHEMA_URL)
    .then(response => response.buffer())
    .then(buffer => writeFile(SCHEMA_PATH, buffer))
  console.log('Download complete');
}




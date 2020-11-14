import createClient from 'chrome-webstore-upload';
import {createReadStream} from 'fs';

const upload = async () => {
  const webstore = createClient({
    extensionId: "plpmkifleemfflmlnogdncmhlljcpdab",
    clientId: process.env.webstoreClientIdSecret ?? '',
    clientSecret: process.env.webstoreClientSecret ?? '',
    refreshToken: process.env.webstoreRefreshTokenSecret ?? ''
  });
  await webstore.uploadExisting(createReadStream('../gist-userscript-manager.zip'));
};

void upload().catch((e) => {
  console.error(e);
  process.exit(1);
});

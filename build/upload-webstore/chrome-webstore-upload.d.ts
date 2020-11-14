declare module 'chrome-webstore-upload' {
  import {ReadStream} from "fs";

  interface Options {
    extensionId: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
  }

  class APIClient {
    constructor(options: Options);
    uploadExisting(readStream: ReadStream, token?: string): Promise<unknown>;
  }

  function create(options: Options): APIClient;
  export = create;
}

import {exec, ExecOptions} from "child_process";
import {join} from 'path';
import del from "del";

const execute = async (command: string, options?: ExecOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, options);
    childProcess.addListener('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
  });
};

export default async (): Promise<void> => {
  const srcDir = join(__dirname, '../../src');
  console.log('delete old generated gql type files');
  const deletedPaths = await del('**/__gen_gql/**', {cwd: srcDir});
  console.log('deleted files:');
  deletedPaths.forEach(path => console.log(path));

  console.log('Generating typescript types');
  const command = "npx apollo client:codegen --target=typescript __gen_gql --includes=./**/*.gql --localSchemaFile=../github.graphql";
  await execute(command, {cwd: srcDir});
  console.log('Generation complete');

};

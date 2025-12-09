import * as fs from 'fs';
import * as path from 'path';

const isProd = process.env.NODE_ENV === 'production';

export function parseEnv() {
  const localEnv = path.resolve('.env.local');
  const prodEnv = path.resolve('.env');

  if (!fs.existsSync(localEnv) && !fs.existsSync(prodEnv)) {
    throw new Error('缺少环境配置文件');
  }

  return isProd && fs.existsSync(prodEnv) ? prodEnv : localEnv;
}
export default parseEnv();

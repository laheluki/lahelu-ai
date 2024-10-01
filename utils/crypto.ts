/* eslint-disable @typescript-eslint/no-explicit-any */
import crypto from 'crypto';

export function createUINT8Array(data: any) {
  const hash = crypto.createHash('md5').update(data).digest('hex');
  const bytes = new Uint8Array(hash.length / 2);

  return bytes;
}

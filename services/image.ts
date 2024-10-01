/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { db } from '@/lib/db';

export async function insertImage(
  imageId: string,
  blob: Blob,
  hash: any,
  topicId: string
) {
  const res = await db.images.add({
    id: imageId,
    imageData: blob,
    imageHash: hash,
    topicId,
  });

  return res;
}

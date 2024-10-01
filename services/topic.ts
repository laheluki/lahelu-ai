'use client';

import { db } from '@/lib/db';

export function getTopicById(id: string) {
  const res = db.topics.where('id').equals(id).first();
  return res;
}

export function addIdFolder(id: string, folderId: string) {
  const res = db.topics.update(id, {
    folderId: folderId,
  });

  return res;
}

export function generateTopic(id: string, title: string) {
  const res = db.topics.add({
    id,
    title: title,
    createdAt: new Date(),
  });

  return res;
}

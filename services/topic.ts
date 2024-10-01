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

export function updateTitleTopic(id: string, title: string) {
  const res = db.topics.update(id, { title });
  return res;
}

export async function deleteTopic(id: string) {
  const res = await db.topics.delete(id);
  await db.conversations.where('topicId').equals(id).delete();
  await db.images.where('topicId').equals(id).delete();
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

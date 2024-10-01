'use client';

import { db } from '@/lib/db';
import { generateRandomId } from '@/utils/generateId';

export async function addConversation(
  topicId: string,
  question: string,
  imageId?: string
) {
  const res = await db.conversations.add({
    id: 'chat' + generateRandomId(4),
    createdAt: new Date(),
    question,
    topicId,
    imageId,
  });

  return res;
}

export function updateConversation(
  id: string,
  answer: string,
  model: string,
  imageId: string
) {
  const res = db.conversations.update(id, {
    answer,
    model,
    imageId,
  });

  return res;
}

export function deleteConversation(converId: string) {
  return db.conversations.delete(converId);
}

export function getConversationByTopicId(topidId: string) {
  const res = db.conversations
    .where('topicId')
    .equals(topidId)
    .sortBy('createdAt');

  return res;
}

import { db } from '@/lib/db';
import { getTopicById } from './topic';
import { IndexableType } from 'dexie';

export async function inserTopicToFolder(key: IndexableType, id: string) {
  try {
    const data = await getTopicById(id);
    if (!data) throw new Error('Topic not found');

    const folder = await db.folders.get(key);
    if (!folder) throw new Error('Folder not found');

    const topicExists = folder.topics?.some((topic) => topic.id === data.id);

    if (topicExists) {
      throw new Error('Topic already exist in this folder');
    }

    const updatedTopics = folder.topics
      ? [...folder.topics, { id: data.id, title: data.title }]
      : [{ id: data.id, title: data.title }];

    const res = await db.folders.update(key, {
      topics: updatedTopics,
    });

    return res;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
}

export async function deleteTopicFromFolder() {}

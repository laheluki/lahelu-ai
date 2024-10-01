import Dexie, { Table } from 'dexie';

export interface IConversation {
  id: string;
  question: string;
  answer?: string;
  model?: string;
  topicId: string;
  imageId?: string;
  createdAt: Date;
}

export interface ITopicDetail {
  id: number;
  title: string;
}

export interface IFolders {
  id: string;
  title: string;
  createdAt: Date;
  topics?: { id: string; title: string }[];
}

export interface ITopics {
  id: string;
  folderId?: string;
  title: string;
  createdAt: Date;
}

export interface ImageRow {
  id: string;
  topicId: string;
  imageData: Blob;
  imageHash: Uint8Array;
}

class DB extends Dexie {
  // table
  images!: Table<ImageRow>;
  folders!: Table<IFolders>;
  conversations!: Table<IConversation>;
  topics!: Table<ITopics>;

  constructor() {
    super('LAHELU_AI_DB');
    this.version(1).stores({
      images: '&id, imageData, imageHash, topicId',
      folders: '&id, title, createdAt, topics',
      conversations:
        '&id, question, answer, model, topicId, imageId, createdAt',
      topics: '&id, title, folderId, createdAt',
    });
  }
}

export const db = new DB();

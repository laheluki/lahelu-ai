'use client';

import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { Chat } from './chat';
import { redirect } from 'next/navigation';

type PageParams = {
  params: {
    id: string;
  };
};

export default function ChatPageById({ params: { id } }: PageParams) {
  const res = useLiveQuery(() =>
    db.conversations.where('topicId').equals(id).sortBy('createdAt')
  );

  if (res?.length === 0) {
    return redirect('/');
  }

  return <Chat id={id} messages={res ?? []} />;
}

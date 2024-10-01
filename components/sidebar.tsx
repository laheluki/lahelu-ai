'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FolderPlus, MessageCircleHeartIcon, Plus } from 'lucide-react';
import { useLiveQuery } from 'dexie-react-hooks';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { FolderItem } from '@/components/folder-item';
import { ChatItem } from '@/components/chat-item';

import { db } from '@/lib/db';
import { useDebounce } from '@/hooks/use-debounce';
import { generateRandomId } from '@/utils/generateId';
import { cn } from '@/lib/utils';

const linkVariant = buttonVariants({
  variant: 'default',
  className: 'flex flex-row items-center justify-center w-full',
});

export const Sidebar = () => {
  const pathname = useParams();
  const router = useRouter();
  const folders = useLiveQuery(() => db.folders.toArray());
  const topic = useLiveQuery(() => db.topics.toArray());
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const topics = useLiveQuery(() => {
    if (debouncedQuery) {
      return db.topics
        .orderBy('createdAt')
        .reverse()
        .filter((topic) => topic.title.includes(debouncedQuery))
        .toArray();
    } else {
      return db.topics
        .orderBy('createdAt')
        .filter((topic) => topic.folderId == null || topic.folderId?.length < 1)
        .reverse()
        .toArray();
    }
  }, [debouncedQuery]);

  const [open, setOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragStart(e: React.DragEvent<HTMLDivElement>, id: string) {
    e.dataTransfer.setData('text/plain', id);
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const target = e.target as Element;

    if (!target.closest('#folder')) {
      const itemId = e.dataTransfer.getData('text/plain');
      await db.topics.update(itemId, {
        folderId: '',
      });
    }

    setIsDragOver(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant={'link'}
          size={'sm'}
          className='flex flex-row item-center'
        >
          <MessageCircleHeartIcon className='w-5 h-5 sm:hidden flex' />
          <span className='sm:flex hidden text-base'>Chats</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={'right'} className='w-80'>
        <SheetHeader className='text-base text-start font-sans'>
          <DialogTitle>✨ History Chat</DialogTitle>
        </SheetHeader>
        <SheetDescription className='text-base text-start font-sans my-2'>
          Use the search bar above to quickly find specific conversations.
        </SheetDescription>

        <hr className='my-2' />

        {/* button folder and chat */}
        <div className='flex flex-row space-x-2'>
          <Link
            href={'/'}
            className={linkVariant}
            onClick={() => setOpen(!open)}
          >
            <Plus />
            <span>New Chat</span>
          </Link>
          <Button
            onClick={async () => {
              await db.folders.add({
                id: `folder-${generateRandomId(5)}`,
                title: 'New Folder',
                createdAt: new Date(),
              });
            }}
          >
            <FolderPlus />
          </Button>
        </div>

        {/* input search */}
        <div className='flex w-full my-2'>
          <Input
            placeholder='Search chats...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>

        {/* folders of chat */}
        <div>
          {folders?.map((folder) => (
            <FolderItem key={folder.id} folder={folder}>
              {topic
                ?.filter((item) => item.folderId == folder.id)
                .map((topic) => (
                  <div
                    key={topic.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, topic.id)}
                    onClick={() => router.push(`/c/${topic.id}`)}
                  >
                    {/* <Link
                      href={`/c/${topic.id}`}
                      onClick={() => setOpen(!open)}
                    > */}
                    <ChatItem
                      id={topic.id}
                      title={topic.title}
                      linkActive={pathname.id === topic.id}
                    />
                    {/* </Link> */}
                  </div>
                ))}
            </FolderItem>
          ))}
        </div>

        {folders && folders.length > 0 && <hr className='my-2' />}

        {/* chats */}
        <div className='h-full overflow-auto pb-20'>
          {topics &&
            topics.length > 0 &&
            topics.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item.id)}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onClick={() => router.push(`/c/${item.id}`)}
              >
                {/* <Link href={`/c/${item.id}`} onClick={() => setOpen(!open)}> */}
                <ChatItem
                  id={item.id}
                  title={item.title}
                  linkActive={pathname.id === item.id}
                />
                {/* </Link> */}
              </div>
            ))}
        </div>

        <div
          className={cn('flex grow  h-full w-full', isDragOver && 'bg-accent')}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
        />
      </SheetContent>
    </Sheet>
  );
};

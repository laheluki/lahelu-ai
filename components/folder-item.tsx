import { ReactNode, useRef, useState } from 'react';
import { ChevronDown, ChevronRight, SquarePen, Trash2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { db, IFolders } from '@/lib/db';
import { addIdFolder } from '@/services/topic';
import { toast } from 'sonner';
import { Modals } from './modals';
import { deleteFolder } from '@/services/folder';

interface FolderItemProps {
  children: ReactNode;
  folder: IFolders;
}

export const FolderItem = ({ children, folder }: FolderItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState(folder.title);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  async function handleUpdateFolder() {
    await db.folders.update(folder.id, { title: title });
  }

  async function handleDeleteFolder() {
    await deleteFolder(folder.id);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      ref.current?.click();
    }
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
    setIsDragOver(true);
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setIsDragOver(false);
    const itemId = e.dataTransfer.getData('text/plain');
    const res = await addIdFolder(itemId, folder.id);

    if (res === 1) {
      toast('Operation Succull', {
        duration: 1500,
        position: 'top-right',
      });
    } else {
      toast(res, {
        duration: 1500,
        position: 'top-right',
      });
    }
  }

  return (
    <div
      ref={ref}
      id='folder'
      className={cn(
        'rounded focus:outline-none w-full',
        isDragOver && 'bg-accent'
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        onClick={handleClick}
        className='hover:bg-accent focus:bg-accent flex w-full cursor-pointer items-center justify-between rounded p-2 hover:opacity-50 focus:outline-none'
      >
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center w-full max-w-52'>
            {isExpanded ? <ChevronDown /> : <ChevronRight />}

            <div className='ml-3 flex-1 truncate text-sm font-semibold'>
              {folder.title}
            </div>
          </div>

          {isHovering && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              className='ml-2 flex space-x-2'
            >
              <Modals
                trigger={<SquarePen className='hover:opacity-50' size={18} />}
                title='Edit Folder'
                description='Change title of this folder'
                inputLabel='Title'
                inputValue={title}
                setInputValue={setTitle}
                onConfirm={handleUpdateFolder}
              />

              <Modals
                trigger={<Trash2Icon className='hover:opacity-50' size={18} />}
                title='Delete Folder'
                description='Delete folder includes chats.'
                onConfirm={handleDeleteFolder}
                variant='destructive'
                buttonTitle='Delete'
              />
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className='ml-5 mt-2 space-y-2 border-l-2 pl-4'>{children}</div>
      )}
    </div>
  );
};

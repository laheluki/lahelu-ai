import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { ModalUpdate } from './modal-update';
import { ChevronsRight, SquarePen } from 'lucide-react';

interface ChatItemProps {
  id: string;
  title: string;
  linkActive: boolean;
}

export const ChatItem = ({
  id: chatId,
  title: name,
  linkActive,
}: ChatItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState(name);

  const isActive = false;

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      ref.current?.click();
    }
  }

  function handleUpdateChat() {
    chatId;
  }
  return (
    <div
      ref={ref}
      onKeyDown={handleKeyDown}
      className={cn(
        'hover:bg-accent focus:bg-accent group flex w-full cursor-pointer items-center rounded p-2 hover:opacity-50 focus:outline-none',
        isActive && 'bg-accent'
      )}
    >
      {linkActive && <ChevronsRight className='animate-bounce-x' />}
      <div className='ml-3 flex-1 truncate text-sm font-semibold'>{name}</div>

      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className={`ml-2 flex space-x-2 ${
          !isActive && 'w-11 opacity-0 group-hover:opacity-100'
        }`}
      >
        <ModalUpdate
          trigger={<SquarePen className='hover:opacity-50' size={18} />}
          title='Edit Chat'
          description='Change title of this chat'
          inputLabel='Title'
          inputValue={title}
          setInputValue={setTitle}
          onSave={handleUpdateChat}
        />
        {/* <FolderDelete folder={item} /> */}
      </div>
    </div>
  );
};

import { useRef, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Trash2Icon } from 'lucide-react';
import { db, IFolders } from '@/lib/db';

export const FolderDelete = ({ folder }: { folder: IFolders }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);

  async function handleDeleteFolderAndItems() {
    // TODO: handle delete folder include items
  }

  async function handleDeleteFolderOnly() {
    await db.folders.delete(folder.id);
    setShowFolderDialog(false);
  }

  return (
    <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
      <DialogTrigger asChild>
        <Trash2Icon className='hover:opacity-50' size={18} />
      </DialogTrigger>

      <DialogContent className='w-80 sm:w-full md:w-full'>
        <DialogHeader>
          <DialogTitle>Delete {folder.title}</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete this folder?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='space-y-2'>
          <Button
            variant='ghost'
            className='mt-2'
            size={'sm'}
            onClick={() => setShowFolderDialog(false)}
          >
            Cancel
          </Button>

          <Button
            ref={buttonRef}
            variant='destructive'
            size={'sm'}
            onClick={handleDeleteFolderAndItems}
          >
            Delete Folder & Chats
          </Button>

          <Button
            ref={buttonRef}
            variant='destructive'
            size={'sm'}
            onClick={handleDeleteFolderOnly}
          >
            Delete Folder Only
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

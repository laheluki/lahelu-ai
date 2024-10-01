import { SquarePen } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useRef, useState } from 'react';
import { db, IFolders } from '@/lib/db';

export const FolderUpdate = ({ folder }: { folder: IFolders }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showFolderDialog, setShowFolderDialog] = useState(false);
  const [name, setName] = useState(folder.title);

  const handleUpdateFolder = async () => {
    await db.folders.update(folder.id, { title: name });
    setShowFolderDialog(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  return (
    <Dialog open={showFolderDialog} onOpenChange={setShowFolderDialog}>
      <DialogTrigger asChild>
        <SquarePen className='hover:opacity-50' size={18} />
      </DialogTrigger>
      <DialogContent
        onKeyDown={handleKeyDown}
        className='w-80 sm:w-full md:w-full'
      >
        <DialogHeader>
          <DialogTitle>Edit Folder</DialogTitle>
          <DialogDescription>Change title of this folder</DialogDescription>
        </DialogHeader>

        <div className='space-y-1'>
          <Label>Name</Label>

          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <DialogFooter className='flex flex-row justify-end'>
          <Button variant='ghost' onClick={() => setShowFolderDialog(false)}>
            Cancel
          </Button>

          <Button ref={buttonRef} onClick={handleUpdateFolder}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { ReactNode, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ModalUpdate {
  trigger: ReactNode;
  title: string;
  description: string;
  inputLabel?: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSave: () => void;
}

export const ModalUpdate = ({
  trigger,
  title,
  description,
  inputLabel,
  inputValue,
  setInputValue,
  onSave,
}: ModalUpdate) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setIsOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      buttonRef.current?.click();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        onKeyDown={handleKeyDown}
        className='w-80 sm:w-full md:w-full'
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {inputLabel && (
          <div className='space-y-1'>
            <label>{inputLabel}</label>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        )}
        <DialogFooter className='flex flex-row justify-end space-x-2'>
          <Button variant='ghost' onClick={() => setIsOpen(false)}>
            Cancel
          </Button>

          <Button
            ref={buttonRef}
            onClick={() => {
              onSave();
              setIsOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Loader2Icon, Send } from 'lucide-react';
import { useFormStatus } from 'react-dom';

export const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      className={`absolute inset-y-0 right-0 pr-3 text-muted-foreground ${
        disabled
          ? 'opacity-25 cursor-default'
          : 'hover:opacity-50 cursor-pointer'
      }`}
      disabled={disabled || pending}
    >
      {pending ? (
        <Loader2Icon className='w-5 h-5 animate-spin' />
      ) : (
        <Send className='h-5 w-5' />
      )}
    </button>
  );
};

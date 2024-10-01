import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

export const Brand = () => {
  return (
    <Link
      href={'/'}
      className='flex flex-row items-center gap-3 hover:opacity-50'
    >
      <BotMessageSquare size={24} />
      <h3 className='font-semibold text-lg'>LaheluAI</h3>
    </Link>
  );
};

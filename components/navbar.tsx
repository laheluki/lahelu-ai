import Link from 'next/link';
import { Brand } from './brand';
import { ThemeToggle } from './theme-toggle';
import { SquarePen } from 'lucide-react';
import { buttonVariants } from './ui/button';

const btnVariant = buttonVariants({
  variant: 'link',
  className: 'text-base flex flex-row item-center',
  size: 'sm',
});

export const Navbar = () => {
  return (
    <nav className='w-full flex flex-row items-center justify-between h-24 sm:mb-7 mmb-2 top-0 sticky bg-background'>
      <Brand />
      <div className='flex-row items-center flex'>
        <ThemeToggle />

        <div className='sm:ml-3 flex flex-row items-center'>
          <Link href={'/'} className={btnVariant}>
            <SquarePen className='w-5 h-5 sm:hidden flex' />
            <span className='sm:flex hidden text-base'>New chat</span>
          </Link>
          {/* todo: sidebar & popover model */}
        </div>
      </div>
    </nav>
  );
};

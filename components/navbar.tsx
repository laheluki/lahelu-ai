import { Brand } from './brand';

export const Navbar = () => {
  return (
    <nav className='w-full flex flex-row items-center justify-between h-24 sm:mb-7 mmb-2 top-0 sticky bg-background'>
      <Brand />
      <div className='flex-row items-center flex'>
        {/* todo: menu rigth section */}
      </div>
    </nav>
  );
};

import { Brand } from './brand';
import { ThemeToggle } from './theme-toggle';
import { ModelSelection } from './model-selection';
import { Sidebar } from './sidebar';

export const Navbar = () => {
  return (
    <nav className='w-full flex flex-row items-center justify-between h-24 sm:mb-7 mmb-2 top-0 sticky bg-background'>
      <Brand />
      <div className='flex-row items-center flex'>
        <ThemeToggle />

        <div className='sm:ml-3 flex flex-row items-center'>
          <ModelSelection />
          <Sidebar />
        </div>
      </div>
    </nav>
  );
};

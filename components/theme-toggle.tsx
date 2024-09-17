'use client';

import { useTheme } from 'next-themes';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {theme === 'light' ? (
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setTheme('dark')}
        >
          <Moon className='w-5 h-5' />
        </Button>
      ) : (
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => setTheme('light')}
        >
          <Sun className='w-5 h-5' />
        </Button>
      )}
    </>
  );
};

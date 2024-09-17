import { Navbar } from '@/components/navbar';
import { PropsWithChildren } from 'react';

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

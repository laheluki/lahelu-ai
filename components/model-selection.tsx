/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Bot, CheckIcon, Eye } from 'lucide-react';
import { Button } from './ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command';
import { MODELS } from '@/constants/models';
import { cn } from '@/lib/utils';
import { useModel } from '@/store/model';

export const ModelSelection = () => {
  const [open, setOpen] = useState(false);
  const {
    model: MODEL,
    changeModel,
    setProvider,
  } = useModel((state: any) => state);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          role='combobox'
          aria-expanded={open}
          className='justify-between'
        >
          <span className='sm:flex hidden'>
            {MODEL.label || 'Select model...'}
          </span>
          {MODEL.value && <span className='sm:hidden flex'>{MODEL.label}</span>}

          {!MODEL.value && <Bot className='sm:hidden flex' />}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Command>
          <CommandInput placeholder='Search models...' className='h-9' />
          <CommandList>
            {MODELS.map((providerGroup) => (
              <CommandGroup
                key={providerGroup.provider}
                heading={providerGroup.provider.toUpperCase()}
              >
                {providerGroup.models.length > 0 ? (
                  providerGroup.models.map((model) => (
                    <CommandItem
                      key={model.value}
                      value={model.value}
                      onSelect={() => {
                        setProvider(providerGroup.provider);
                        changeModel(model);
                        setOpen(false);
                      }}
                    >
                      {model.label}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          MODEL.value === model.value
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {model.vision && (
                        <Eye className='w-5 h-5 text-blue-600' />
                      )}
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>
                    No models found for {providerGroup.provider}
                  </CommandEmpty>
                )}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

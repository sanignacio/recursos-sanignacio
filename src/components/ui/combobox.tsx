"use client";

import * as React from "react";
import { useMediaQuery } from "~/hooks/use-media-query";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";

type Option = {
  value: string;
  label: string;
  subOptions?: Option[];
};

export function ComboBoxResponsive({ options }: { options: Option[] }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [stack, setStack] = React.useState<Option[][]>([options]);
  const [selectedPath, setSelectedPath] = React.useState<string[]>([]);
  const [filter, setFilter] = React.useState("");

  const currentOptions = stack[stack.length - 1] ?? [];

  const goBack = () => {
    if (stack.length > 1) {
      setStack((prevStack) => prevStack.slice(0, prevStack.length - 1));
      setFilter("");
      setSelectedPath((prevPath) => prevPath.slice(0, prevPath.length - 1));
    }
  };

  const handleSelect = (option: Option) => {
    if (option.subOptions && option.subOptions.length > 0) {
      setStack((prevStack) => [...prevStack, option.subOptions!]);
      setFilter("");
      setSelectedPath((prevPath) => [
        ...prevPath.slice(0, stack.length - 1),
        option.label,
      ]);
    } else {
      setSelectedPath((prevPath) => [
        ...prevPath.slice(0, stack.length - 1),
        option.label,
      ]);
      setOpen(false);
    }
  };

  const renderContent = (
    <div className="flex flex-col gap-2 p-2">
      {stack.length > 1 && (
        <Button
          variant="ghost"
          onClick={goBack}
          className="flex cursor-pointer items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      )}
      <Command>
        <CommandInput
          placeholder="Filter..."
          value={filter}
          onValueChange={setFilter}
        />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup>
            {currentOptions
              .filter((option) =>
                option.label.toLowerCase().includes(filter.toLowerCase()),
              )
              .map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option)}
                  className="flex cursor-pointer items-center justify-between"
                >
                  <span>{option.label}</span>
                  {option.subOptions && option.subOptions.length > 0 && (
                    <ChevronRight size={16} />
                  )}
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );

  const buttonLabel =
    selectedPath.length > 0 ? selectedPath.join(" / ") : "+ Select option";

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] cursor-pointer justify-start"
          >
            {buttonLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[250px] p-0">
          {renderContent}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] cursor-pointer justify-start"
        >
          {buttonLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="text-center">Select an Option</DrawerTitle>
        {renderContent}
      </DrawerContent>
    </Drawer>
  );
}

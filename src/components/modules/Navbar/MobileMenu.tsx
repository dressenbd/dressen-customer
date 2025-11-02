"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { megaMenuItems } from "@/data/megaMenuItems";

const MobileMenu = () => {
  const allMenuLabels = Object.keys(megaMenuItems) as Array<
    keyof typeof megaMenuItems
  >;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="px-6 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Navigation Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-6 mt-4 ">
          {/* NAV LINKS */}
          <Accordion type="multiple" className="w-full">
            {allMenuLabels.map((label) => (
              <AccordionItem key={label} value={label}>
                <AccordionTrigger className="text-sm font-medium">
                  {label}
                </AccordionTrigger>
                <AccordionContent className="pl-4 text-sm space-y-1">
                  {(megaMenuItems[label] || []).map((section) => (
                    <div key={section.title || label}>
                      {section.title && (
                        <div className="font-semibold mt-2 mb-1">
                          {section.title}
                        </div>
                      )}
                      <ul className="space-y-1">
                        {section.items?.map((item, index) =>
                          item.link ? (
                            <li key={item.label || index}>
                              <Link
                                href={item.link}
                                className="block hover:text-black transition-colors"
                              >
                                {item.label}
                              </Link>
                            </li>
                          ) : (
                            <li key={item.label || index}>
                              <span className="block text-muted-foreground cursor-not-allowed">
                                {item.label}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* Shops */}
            <Link
              href="/shops"
              className="block text-sm hover:text-black
            font-semibold mt-6"
            >
              Shops
            </Link>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

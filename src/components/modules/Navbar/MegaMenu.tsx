import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import MenuSection from "./MenuSection";
import Link from "next/link";
import { MegaMenuItems } from "@/data/megaMenuItems";
import Masonry from "react-masonry-css";

type Props = {
  items: MegaMenuItems;
};

const breakpointColumnsObj = {
  default: 5,
  1024: 5,
  768: 1,
};

const MegaMenu = ({ items }: Props) => {
  return (
    <>
      {(Object.keys(items) as Array<keyof MegaMenuItems>).map((menu) => (
        <NavigationMenuItem key={menu}>
          <NavigationMenuTrigger>{menu}</NavigationMenuTrigger>
          <NavigationMenuContent className="p-6 shadow-lg border bg-white">
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className={`flex gap-6 ${
                menu === "Category" || menu === "Others"
                  ? "w-[200px]"
                  : "w-[800px] xl:w-[900px]"
              }`}
              columnClassName="space-y-4 w-auto"
            >
              {items[menu].map((section, idx) => (
                <MenuSection
                  key={`${section.title || "section"}-${idx}`}
                  title={section.title}
                  items={section.items}
                  link={section.link}
                />
              ))}
            </Masonry>
          </NavigationMenuContent>
        </NavigationMenuItem>
      ))}

      {/* Shops */}
      <NavigationMenuItem>
        <NavigationMenuLink asChild>
          <Link href="/shops" className="hover:text-black">
            Shops
          </Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </>
  );
};

export default MegaMenu;

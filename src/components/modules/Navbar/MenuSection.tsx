import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

type SectionItem = {
  label: string;
  link?: string;
};

type Props = {
  title?: string;
  items?: SectionItem[];
  link?: string;
};

const MenuSection = ({ title, items }: Props) => {
  return (
    <div className="break-inside-avoid mb-4">
      <h4 className="font-semibold mb-2">{title}</h4>

      {items && (
        <ul className="space-y-0 text-sm whitespace-nowrap">
          {items.map(({ label, link }, idx) => (
            <li key={`${label || "item"}-${idx}`}>
              <NavigationMenuLink asChild>
                {link ? (
                  <Link
                    href={link}
                    className="hover:text-black transition-colors"
                  >
                    {label}
                  </Link>
                ) : (
                  <span className=" cursor-not-allowed">{label}</span>
                )}
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuSection;

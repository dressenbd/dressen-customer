export type SectionItem = {
  label: string;
  link?: string;
};
export type Section = {
  title?: string;
  link?: string;
  items?: SectionItem[];
};

export type MegaMenuItems = {
  Category: Section[];
  "Men Wear": Section[];
  "Women Wear": Section[];
  "New Arrival": Section[];
  Others: Section[];
};

export const megaMenuItems: MegaMenuItems = {
  Others: [
    {
      items: [
        {
          label: "all product brand",
          link: "/all-product-brand",
        },
        {
          label: "category",
          link: "/category",
        },
        {
          label: "contact us",
          link: "/contact-us",
        },
        {
          label: "home lunch",
          link: "/home-lunch",
        },
        {
          label: "product collection",
          link: "/product-collection",
        },
        {
          label: "product details",
          link: "/product-details",
        },
        {
          label: "product listing",
          link: "/product-listing",
        },
        {
          label: "terms conditions",
          link: "/terms-conditions",
        },
      ],
    },
  ],
  Category: [
    {
      items: [
        { label: "Modern", link: "/" },
        { label: "Standard", link: "/" },
        { label: "Minimal", link: "/" },
        { label: "Vintage", link: "/" },
        { label: "Classic", link: "/" },
        { label: "Trendy", link: "/" },
        { label: "Elegant", link: "/" },
        { label: "Refined", link: "/" },
        { label: "Fashion", link: "/" },
      ],
    },
  ],
  "Men Wear": [
    {
      title: "Top Wear",
      items: [
        { label: "T-Shirt" },
        { label: "Casual Shirts" },
        { label: "Formal Shirts" },
        { label: "Blazers & Coats" },
        { label: "Suits" },
        { label: "Jackets" },
      ],
    },
    {
      title: "Western Wear",
      items: [
        { label: "Dresses" },
        { label: "Jumpsuits" },
        { label: "Tops, T-shirts & Shirts" },
        { label: "Shorts & Skirts" },
        { label: "Shrugs" },
        { label: "Blazers" },
      ],
    },
    {
      title: "Footwear",
      items: [
        { label: "Flats" },
        { label: "Casual Shoes" },
        { label: "Heels" },
        { label: "Boots" },
      ],
    },
    {
      title: "Lingerie & Sleepwear",
      items: [{ label: "Bra" }, { label: "Briefs" }, { label: "Sleepwear" }],
    },

    {
      title: "Gadgets",
      items: [
        { label: "Smart" },
        { label: "Wearables" },
        { label: "Headphones" },
      ],
    },
    {
      title: "Belt, Scarves & More",
    },
    {
      title: "Plus Size",
    },
    {
      title: "Sports & Active Wear",
      items: [
        { label: "Clothing" },
        { label: "Footwear" },
        { label: "Sports Accessories" },
      ],
    },
    {
      title: "Belt, Scarves & More",
      items: [
        { label: "Makeup" },
        { label: "Skincare" },
        { label: "Premium Beauty" },
        { label: "Lipsticks" },
      ],
    },
    {
      title: "Jewellers",
      items: [{ label: "Fashion Jewellers" }, { label: "Fine Jewellers" }],
    },
    {
      title: "Watches & Wearables",
    },
    {
      title: "Sunglasses & Frames",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: "Backpacks",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: "Handbags & Wallets",
    },
  ],

  "Women Wear": [
    {
      title: "Top Wear",
      items: [
        { label: "T-Shirt" },
        { label: "Casual Shirts" },
        { label: "Formal Shirts" },
        { label: "Blazers & Coats" },
        { label: "Suits" },
        { label: "Jackets" },
      ],
    },
    {
      title: "Western Wear",
      items: [
        { label: "Dresses" },
        { label: "Jumpsuits" },
        { label: "Tops, T-shirts & Shirts" },
        { label: "Shorts & Skirts" },
        { label: "Shrugs" },
        { label: "Blazers" },
      ],
    },
    {
      title: "Footwear",
      items: [
        { label: "Flats" },
        { label: "Casual Shoes" },
        { label: "Heels" },
        { label: "Boots" },
      ],
    },
    {
      title: "Lingerie & Sleepwear",
      items: [{ label: "Bra" }, { label: "Briefs" }, { label: "Sleepwear" }],
    },

    {
      title: "Gadgets",
      items: [
        { label: "Smart" },
        { label: "Wearables" },
        { label: "Headphones" },
      ],
    },
    {
      title: "Belt, Scarves & More",
    },
    {
      title: "Plus Size",
    },
    {
      title: "Sports & Active Wear",
      items: [
        { label: "Clothing" },
        { label: "Footwear" },
        { label: "Sports Accessories" },
      ],
    },
    {
      title: "Belt, Scarves & More",
      items: [
        { label: "Makeup" },
        { label: "Skincare" },
        { label: "Premium Beauty" },
        { label: "Lipsticks" },
      ],
    },
    {
      title: "Jewellers",
      items: [{ label: "Fashion Jewellers" }, { label: "Fine Jewellers" }],
    },
    {
      title: "Watches & Wearables",
    },
    {
      title: "Sunglasses & Frames",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: "Backpacks",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: "Handbags & Wallets",
    },
  ],
  "New Arrival": [
    {
      title: "Top Wear",
      items: [
        { label: "T-Shirt" },
        { label: "Casual Shirts" },
        { label: "Formal Shirts" },
        { label: "Blazers & Coats" },
        { label: "Suits" },
        { label: "Jackets" },
      ],
    },
    {
      title: "Western Wear",
      items: [
        { label: "Dresses" },
        { label: "Jumpsuits" },
        { label: "Tops, T-shirts & Shirts" },
        { label: "Shorts & Skirts" },
        { label: "Shrugs" },
        { label: "Blazers" },
      ],
    },
    {
      title: "Footwear",
      items: [
        { label: "Flats" },
        { label: "Casual Shoes" },
        { label: "Heels" },
        { label: "Boots" },
      ],
    },
    {
      title: "Lingerie & Sleepwear",
      items: [{ label: "Bra" }, { label: "Briefs" }, { label: "Sleepwear" }],
    },

    {
      title: "Gadgets",
      items: [
        { label: "Smart" },
        { label: "Wearables" },
        { label: "Headphones" },
      ],
    },
    {
      title: "Belt, Scarves & More",
    },
    {
      title: "Plus Size",
    },
    {
      title: "Sports & Active Wear",
      items: [
        { label: "Clothing" },
        { label: "Footwear" },
        { label: "Sports Accessories" },
      ],
    },
    {
      title: "Belt, Scarves & More",
      items: [
        { label: "Makeup" },
        { label: "Skincare" },
        { label: "Premium Beauty" },
        { label: "Lipsticks" },
      ],
    },
    {
      title: "Jewellers",
      items: [{ label: "Fashion Jewellers" }, { label: "Fine Jewellers" }],
    },
    {
      title: "Watches & Wearables",
    },
    {
      title: "Sunglasses & Frames",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: "Backpacks",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: " ",
    },
    {
      title: "Handbags & Wallets",
    },
  ],
};

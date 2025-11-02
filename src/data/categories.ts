export type LocalCategory = {
        id: string;
        label: string;
        image?: string;
        children?: { id: string; label: string }[];
      };
      
      export const categories: LocalCategory[] = [
        {
          id: "clothes",
          label: "Shoes",
          image: "/Footwear-9 1.png",
          children: [
            { id: "sneakers", label: "Sneakers" },
            { id: "formal", label: "Formal" },
          ],
        },
        {
          id: "tshirts",
          label: "T-Shirts",
          image: "/mens.png",
          children: [
            { id: "crew", label: "Crew Neck" },
            { id: "vneck", label: "V Neck" },
          ],
        },
        {
          id: "pants",
          label: "Pants",
          image: "/pants.png",
          children: [
            { id: "chino", label: "Chino" },
            { id: "denim", label: "Denim" },
          ],
        },
        {
          id: "watches",
          label: "Watches",
          image: "/Watches-7.png",
          children: [
            { id: "smart", label: "Smart" },
            { id: "analog", label: "Analog" },
          ],
        },
      ];
      
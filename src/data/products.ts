export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  price: number;
  image: string;
  gender: "men" | "women" | "children";
  badge?: string;
};

export const products: Product[] = [
  {
    id: "p1",
    title: "Armani Checked Shirt",
    subtitle: "Casual wear (casual attire)",
    price: 20,
    image: "/new-arrival-1.png",
    gender: "men",
    badge: "best",
  },
  {
    id: "p2",
    title: "Adidas Grey Men's T-shirt",
    subtitle: "Casual wear (casual attire)",
    price: 40,
    image: "/new-arrival-2.png",
    gender: "men",
    badge: "best",
  },
  {
    id: "p3",
    title: "Maniac Red Boys",
    subtitle: "Sporty essentials, these Under",
    price: 20,
    image: "/new-arrival-3.png",
    gender: "men",
    badge: "best",
  },
  {
    id: "p4",
    title: "Louise Vutton Pure Black Shirt",
    subtitle: "Casual wear (casual attire)",
    price: 60,
    image: "/new-arrival-4.png",
    gender: "men",
    badge: "best",
  },
  {
    id: "p5",
    title: "Adidas Grey Men's T-shirt",
    subtitle: "Sporty essentials, these Under",
    price: 60,
    image: "/3.png",
    gender: "men",
    badge: "best",
  },
];

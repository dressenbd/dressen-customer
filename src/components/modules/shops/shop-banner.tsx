interface ShopBannerProps {
  title: string;
  subtitle?: string;
}

export function ShopBanner({ title, subtitle }: ShopBannerProps) {
  return (
    <div className="bg-[#ffd6c9] flex mt-2 items-center px-6 md:px-8 py-8 md:py-10 rounded-md h-auto md:h-[240px]">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-1">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}


export default function SkeletonSection() {
        return (
          <section className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-square rounded-md bg-gray-200" />
                  <div className="h-3 mt-3 bg-gray-200 rounded" />
                  <div className="h-3 mt-2 w-1/2 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </section>
        );
      }
      
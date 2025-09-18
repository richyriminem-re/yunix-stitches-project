import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import QuickView from "@/components/QuickView";
import { Product } from "@/pages/Shop";

interface ProductGridProps {
  products: Product[];
  viewMode: "grid" | "list";
}

const ProductGrid = ({ products, viewMode }: ProductGridProps) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8V4a1 1 0 00-1-1H7a1 1 0 00-1 1v1m2 4v4" />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-serif font-semibold text-primary mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your search or filter criteria to find what you're looking for.
        </p>
      </div>
    );
  }

  const gridClassName = viewMode === "list" 
    ? "space-y-6" 
    : "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 auto-rows-fr";

  return (
    <>
      <div className={gridClassName}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            viewMode={viewMode}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
};

export default ProductGrid;
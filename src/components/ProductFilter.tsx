import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import PriceRangeFilter from "@/components/PriceRangeFilter";
import CategoryFilter from "@/components/CategoryFilter";
import { type Product } from "@/data/products";

interface ProductFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  selectedSizes: string[];
  onSizesChange: (sizes: string[]) => void;
  selectedColors: string[];
  onColorsChange: (colors: string[]) => void;
  quickFilters: string[];
  onQuickFiltersChange: (filters: string[]) => void;
  products: Product[];
}

const ProductFilter = ({
  activeCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedSizes,
  onSizesChange,
  selectedColors,
  onColorsChange,
  quickFilters,
  onQuickFiltersChange,
  products
}: ProductFilterProps) => {
  
  // Extract unique sizes and colors from products
  const availableSizes = Array.from(new Set(products.flatMap(p => p.sizes))).sort();
  const availableColors = Array.from(new Set(products.flatMap(p => p.colors))).sort();

  const quickFilterOptions = [
    { id: "new", label: "New Arrivals", count: products.filter(p => p.isNew).length },
    { id: "bestsellers", label: "Bestsellers", count: products.filter(p => p.isBestseller).length },
    { id: "sale", label: "On Sale", count: products.filter(p => p.originalPrice).length },
    { id: "in-stock", label: "In Stock", count: products.filter(p => p.inStock).length },
  ];

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      onSizesChange([...selectedSizes, size]);
    } else {
      onSizesChange(selectedSizes.filter(s => s !== size));
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      onColorsChange([...selectedColors, color]);
    } else {
      onColorsChange(selectedColors.filter(c => c !== color));
    }
  };

  const handleQuickFilterChange = (filter: string, checked: boolean) => {
    if (checked) {
      onQuickFiltersChange([...quickFilters, filter]);
    } else {
      onQuickFiltersChange(quickFilters.filter(f => f !== filter));
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-serif font-semibold text-primary mb-4">Categories</h3>
        <CategoryFilter 
          activeCategory={activeCategory} 
          onCategoryChange={onCategoryChange} 
        />
      </div>

      <Separator />

      {/* Quick Filters */}
      <div>
        <h3 className="font-serif font-semibold text-primary mb-4">Quick Filters</h3>
        <div className="space-y-3">
          {quickFilterOptions.map((option) => (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={quickFilters.includes(option.id)}
                  onCheckedChange={(checked) => handleQuickFilterChange(option.id, checked as boolean)}
                />
                <label htmlFor={option.id} className="text-sm cursor-pointer">
                  {option.label}
                </label>
              </div>
              <Badge variant="secondary" className="text-xs">
                {option.count}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-serif font-semibold text-primary mb-4">Price Range</h3>
        <PriceRangeFilter
          priceRange={priceRange}
          onPriceRangeChange={onPriceRangeChange}
          min={0}
          max={500000}
        />
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h3 className="font-serif font-semibold text-primary mb-4">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {availableSizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <label htmlFor={`size-${size}`} className="text-sm cursor-pointer">
                {size}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="font-serif font-semibold text-primary mb-4">Colors</h3>
        <div className="space-y-3">
          {availableColors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full border border-border bg-muted" 
                  title={color}
                ></div>
                <label htmlFor={`color-${color}`} className="text-sm cursor-pointer">
                  {color}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Clear Filters */}
      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => {
          onCategoryChange("all");
          onPriceRangeChange([0, 500000]);
          onSizesChange([]);
          onColorsChange([]);
          onQuickFiltersChange([]);
        }}
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default ProductFilter;
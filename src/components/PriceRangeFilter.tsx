import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PriceRangeFilterProps {
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  min: number;
  max: number;
}

const PriceRangeFilter = ({ 
  priceRange, 
  onPriceRangeChange, 
  min, 
  max 
}: PriceRangeFilterProps) => {
  const [tempRange, setTempRange] = useState(priceRange);

  useEffect(() => {
    setTempRange(priceRange);
  }, [priceRange]);

  const handleSliderChange = (value: number[]) => {
    setTempRange(value);
    onPriceRangeChange(value);
  };

  const handleMinInputChange = (value: string) => {
    const numValue = parseInt(value) || min;
    const newRange = [Math.min(numValue, tempRange[1]), tempRange[1]];
    setTempRange(newRange);
    onPriceRangeChange(newRange);
  };

  const handleMaxInputChange = (value: string) => {
    const numValue = parseInt(value) || max;
    const newRange = [tempRange[0], Math.max(numValue, tempRange[0])];
    setTempRange(newRange);
    onPriceRangeChange(newRange);
  };

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <div className="space-y-4">
      {/* Price Range Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="min-price" className="text-xs text-muted-foreground">Min Price</Label>
          <Input
            id="min-price"
            type="number"
            value={tempRange[0]}
            onChange={(e) => handleMinInputChange(e.target.value)}
            className="h-8 text-sm"
            min={min}
            max={max}
          />
        </div>
        <div>
          <Label htmlFor="max-price" className="text-xs text-muted-foreground">Max Price</Label>
          <Input
            id="max-price"
            type="number"
            value={tempRange[1]}
            onChange={(e) => handleMaxInputChange(e.target.value)}
            className="h-8 text-sm"
            min={min}
            max={max}
          />
        </div>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={tempRange}
          onValueChange={handleSliderChange}
          max={max}
          min={min}
          step={5000}
          className="w-full"
        />
      </div>

      {/* Current Range Display */}
      <div className="text-center text-sm text-muted-foreground">
        {formatPrice(tempRange[0])} - {formatPrice(tempRange[1])}
      </div>
    </div>
  );
};

export default PriceRangeFilter;
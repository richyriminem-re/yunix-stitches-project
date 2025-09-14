import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown } from "lucide-react";

interface SortOptionsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortOptions = ({ sortBy, onSortChange }: SortOptionsProps) => {
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "popular", label: "Most Popular" },
  ];

  return (
    <Select value={sortBy} onValueChange={onSortChange}>
      <SelectTrigger className="w-48">
        <ArrowUpDown className="h-4 w-4 mr-2" />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortOptions;
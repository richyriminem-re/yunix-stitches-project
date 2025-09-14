import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const categories = [
    { id: "all", name: "All" },
    { id: "asoebi-wears", name: "Asoebi Wears" },
    { id: "corset", name: "Corset" },
    { id: "corporate-wears", name: "Corporate Wears" },
    { id: "ready-to-wear", name: "Ready to Wear" },
    { id: "bubu", name: "Bubu" },
    { id: "bridal-robe", name: "Bridal Robe" },
    { id: "wedding-gowns", name: "Wedding Gowns" },
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          onClick={() => onCategoryChange(category.id)}
          className={`
            transition-all duration-300 hover:scale-105
            ${activeCategory === category.id 
              ? "btn-bronze shadow-bronze" 
              : "btn-outline-bronze hover:shadow-soft"
            }
          `}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
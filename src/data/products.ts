import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

export interface Product {
  id: number;
  name: string;
  category: string;
  categoryName: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isBestseller?: boolean;
  description: string;
  sizes: string[];
  colors: string[];
  inStock: boolean;
  stockCount?: number;
  tags: string[];
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Emerald Elegance Aso-Ebi",
    category: "asoebi-wears",
    categoryName: "Asoebi Wears",
    price: 185000,
    originalPrice: 220000,
    images: [product1, product2, product3],
    rating: 4.9,
    reviews: 24,
    isNew: true,
    description: "Experience luxury with our stunning Emerald Elegance Aso-Ebi, a masterpiece of Nigerian fashion craftsmanship. This exquisite traditional outfit features intricate gold beadwork meticulously hand-embroidered by skilled artisans, creating a breathtaking pattern that catches the light beautifully. Made from premium quality Ankara fabric with superior draping properties, this ensemble is perfect for weddings, owambe parties, and special celebrations. The modern tailoring ensures a flattering fit while honoring traditional Nigerian style. Each piece is carefully crafted to make you stand out at any event, combining cultural heritage with contemporary elegance.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Emerald", "Navy", "Burgundy"],
    inStock: true,
    stockCount: 5,
    tags: ["luxury", "traditional", "beadwork", "wedding", "owambe", "Nigerian fashion"]
  },
  {
    id: 2,
    name: "Vintage Lace Corset",
    category: "corset",
    categoryName: "Corset",
    price: 45000,
    images: [product2, product1],
    rating: 4.8,
    reviews: 22,
    description: "Discover timeless elegance with our handcrafted Vintage Lace Corset, expertly designed to create the perfect silhouette. This stunning corset features premium quality vintage lace with delicate floral patterns and intricate detailing that exudes sophistication. Constructed with durable boning for excellent support and shape retention, it includes adjustable back lacing for a customizable fit that flatters every body type. The high-quality materials ensure comfort throughout the day while maintaining structure. Ideal for special occasions, photoshoots, bridal wear, or adding a touch of elegance to your evening ensemble. Each corset is carefully crafted in Nigeria by skilled seamstresses who understand the art of perfect fit and feminine beauty.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Black", "Blush"],
    inStock: true,
    tags: ["vintage", "lace", "fitted", "bridal", "elegant", "handcrafted"]
  },
  {
    id: 3,
    name: "Executive Power Suit",
    category: "corporate-wears",
    categoryName: "Corporate Wears",
    price: 85000,
    images: [product3, product2],
    rating: 4.7,
    reviews: 33,
    isNew: true,
    description: "Command attention and confidence with our Executive Power Suit, professionally tailored for the modern Nigerian businesswoman. This sophisticated two-piece ensemble is crafted from premium wool-blend fabric that resists wrinkles and maintains its sharp appearance throughout your busy workday. The blazer features structured shoulders, a flattering cut, and quality lining for comfort and durability. The matching trousers are designed with a modern fit that balances professionalism with style. Perfect for important meetings, corporate events, presentations, and any professional setting where you need to make a lasting impression. Our expert tailors ensure precise measurements and impeccable finishing, giving you a suit that fits like it was made just for you—because it was.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal", "Navy", "Black"],
    inStock: true,
    stockCount: 8,
    tags: ["professional", "tailored", "modern", "corporate", "business", "executive"]
  },
  {
    id: 4,
    name: "Summer Casual Dress",
    category: "ready-to-wear",
    categoryName: "Ready to Wear",
    price: 25000,
    images: [product1, product3],
    rating: 4.5,
    reviews: 41,
    description: "Embrace effortless style with our Summer Casual Dress, designed for the modern woman who values both comfort and elegance. This versatile ready-to-wear piece is crafted from breathable, high-quality cotton fabric that keeps you cool and comfortable all day long. The flattering cut suits various body types, while the timeless design makes it perfect for multiple occasions—from casual brunches to evening gatherings. The dress features thoughtful details like hidden pockets and adjustable straps for added functionality. Easy to care for and wrinkle-resistant, this is your go-to dress for everyday elegance. Proudly made in Nigeria with attention to detail and quality craftsmanship.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Coral", "White", "Navy"],
    inStock: true,
    tags: ["casual", "comfortable", "versatile", "everyday", "cotton"]
  },
  {
    id: 5,
    name: "Royal Blue Bubu",
    category: "bubu",
    categoryName: "Bubu",
    price: 75000,
    images: [product2, product1, product3],
    rating: 4.9,
    reviews: 17,
    isBestseller: true,
    description: "Celebrate Nigerian heritage with our Royal Blue Bubu, a stunning traditional garment that beautifully blends cultural authenticity with contemporary design. This magnificent piece features exquisite embroidery work done by master craftsmen, showcasing intricate patterns that tell a story of tradition and artistry. The flowing silhouette offers both comfort and elegance, making it perfect for cultural events, festivals, religious ceremonies, and special celebrations. Made from premium quality fabric with a luxurious feel and beautiful drape. The rich royal blue color is complemented by gold and purple accents, creating a regal appearance that commands respect and admiration. Each bubu is carefully crafted to ensure perfect finishing and lasting quality.",
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Royal Blue", "Gold", "Purple"],
    inStock: true,
    stockCount: 3,
    tags: ["traditional", "embroidery", "elegant", "cultural", "festive"]
  },
  {
    id: 6,
    name: "Silk Bridal Robe",
    category: "bridal-robe",
    categoryName: "Bridal Robe",
    price: 35000,
    images: [product3, product2],
    rating: 4.7,
    reviews: 15,
    description: "Indulge in luxury on your special day with our Silk Bridal Robe, the perfect addition to your bridal preparations. Crafted from 100% pure silk with delicate lace trim, this exquisite robe feels incredibly soft against your skin while looking absolutely stunning in photographs. The elegant design features a flattering cut that suits all body types, with a secure tie closure and comfortable fit. Ideal for getting ready on your wedding day, bridal photoshoots, or as a thoughtful gift for bridesmaids. The timeless design and neutral colors ensure it will be treasured long after your special day. Each robe is carefully sewn with attention to detail, ensuring durability and beauty that lasts.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Champagne", "Blush"],
    inStock: false,
    tags: ["bridal", "silk", "luxurious", "wedding", "gift"]
  },
  {
    id: 7,
    name: "Champagne Dreams Wedding Gown",
    category: "wedding-gowns",
    categoryName: "Wedding Gowns",
    price: 450000,
    images: [product1, product2, product3],
    rating: 5.0,
    reviews: 18,
    isBestseller: true,
    description: "Make your wedding day truly unforgettable with our Champagne Dreams Wedding Gown, an exquisite masterpiece that combines traditional elegance with modern sophistication. This breathtaking gown features layers of the finest imported lace, hand-beaded with thousands of delicate crystals that shimmer with every movement. The contemporary silhouette flatters your figure while maintaining a classic bridal aesthetic. Expert tailoring ensures a perfect fit that makes you feel confident and beautiful. The gown includes a stunning train, intricate bodice detailing, and thoughtful construction for all-day comfort. Each gown is custom-made to your measurements by our skilled team of bridal specialists. This is more than just a dress—it's the centerpiece of your most important day.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Champagne", "Ivory", "Off-White"],
    inStock: true,
    stockCount: 2,
    tags: ["wedding", "luxury", "custom", "bridal", "lace", "beaded"]
  },
  {
    id: 8,
    name: "Ankara Print Midi Dress",
    category: "ready-to-wear",
    categoryName: "Ready to Wear",
    price: 35000,
    images: [product2, product3],
    rating: 4.6,
    reviews: 28,
    isNew: true,
    description: "Celebrate African culture and contemporary fashion with our Ankara Print Midi Dress, a vibrant statement piece that showcases Nigeria's rich textile heritage. This eye-catching dress features authentic Ankara fabric with bold, colorful patterns that reflect traditional African artistry. The midi length offers versatility and sophistication, while the modern cut ensures a flattering fit for various body types. Perfect for weddings, parties, church services, or any occasion where you want to stand out with confidence and style. The quality construction ensures durability, and the fabric is colorfast and easy to care for. Pair it with heels for a formal look or sandals for casual elegance. Proudly Nigerian-made, this dress is a celebration of our cultural identity.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Multi", "Blue", "Red"],
    inStock: true,
    stockCount: 12,
    tags: ["ankara", "colorful", "african", "cultural", "versatile", "midi"]
  }
];

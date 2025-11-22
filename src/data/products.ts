export interface Product {
    id: string;
    name: string;
    brand: string;
    presentation: string;
    price: number;
    originalPrice?: number;
    images: string[];
    description: string;
    properties: string[];
    categories: string[]; // Changed from category: string
    variantId?: string;
    variantName?: string;
    tags?: string[];
    related?: string[];
    benefits?: string[];
    usage?: string;
    video?: string;
}

export interface Category {
    id: string;
    name: string;
    icon: string;
}

// Helper to get slug from filename
const getSlug = (path: string) => path.split('/').pop()?.replace('.yml', '') || '';

const categoryFiles = import.meta.glob('./categories/*.yml', { eager: true });
export const categories: Category[] = Object.entries(categoryFiles).map(([path, file]: [string, any]) => ({
    ...file.default,
    id: getSlug(path) // Use filename as ID
}));

// Load all product files from the products directory
const productFiles = import.meta.glob('./products/*.yml', { eager: true });
export const products: Product[] = Object.entries(productFiles).map(([path, file]: [string, any]) => {
    const product = file.default;
    return {
        ...product,
        id: getSlug(path), // Use filename as ID
        // Migration helper: if 'category' exists but 'categories' doesn't, map it
        categories: product.categories || (product.category ? [product.category] : [])
    };
});

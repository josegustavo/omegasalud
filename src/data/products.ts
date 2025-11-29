// Imagen individual con metadatos SEO
export interface ProductImage {
    src: string;
    alt: string;
    title?: string;
}

// Estructura completa de imágenes por tipo/uso
export interface ProductImages {
    // Imagen principal para cards, listados, carrito (fondo transparente, solo producto)
    main: ProductImage;
    // Imagen principal decorada para hero de página de producto (fondo transparente + ingredientes sutiles)
    mainDecorated?: ProductImage;
    // Galería de imágenes para página de producto (contexto, usos, detalles)
    gallery?: ProductImage[];
    // Imagen para redes sociales (cuadrada, estilo marketing con beneficios)
    social?: ProductImage;
    // Legacy: mantener compatibilidad con archivos que usen 'og'
    og?: ProductImage;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    presentation: string;
    price: number;
    originalPrice?: number;
    // Nueva estructura de imágenes (recomendada) o formato legacy
    productImages?: ProductImages;
    images?: ProductImage[] | string[]; // Legacy: array de imágenes
    description: string;
    properties: string[];
    categories: string[]; // Changed from category: string
    variantId?: string;
    variantName?: string;
    tags?: string[];
    related?: string[];
    benefits?: string | string[]; // Supports markdown string or legacy array
    usage?: string | string[]; // Supports markdown string or legacy array
    video?: string;
}

// Helper to normalize images to always have src, alt, title
export function normalizeProductImage(image: ProductImage | string, productName: string, index: number): ProductImage {
    if (typeof image === 'string') {
        return {
            src: image,
            alt: `${productName}${index > 0 ? ` - imagen ${index + 1}` : ''}`,
            title: productName
        };
    }
    return image;
}

// Obtiene todas las imágenes de la galería (para página de producto)
export function getProductGallery(product: Product): ProductImage[] {
    // Nueva estructura tiene prioridad
    if (product.productImages) {
        const gallery: ProductImage[] = [product.productImages.main];
        if (product.productImages.gallery) {
            gallery.push(...product.productImages.gallery);
        }
        return gallery;
    }
    // Fallback a estructura legacy
    if (product.images && product.images.length > 0) {
        return product.images.map((img, i) => normalizeProductImage(img, product.name, i));
    }
    // Fallback final
    return [{ src: '/placeholder.png', alt: product.name, title: product.name }];
}

// Obtiene la imagen principal (para cards, listados, carrito)
export function getMainImage(product: Product): ProductImage {
    if (product.productImages?.main) {
        return product.productImages.main;
    }
    // Fallback: primera imagen del array legacy
    if (product.images && product.images.length > 0) {
        return normalizeProductImage(product.images[0], product.name, 0);
    }
    return { src: '/placeholder.png', alt: product.name, title: product.name };
}

// Obtiene la imagen hero para página de producto (decorada o main si no existe)
export function getHeroImage(product: Product): ProductImage {
    // Si tiene imagen decorada, usarla para el hero
    if (product.productImages?.mainDecorated) {
        return product.productImages.mainDecorated;
    }
    // Fallback: usar imagen principal
    return getMainImage(product);
}

// Obtiene la imagen para redes sociales (WhatsApp, Instagram, Facebook)
export function getSocialImage(product: Product): ProductImage {
    // Si tiene imagen social específica, usarla
    if (product.productImages?.social) {
        return product.productImages.social;
    }
    // Fallback: imagen og (legacy)
    if (product.productImages?.og) {
        return product.productImages.og;
    }
    // Fallback: usar imagen principal
    return getMainImage(product);
}

// Legacy alias para compatibilidad
export function getOgImage(product: Product): ProductImage {
    return getSocialImage(product);
}

// Legacy: mantener compatibilidad con código existente
export function getProductImages(product: Product): ProductImage[] {
    return getProductGallery(product);
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

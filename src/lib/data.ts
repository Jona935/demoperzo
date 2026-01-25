import { Product, Category, Order } from './types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vestido Floral Primavera',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=600',
    category: 'vestidos',
    badge: 'sale',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa', 'Blanco'],
    description: 'Vestido floral perfecto para la temporada de primavera. Tela ligera y cómoda.',
    stock: 15
  },
  {
    id: '2',
    name: 'Blusa Elegante Satín',
    price: 799,
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=600',
    category: 'tops',
    badge: 'new',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Negro', 'Blanco'],
    description: 'Blusa de satín con acabado elegante. Ideal para ocasiones especiales.',
    stock: 20
  },
  {
    id: '3',
    name: 'Pantalón Wide Leg',
    price: 999,
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600',
    category: 'bottoms',
    badge: 'bestseller',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Negro', 'Beige', 'Marrón'],
    description: 'Pantalón de pierna ancha con cintura alta. Comodidad y estilo.',
    stock: 25
  },
  {
    id: '4',
    name: 'Collar Dorado Minimal',
    price: 399,
    image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600',
    category: 'accesorios',
    badge: 'new',
    sizes: ['Único'],
    colors: ['Dorado', 'Plateado'],
    description: 'Collar minimalista con baño de oro. Perfecto para uso diario.',
    stock: 30
  },
  {
    id: '5',
    name: 'Vestido Midi Negro',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
    category: 'vestidos',
    badge: 'bestseller',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Negro'],
    description: 'Vestido midi elegante en negro. Un clásico imprescindible.',
    stock: 18
  },
  {
    id: '6',
    name: 'Top Crop Encaje',
    price: 599,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600',
    category: 'tops',
    badge: 'sale',
    sizes: ['XS', 'S', 'M'],
    colors: ['Blanco', 'Negro', 'Rosa'],
    description: 'Top crop con detalles de encaje. Romántico y femenino.',
    stock: 12
  },
  {
    id: '7',
    name: 'Falda Plisada Rosa',
    price: 899,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9a?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=600',
    category: 'bottoms',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa', 'Beige', 'Negro'],
    description: 'Falda plisada midi con cintura elástica. Elegancia en cada paso.',
    stock: 22
  },
  {
    id: '8',
    name: 'Aretes Perla Delicados',
    price: 299,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600',
    category: 'accesorios',
    badge: 'new',
    sizes: ['Único'],
    colors: ['Perla', 'Dorado'],
    description: 'Aretes con perla de agua dulce. Delicados y sofisticados.',
    stock: 40
  },
  {
    id: '9',
    name: 'Vestido Boho Maxi',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1485968579169-a6e9dc7ccd5e?w=600',
    category: 'vestidos',
    sizes: ['S', 'M', 'L'],
    colors: ['Terracota', 'Verde', 'Beige'],
    description: 'Vestido maxi estilo bohemio con estampado floral.',
    stock: 10
  },
  {
    id: '10',
    name: 'Camiseta Básica Premium',
    price: 499,
    image: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600',
    category: 'tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Blanco', 'Negro', 'Gris', 'Rosa'],
    description: 'Camiseta básica de algodón premium. Esencial en tu guardarropa.',
    stock: 50
  },
  {
    id: '11',
    name: 'Jeans Mom Fit',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600',
    category: 'bottoms',
    badge: 'bestseller',
    sizes: ['24', '26', '28', '30', '32'],
    colors: ['Azul claro', 'Azul oscuro'],
    description: 'Jeans mom fit de tiro alto. Comodidad retro.',
    stock: 35
  },
  {
    id: '12',
    name: 'Bolso Tote Beige',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600',
    hoverImage: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600',
    category: 'accesorios',
    badge: 'sale',
    sizes: ['Único'],
    colors: ['Beige', 'Negro', 'Marrón'],
    description: 'Bolso tote espacioso perfecto para el día a día.',
    stock: 15
  }
];

export const categories: Category[] = [
  {
    id: '1',
    name: 'Vestidos',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    slug: 'vestidos'
  },
  {
    id: '2',
    name: 'Tops',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600',
    slug: 'tops'
  },
  {
    id: '3',
    name: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600',
    slug: 'bottoms'
  },
  {
    id: '4',
    name: 'Accesorios',
    image: 'https://images.unsplash.com/photo-1611923134239-b9be5816e23c?w=600',
    slug: 'accesorios'
  }
];

export const orders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'María García',
    email: 'maria@email.com',
    total: 2298,
    status: 'delivered',
    date: '2025-01-20',
    items: []
  },
  {
    id: 'ORD-002',
    customer: 'Ana López',
    email: 'ana@email.com',
    total: 1499,
    status: 'shipped',
    date: '2025-01-22',
    items: []
  },
  {
    id: 'ORD-003',
    customer: 'Laura Martínez',
    email: 'laura@email.com',
    total: 3197,
    status: 'processing',
    date: '2025-01-24',
    items: []
  },
  {
    id: 'ORD-004',
    customer: 'Carmen Rodríguez',
    email: 'carmen@email.com',
    total: 899,
    status: 'pending',
    date: '2025-01-25',
    items: []
  },
  {
    id: 'ORD-005',
    customer: 'Sofia Hernández',
    email: 'sofia@email.com',
    total: 1698,
    status: 'delivered',
    date: '2025-01-18',
    items: []
  }
];

export const dashboardStats = {
  totalSales: 45890,
  totalOrders: 127,
  totalProducts: 48,
  totalCustomers: 89
};

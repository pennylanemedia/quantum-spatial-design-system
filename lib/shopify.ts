// Shopify API Integration for Petersen Games
// Complete API setup with product fetching and cart management

// Shopify API Configuration
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN) {
  throw new Error('Missing Shopify environment variables');
}

const SHOPIFY_GRAPHQL_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

// GraphQL client
async function shopifyFetch<T>(query: string, variables?: Record<string, any>): Promise<T> {
  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
  }

  return result.data;
}

// Product Types for Petersen Games
export interface PetersenProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  category: 'core-games' | 'expansions' | 'miniatures' | 'books' | 'accessories' | 'digital';
  subcategory?: string;
  tags: string[];
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  compareAtPriceRange?: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  featuredImage?: {
    url: string;
    altText?: string;
    width: number;
    height: number;
  };
  images: Array<{
    url: string;
    altText?: string;
    width: number;
    height: number;
  }>;
  variants: Array<{
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
    compareAtPrice?: {
      amount: string;
      currencyCode: string;
    };
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
  }>;
  availableForSale: boolean;
  // Miniature-specific fields
  characterClass?: string;
  race?: string;
  faction?: string;
  unitType?: string;
  baseType?: string;
}

// Cart Types
export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    selectedOptions: Array<{
      name: string;
      value: string;
    }>;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: {
        url: string;
        altText?: string;
      };
    };
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface Cart {
  id: string;
  totalQuantity: number;
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
  lines: CartItem[];
  checkoutUrl: string;
}

// GraphQL Queries
const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

// Get all products
export async function getAllProducts(): Promise<PetersenProduct[]> {
  const query = `
    query GetAllProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<{
    products: {
      edges: Array<{ node: any }>;
    };
  }>(query, { first: 250 });

  return data.products.edges.map(({ node }) => mapShopifyProduct(node));
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<PetersenProduct[]> {
  const query = `
    query GetProductsByTag($tag: String!, $first: Int!) {
      products(first: $first, query: $tag) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<{
    products: {
      edges: Array<{ node: any }>;
    };
  }>(query, { 
    tag: `tag:category-${category}`,
    first: 250 
  });

  return data.products.edges.map(({ node }) => mapShopifyProduct(node));
}

// Search products
export async function searchProducts(query: string): Promise<PetersenProduct[]> {
  const searchQuery = `
    query SearchProducts($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<{
    products: {
      edges: Array<{ node: any }>;
    };
  }>(searchQuery, { 
    query: `title:*${query}* OR tag:*${query}*`,
    first: 50 
  });

  return data.products.edges.map(({ node }) => mapShopifyProduct(node));
}

// Get single product
export async function getProduct(handle: string): Promise<PetersenProduct | null> {
  const query = `
    query GetProduct($handle: String!) {
      product(handle: $handle) {
        ...ProductFragment
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<{
    product: any;
  }>(query, { handle });

  return data.product ? mapShopifyProduct(data.product) : null;
}

// Filter products for miniatures
export async function getFilteredMiniatures(filters: {
  characterClass?: string[];
  race?: string[];
  faction?: string[];
  unitType?: string[];
  baseType?: string[];
}): Promise<PetersenProduct[]> {
  // Build tag queries for each filter
  const tagQueries: string[] = [];
  
  if (filters.characterClass?.length) {
    tagQueries.push(`(${filters.characterClass.map(c => `tag:class-${c.toLowerCase().replace(' ', '-')}`).join(' OR ')})`);
  }
  if (filters.race?.length) {
    tagQueries.push(`(${filters.race.map(r => `tag:race-${r.toLowerCase().replace(' ', '-')}`).join(' OR ')})`);
  }
  if (filters.faction?.length) {
    tagQueries.push(`(${filters.faction.map(f => `tag:faction-${f.toLowerCase().replace(' ', '-')}`).join(' OR ')})`);
  }
  if (filters.unitType?.length) {
    tagQueries.push(`(${filters.unitType.map(u => `tag:unit-${u.toLowerCase().replace(' ', '-')}`).join(' OR ')})`);
  }
  if (filters.baseType?.length) {
    tagQueries.push(`(${filters.baseType.map(b => `tag:base-${b.toLowerCase().replace(' ', '-')}`).join(' OR ')})`);
  }

  const filterQuery = `tag:category-miniatures${tagQueries.length ? ' AND ' + tagQueries.join(' AND ') : ''}`;

  const query = `
    query GetFilteredMiniatures($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            ...ProductFragment
          }
        }
      }
    }
    ${PRODUCT_FRAGMENT}
  `;

  const data = await shopifyFetch<{
    products: {
      edges: Array<{ node: any }>;
    };
  }>(query, { 
    query: filterQuery,
    first: 250 
  });

  return data.products.edges.map(({ node }) => mapShopifyProduct(node));
}

// Cart Management
export async function createCart(): Promise<Cart> {
  const query = `
    mutation CartCreate {
      cartCreate {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartCreate: {
      cart: any;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(query);

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(`Cart creation failed: ${data.cartCreate.userErrors[0].message}`);
  }

  return mapShopifyCart(data.cartCreate.cart);
}

export async function addToCart(cartId: string, variantId: string, quantity: number = 1): Promise<Cart> {
  const query = `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    selectedOptions {
                      name
                      value
                    }
                    product {
                      id
                      handle
                      title
                      featuredImage {
                        url
                        altText
                      }
                    }
                  }
                }
                cost {
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: any;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>(query, {
    cartId,
    lines: [{
      merchandiseId: variantId,
      quantity
    }]
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(`Add to cart failed: ${data.cartLinesAdd.userErrors[0].message}`);
  }

  return mapShopifyCart(data.cartLinesAdd.cart);
}

export async function getCart(cartId: string): Promise<Cart> {
  const query = `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    id
                    handle
                    title
                    featuredImage {
                      url
                      altText
                    }
                  }
                }
              }
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
        checkoutUrl
      }
    }
  `;

  const data = await shopifyFetch<{
    cart: any;
  }>(query, { cartId });

  return mapShopifyCart(data.cart);
}

// Helper function to map Shopify product to our format
function mapShopifyProduct(shopifyProduct: any): PetersenProduct {
  // Extract category from tags
  const categoryTag = shopifyProduct.tags.find((tag: string) => tag.startsWith('category-'));
  const category = categoryTag ? categoryTag.replace('category-', '') : 'core-games';

  // Extract miniature-specific data from tags
  const characterClassTag = shopifyProduct.tags.find((tag: string) => tag.startsWith('class-'));
  const raceTag = shopifyProduct.tags.find((tag: string) => tag.startsWith('race-'));
  const factionTag = shopifyProduct.tags.find((tag: string) => tag.startsWith('faction-'));
  const unitTypeTag = shopifyProduct.tags.find((tag: string) => tag.startsWith('unit-'));
  const baseTypeTag = shopifyProduct.tags.find((tag: string) => tag.startsWith('base-'));

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    category: category as PetersenProduct['category'],
    tags: shopifyProduct.tags,
    priceRange: shopifyProduct.priceRange,
    compareAtPriceRange: shopifyProduct.compareAtPriceRange,
    featuredImage: shopifyProduct.featuredImage,
    images: shopifyProduct.images.edges.map((edge: any) => edge.node),
    variants: shopifyProduct.variants.edges.map((edge: any) => edge.node),
    availableForSale: shopifyProduct.availableForSale,
    // Miniature-specific fields
    characterClass: characterClassTag ? characterClassTag.replace('class-', '').replace('-', ' ') : undefined,
    race: raceTag ? raceTag.replace('race-', '').replace('-', ' ') : undefined,
    faction: factionTag ? factionTag.replace('faction-', '').replace('-', ' ') : undefined,
    unitType: unitTypeTag ? unitTypeTag.replace('unit-', '').replace('-', ' ') : undefined,
    baseType: baseTypeTag ? baseTypeTag.replace('base-', '').replace('-', ' ') : undefined,
  };
}

// Helper function to map Shopify cart to our format
function mapShopifyCart(shopifyCart: any): Cart {
  return {
    id: shopifyCart.id,
    totalQuantity: shopifyCart.totalQuantity,
    cost: shopifyCart.cost,
    lines: shopifyCart.lines.edges.map((edge: any) => edge.node),
    checkoutUrl: shopifyCart.checkoutUrl,
  };
}

// Product categorization helper
export function getProductsByPetersenCategory(products: PetersenProduct[], category: string): PetersenProduct[] {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
}

// Miniature filtering helper
export function filterMiniatureProducts(
  products: PetersenProduct[], 
  filters: {
    characterClass?: string[];
    race?: string[];
    faction?: string[];
    unitType?: string[];
    baseType?: string[];
  }
): PetersenProduct[] {
  return products.filter(product => {
    if (product.category !== 'miniatures') return false;

    if (filters.characterClass?.length && product.characterClass) {
      if (!filters.characterClass.includes(product.characterClass)) return false;
    }
    if (filters.race?.length && product.race) {
      if (!filters.race.includes(product.race)) return false;
    }
    if (filters.faction?.length && product.faction) {
      if (!filters.faction.includes(product.faction)) return false;
    }
    if (filters.unitType?.length && product.unitType) {
      if (!filters.unitType.includes(product.unitType)) return false;
    }
    if (filters.baseType?.length && product.baseType) {
      if (!filters.baseType.includes(product.baseType)) return false;
    }

    return true;
  });
}
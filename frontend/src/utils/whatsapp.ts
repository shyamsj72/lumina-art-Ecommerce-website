import { CartItem, Product, ProductVariant } from '../types';

export const WHATSAPP_PHONE_NUMBER = '918590729342';
export const DISPLAY_PHONE_NUMBER = '+91 8590 729 342';

/**
 * Creates a direct WhatsApp URL with custom encoded message
 */
export function createWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Quick order message for a single product with selected variant and quantity
 */
export function openWhatsAppQuickOrder(
  product: Product,
  variant: ProductVariant,
  quantity = 1
): void {
  const lineTotal = variant.price * quantity;
  const message = [
    `Hi Lumina Art! I'm interested in ordering:`,
    ``,
    `1. ${product.name} (${variant.thickness}) x${quantity} - ₹${lineTotal.toFixed(0)}`,
    ``,
    `Total: ₹${lineTotal.toFixed(0)}`,
    ``,
    `Please let me know the details!`,
  ].join('\n');

  window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}

/**
 * Checkout message for the entire cart
 */
export function openWhatsAppCartCheckout(
  items: CartItem[],
  customTotal?: number
): void {
  if (items.length === 0) return;

  const total =
    customTotal !== undefined
      ? customTotal
      : items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  const lines = items.map((item, idx) => {
    const lineTotal = item.variant.price * item.quantity;
    return `${idx + 1}. ${item.product.name} (${item.variant.thickness}) x${item.quantity} - ₹${lineTotal.toFixed(0)}`;
  });

  const message = [
    `Hi Lumina Art! I'm interested in ordering:`,
    ``,
    ...lines,
    ``,
    `Total: ₹${total.toFixed(0)}`,
    ``,
    `Please let me know the details!`,
  ].join('\n');

  window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}

/**
 * General contact inquiry link
 */
export function openWhatsAppGeneralInquiry(): void {
  const message = `Hi Lumina Art! I'm exploring your custom CNC name boards and acrylic craft catalog. Could you share more information about custom designs and dispatch?`;
  window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}

/**
 * Custom design quote request via WhatsApp
 */
export function openWhatsAppCustomDesignQuote(details: {
  requestId?: string;
  name: string;
  phone?: string;
  email?: string;
  material?: string;
  size?: string;
  customizationDetails: string;
  hasFile?: boolean;
  fileName?: string;
}): void {
  const lines = [
    `🎨 *Custom Design Request - Lumina Art*`,
    details.requestId ? `*Quote ID:* ${details.requestId}` : '',
    details.name ? `*Customer Name:* ${details.name}` : '',
    details.phone ? `*Phone:* ${details.phone}` : '',
    details.email ? `*Email:* ${details.email}` : '',
    details.material ? `*Preferred Material/Style:* ${details.material}` : '',
    details.size ? `*Approx Dimensions:* ${details.size}` : '',
    details.hasFile ? `*Reference Attached:* Yes (${details.fileName || 'Image/PDF design'})` : '',
    ``,
    `*Customization Requirements:*`,
    details.customizationDetails,
    ``,
    `I'm sharing my reference design file here. Please provide a quote and digital preview mock!`,
  ].filter(Boolean);

  const message = lines.join('\n');
  window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}

/**
 * Contact form submission forwarded to WhatsApp
 */
export function openWhatsAppContactMessage(details: {
  name: string;
  email?: string;
  phone?: string;
  subject: string;
  message: string;
}): void {
  const lines = [
    `📩 *Message for Lumina Art Team*`,
    `*From:* ${details.name}`,
    details.phone ? `*Phone/WhatsApp:* ${details.phone}` : '',
    details.email ? `*Email:* ${details.email}` : '',
    `*Subject:* ${details.subject}`,
    ``,
    `*Message:*`,
    details.message,
  ].filter(Boolean);

  const message = lines.join('\n');
  window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
}


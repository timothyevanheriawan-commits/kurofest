"use server";

import { createClient } from "@/lib/supabase/supabase-server";

export type SubmitOrderResult =
  | { success: true; confirmationCode: string }
  | { success: false; error: string };

/**
 * Inserts a completed ticket order into the `orders` table.
 *
 * Card data is intentionally NOT accepted here — we only persist:
 *   customer_name, customer_email, ticket_type, ticket_price, confirmation_code.
 * In production, replace this with a Stripe PaymentIntent confirmation
 * and store the paymentIntentId instead of processing card data yourself.
 */
export async function submitOrder(input: {
  customerName: string;
  customerEmail: string;
  ticketType: "standard" | "premium" | "vip";
}): Promise<SubmitOrderResult> {
  // Basic server-side validation — never trust the client
  if (!input.customerName?.trim())
    return { success: false, error: "Name is required." };
  if (!input.customerEmail?.includes("@"))
    return { success: false, error: "Valid email is required." };
  if (!["standard", "premium", "vip"].includes(input.ticketType)) {
    return { success: false, error: "Invalid ticket type." };
  }

  const confirmationCode = `KF26-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const supabase = await createClient();

  const PRICING = {
    standard: 8500,
    premium: 15000,
    vip: 35000,
  };
  const actualPrice = PRICING[input.ticketType];

  const { error } = await supabase.from("orders").insert({
    customer_name: input.customerName.trim(),
    customer_email: input.customerEmail.trim().toLowerCase(),
    ticket_type: input.ticketType,
    ticket_price: actualPrice,
    confirmation_code: confirmationCode,
    status: "completed",
  });

  if (error) {
    console.error("submitOrder:", error.message);
    return {
      success: false,
      error: "Could not save your order. Please try again.",
    };
  }

  return { success: true, confirmationCode };
}

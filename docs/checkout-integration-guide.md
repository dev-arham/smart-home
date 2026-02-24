# Integrating the Order System with the Checkout Page

This guide explains how to wire the existing `CheckoutPage` component to the `placeOrder` server action to create real orders.

---

## Architecture Overview

```
CheckoutPage (client component)
  ├── Redux cart state (items from localStorage)
  ├── Shipping form fields (name, phone, address, city)
  └── "Confirm Order" button
        │
        ▼
placeOrder server action (src/server/orders/index.ts)
  ├── Reads session (optional — guests supported)
  ├── Validates with Zod (createOrderSchema)
  └── Calls createOrderService → DB transaction
        │
        ▼
Order created with status "pending"
  ├── Shipping address saved
  ├── Product prices/conversions snapshotted
  └── Stock soft-checked (not deducted until admin confirms)
```

---

## What the Server Action Expects

The `placeOrder` action has this signature:

```ts
placeOrder(_prevState: unknown, formData: FormData)
```

### Required FormData Fields

| Field            | Type        | Description                                        |
|------------------|-------------|----------------------------------------------------|
| `customerName`   | `string`    | Customer's full name                               |
| `phone`          | `string`    | Phone number                                       |
| `address`        | `string`    | Delivery address                                   |
| `city`           | `string`    | City name                                          |
| `items`          | `string`    | **JSON string** of cart items (see format below)   |
| `notes`          | `string`    | Optional order notes                               |
| `shippingFee`    | `string`    | Shipping cost, defaults to `"250"` if omitted      |

### Items JSON Format

The `items` field must be a JSON-encoded array where each item has:

```json
[
  {
    "productId": "uuid-of-product",
    "quantity": 2,
    "sellType": "unit"
  },
  {
    "productId": "uuid-of-another-product",
    "quantity": 1,
    "sellType": "box"
  }
]
```

| Property    | Type                           | Required |
|-------------|--------------------------------|----------|
| `productId` | `string` (UUID)                | Yes      |
| `quantity`   | `number` (integer, min 1)     | Yes      |
| `sellType`  | `"unit"` \| `"box"` \| `"carton"` | Yes  |

### Response Shape

```ts
// Success
{ success: true, orderId: "uuid", orderNumber: "ORD-20260224-A1B2" }

// Validation error
{ success: false, error: "Validation failed.", fieldErrors: { phone: ["Phone is required"] } }

// Business logic error
{ success: false, error: "Insufficient stock for product ..." }
```

---

## Step-by-Step Implementation

### 1. Update the Cart Slice to Store `sellType`

The current cart item shape is `{ id, title, price, image, quantity }`. It does not include `sellType`. You need to add it.

**File:** `src/store/cartSlice.js`

Update the `addTocart` reducer to accept and store `sellType`:

```js
addTocart: (state, action) => {
  const item = action.payload;
  const existingItem = state.items.find(i => i.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
      sellType: item.sellType || "unit",  // <-- add this
    });
  }
  saveCartToStorage(state.items);
},
```

Then wherever you dispatch `addTocart`, pass the product's `sellType`:

```js
dispatch(addTocart({
  id: product.id,
  title: product.name,
  price: Number(product.price),
  image: product.thumbnailUrl,
  sellType: product.sellType,  // "unit" | "box" | "carton"
}));
```

If you want to skip this step for now, you can hard-code `"unit"` as the default in step 3 below.

---

### 2. Update CheckoutPage with Form State and Action

**File:** `src/components/blocks/checkoutPage.jsx`

Add imports for the server action and necessary hooks:

```jsx
"use client";

import { useActionState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

import { placeOrder } from "@/server/orders";
import { clearCart } from "@/store/cartSlice";

// ... existing UI imports
```

### 3. Build the Form and Wire the Action

Replace the component body to use `useActionState` with the `placeOrder` server action:

```jsx
export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const router = useRouter();
  const formRef = useRef(null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 250;
  const total = subtotal + shipping;

  // Wire server action
  const [state, formAction, isPending] = useActionState(placeOrder, null);

  // Handle response
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      router.push(`/order-success?orderNumber=${state.orderNumber}`);
    } else {
      toast.error(state.error || "Failed to place order.");
    }
  }, [state, dispatch, router]);

  // Transform cart items to the format the server expects
  const itemsPayload = cartItems.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    sellType: item.sellType || "unit",
  }));

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8 mt-30">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <form ref={formRef} action={formAction}>
          {/* Hidden fields for items and shipping */}
          <input type="hidden" name="items" value={JSON.stringify(itemsPayload)} />
          <input type="hidden" name="shippingFee" value={shipping} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Fields */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>
                    Enter your details to complete your order
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Full Name</Label>
                    <Input id="customerName" name="customerName" required />
                    {state?.fieldErrors?.customerName && (
                      <p className="text-sm text-destructive">
                        {state.fieldErrors.customerName[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" type="tel" required />
                    {state?.fieldErrors?.phone && (
                      <p className="text-sm text-destructive">
                        {state.fieldErrors.phone[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea id="address" name="address" rows={3} required />
                    {state?.fieldErrors?.address && (
                      <p className="text-sm text-destructive">
                        {state.fieldErrors.address[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" required />
                    {state?.fieldErrors?.city && (
                      <p className="text-sm text-destructive">
                        {state.fieldErrors.city[0]}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Order Notes (optional)</Label>
                    <Textarea id="notes" name="notes" rows={2} />
                  </div>

                  <Separator />
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Payment Method</h3>
                    <p className="text-sm text-muted-foreground">
                      Cash on Delivery
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* ...existing cart items list... */}

                  {cartItems.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        {/* ...subtotal, shipping, total display... */}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isPending || cartItems.length === 0}
                      >
                        {isPending ? "Placing Order..." : "Confirm Order"}
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
```

### Key Changes Summary

| What | Before | After |
|------|--------|-------|
| Form element | None | `<form action={formAction}>` wraps the entire page |
| Input names | Only `id` attributes | Added `name` attributes matching the server schema |
| Items data | Not sent anywhere | Hidden input with `JSON.stringify(itemsPayload)` |
| Submit button | Empty `onClick` handler | `type="submit"` with `isPending` loading state |
| Response handling | None | `useEffect` watching `state` for success/error |
| Cart clearing | Never | `dispatch(clearCart())` on success |
| Redirect | None | `router.push("/order-success?orderNumber=...")` |

---

### 4. Update the Order Success Page to Show Real Data

The current `OrderSuccess` component uses hardcoded data. To display the real order, read the `orderNumber` from the URL query param and fetch the order.

**File:** `src/app/(storefront)/order-success/page.jsx`

```jsx
import { getOrderByOrderNumber } from "@/lib/queries/order.queries";
import OrderSuccess from "@/components/blocks/OrderSuccess";

export const metadata = {
  title: "Order Confirmed | Aqua Electrical",
  description: "Your order has been placed successfully.",
};

export default async function OrderSuccessPage({ searchParams }) {
  const params = await searchParams;
  const orderNumber = params?.orderNumber;

  let order = null;
  if (orderNumber) {
    order = await getOrderByOrderNumber(orderNumber);
  }

  return <OrderSuccess order={order} />;
}
```

Then update the `OrderSuccess` component to accept an `order` prop and render real data:

```jsx
export default function OrderSuccess({ order }) {
  // Fall back to placeholder if no order data
  if (!order) {
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold">Order Confirmed</h1>
          <p className="mt-2 text-muted-foreground">
            Your order has been placed successfully.
          </p>
        </div>
      </div>
    );
  }

  return (
    /* Render using:
       order.orderNumber
       order.totalAmount
       order.shippingAddress.customerName
       order.shippingAddress.address
       order.shippingAddress.city
       order.orderItems[].product.name
       order.orderItems[].product.thumbnailUrl
       order.orderItems[].quantity
       order.orderItems[].unitPrice
       order.orderItems[].lineTotal
       order.orderItems[].sellType
    */
  );
}
```

---

## Important Notes

### The `items` Array Must Use Product UUIDs

The cart currently stores `item.id` which should be the product's UUID from the database. Verify that when products are added to the cart, the `id` is the actual product UUID (from `products.id`), not a slug or index.

### sellType Per Item

The server validates that each item has a `sellType` of `"unit"`, `"box"`, or `"carton"`. If the cart doesn't track `sellType` yet, the simplest interim approach is to default to `"unit"`:

```js
const itemsPayload = cartItems.map((item) => ({
  productId: item.id,
  quantity: item.quantity,
  sellType: "unit",  // default until cart supports sellType
}));
```

### No Stock Deduction at Checkout

Orders are created with status `"pending"`. Stock is **not** deducted when an order is placed. An admin must confirm the order from `/admin/orders` to deduct stock. This is by design for COD workflows.

### Guest vs. Authenticated Users

The `placeOrder` action automatically reads the session. If the user is logged in, `userId` is attached to the order. If not, the order is created as a guest order. No frontend logic is needed for this distinction.

### Error Handling

The server returns structured errors:

```js
// Field-level validation errors
{
  success: false,
  error: "Validation failed.",
  fieldErrors: {
    phone: ["Phone is required"],
    customerName: ["Name is required"]
  }
}

// Business logic errors (stock, product not found, etc.)
{
  success: false,
  error: "Insufficient stock for product abc-123: requested 5 unit(s), available 3"
}
```

Display `fieldErrors` inline under each form field, and show the top-level `error` as a toast notification.

---

## File Reference

| File | Role |
|------|------|
| `src/server/orders/index.ts` | `placeOrder` server action |
| `src/lib/validations/order.validations.ts` | Zod schema (`createOrderSchema`) |
| `src/lib/services/order.service.ts` | `createOrder` business logic |
| `src/lib/queries/order.queries.ts` | `getOrderByOrderNumber` for success page |
| `src/store/cartSlice.js` | Redux cart (needs `sellType` added) |
| `src/components/blocks/checkoutPage.jsx` | Checkout UI (wire to `placeOrder`) |
| `src/components/blocks/OrderSuccess.jsx` | Success page (wire to real order data) |

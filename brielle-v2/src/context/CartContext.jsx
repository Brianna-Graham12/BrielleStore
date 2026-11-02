
/*
    BRIELLE SKINCARE WEBSITE

    File: CartContext.jsx
    Author: Brianna Graham

    Description:
    Stores products added to the shopping bag.

    Shares the bag across the entire website
    and saves selections in localStorage.
*/

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "brielle-shopping-bag";

function loadSavedBag() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {

    const [cart, setCart] = useState(loadSavedBag);

    // Save the bag whenever it changes
    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(cart)
        );
    }, [cart]);

    // Add a product or increase its existing quantity
    function addToCart(product, scent, size, quantity = 1) {

        const key = [
            product.id,
            scent || "all-scents",
            size.label
        ].join("|");

        setCart((current) => {

            const existing = current.find(
                (item) => item.key === key
            );

            if (existing) {
                return current.map((item) =>
                    item.key === key
                        ? {
                            ...item,
                            quantity: Math.min(
                                10,
                                item.quantity + quantity
                            )
                        }
                        : item
                );
            }

            // Server checkout supports a maximum of 20 lines
            if (current.length >= 20) {
                return current;
            }

            return [
                ...current,
                {
                    key,
                    productId: product.id,
                    name: product.name,
                    scent,
                    size: size.label,
                    price: size.price,
                    quantity: Math.min(10, quantity)
                }
            ];
        });
    }

    // Change the quantity of an existing item
    function updateQuantity(key, quantity) {

        setCart((current) =>
            current.map((item) =>
                item.key === key
                    ? {
                        ...item,
                        quantity: Math.max(
                            1,
                            Math.min(10, quantity)
                        )
                    }
                    : item
            )
        );
    }

    // Remove an item entirely
    function removeFromCart(key) {
        setCart((current) =>
            current.filter((item) => item.key !== key)
        );
    }

    // Empty the bag
    function clearCart() {
        setCart([]);
    }

    // Count all individual products
    const cartCount = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Calculate displayed subtotal
    const subtotal = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                subtotal,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {

    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider."
        );
    }

    return context;
}

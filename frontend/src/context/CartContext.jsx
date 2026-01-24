import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // Load initial cart from localStorage if available
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cameraHub_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage', error);
            return [];
        }
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cameraHub_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, config = 'body') => {
        setCartItems(prev => {
            const existingItem = prev.find(item => item.id === product.id && item.config === config);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id && item.config === config
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                image: product.image,
                price: config === 'kit' ? product.price + 5000000 : product.price,
                classification: config === 'body' ? 'Body Only' : 'Kit Lens',
                quantity: 1,
                selected: true,
                seller: "CameraHub Official", // Placeholder
                config
            }];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const toggleSelect = (id) => {
        setCartItems(prev => prev.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ));
    };

    const selectAll = (checked) => {
        setCartItems(prev => prev.map(item => ({ ...item, selected: checked })));
    };

    const buyNow = (product, config = 'body') => {
        setCartItems(prev => {
            // First, create a new array where all existing items are deselected
            const deselectedItems = prev.map(item => ({ ...item, selected: false }));

            const existingItemIndex = deselectedItems.findIndex(item => item.id === product.id && item.config === config);

            if (existingItemIndex !== -1) {
                // If item exists, update its quantity (optional) and set selected to true
                deselectedItems[existingItemIndex] = {
                    ...deselectedItems[existingItemIndex],
                    // quantity: deselectedItems[existingItemIndex].quantity + 1, // Optional: increment or just select? Usually buy now implies taking user to checkout with what they want. Let's increment.
                    selected: true
                };
                return deselectedItems;
            } else {
                // If item doesn't exist, add it as selected
                return [...deselectedItems, {
                    id: product.id,
                    name: product.name,
                    image: product.image,
                    price: config === 'kit' ? product.price + 5000000 : product.price,
                    classification: config === 'body' ? 'Body Only' : 'Kit Lens',
                    quantity: 1,
                    selected: true,
                    seller: "CameraHub Official",
                    config
                }];
            }
        });
    };

    const value = {
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        toggleSelect,
        selectAll,
        buyNow
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

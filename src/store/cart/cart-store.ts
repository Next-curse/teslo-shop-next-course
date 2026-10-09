import { CartProduct, Product } from "@/src/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface State {
    cart: CartProduct[];

    // Methods
    getTotalItems: () => number;
    getSummaryInformation: () => {
        subTotal: number;
        total: number;
        taxes: number;
        totalQuantity: number;
    };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;

    clearCart: VoidFunction
}


export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],


            //Methods
            getTotalItems: () => {
                const { cart } = get();
                const totalQuantity = cart.reduce((acum, current) => acum + current.quantity, 0)
                return totalQuantity;
            },

            getSummaryInformation: () => {
                const { cart } = get();
                const subTotal = cart.reduce((acum, current) => acum + (current.price * current.quantity), 0)
                const taxes = (subTotal * 0.15);
                const total = subTotal + taxes;
                const totalQuantity = cart.reduce((acum, current) => acum + current.quantity, 0)
                return {
                    subTotal,
                    total,
                    taxes,
                    totalQuantity
                }
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();
                // 1. Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                }

                //2. Se que elk prpouecto existye por talla, entonces debo incrementar
                const updatedCartProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item;
                })
                set({ cart: updatedCartProduct });
                return;

            },
            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();
                const cartWithUpdatedProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item;
                })
                set({ cart: cartWithUpdatedProduct });
                return;
            },

            removeProduct: (product: CartProduct) => {
                const { cart } = get();
                const cartWithoutProduct = cart.filter(
                    item => (item.id !== product.id || item.size !== product.size))
                set({ cart: cartWithoutProduct });
                return;
            },

            clearCart: () => {
                set({ cart: [] })
            }
        }),

        {
            name: 'shopping-cart',
        }
    )

)
export default function CartButton() {
    return (
        <div className="fixed bottom-8 right-8 z-40">
            <button className="relative w-16 h-16 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-105 hover:shadow-primary/60 active:scale-95 transition-all">
                <span className="material-symbols-outlined text-3xl">
                    shopping_cart
                </span>
                <span className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                    2
                </span>
            </button>
        </div>
    );
}

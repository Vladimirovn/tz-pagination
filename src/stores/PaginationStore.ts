import { defineStore } from "pinia";
import { ref } from 'vue';

export const usePaginationStore = defineStore('paginationStore', () => {
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const totalItems = ref(0);
    const products = ref<any[]>([]);

    const setCurrentPage = (page: number) => {
        currentPage.value = page;
    };

    const setTotalItems = (count: number) => {
        totalItems.value = count;
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            products.value = data;
            console.log(products.value);
            
            setTotalItems(data.length); // Устанавливаем общее количество продуктов
        } catch (error) {
            console.error('Ошибка при загрузке продуктов:', error);
        }
    };

    return {
        currentPage,
        itemsPerPage,
        totalItems,
        products,
        setCurrentPage,
        setTotalItems,
        fetchProducts,
    };
})
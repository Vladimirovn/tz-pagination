<template>
    <div>
        <h1>Catalog</h1>
        <div class="pagination">
            <ul class="pag-buttons-container">
                <li><button @click="goToFirstPage" :disabled="currentPage === 1">Первая</button></li>
                <li><button @click="goToPreviousPage" :disabled="currentPage === 1">Предыдущая</button></li>
                <li v-for="page in totalPages" :key="page">
                    <button 
                        class="pag-button"
                        @click="paginationStore.setCurrentPage(page)"
                    >{{ page }}</button>
                </li>
                <li><button @click="goToNextPage" :disabled="currentPage === totalPages">Следующая</button></li>
                <li><button @click="goToLastPage" :disabled="currentPage === totalPages">Последняя</button></li>
                <li>
                    <select v-model="paginationStore.itemsPerPage" @change="paginationStore.setCurrentPage(1)">
                        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">{{ option }}</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="products">
            <div v-for="product in paginatedProducts" :key="product.id">
                <h3>{{ product.title }}</h3>
                <p>{{ product.description }}</p>
                <p>Цена: {{ product.price }}$</p>
                <img :src="product.image" alt="product image" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { usePaginationStore } from '../stores/PaginationStore';
    import { computed, onMounted } from 'vue';

    const paginationStore = usePaginationStore();

    const totalPages = computed(() => Math.ceil(paginationStore.totalItems / paginationStore.itemsPerPage));
    const itemsPerPageOptions = [5, 10, 20, 50];

    const goToFirstPage = () => paginationStore.setCurrentPage(1);
    const goToLastPage = () => paginationStore.setCurrentPage(totalPages.value);
    const goToNextPage = () => {
        if (paginationStore.currentPage < totalPages.value) {
            paginationStore.setCurrentPage(paginationStore.currentPage + 1);
        }
    };
    const goToPreviousPage = () => {
        if (paginationStore.currentPage > 1) {
            paginationStore.setCurrentPage(paginationStore.currentPage - 1);
        }
    };
    
    const paginatedProducts = computed(() => {
      const start = (paginationStore.currentPage - 1) * paginationStore.itemsPerPage;
      const end = start + paginationStore.itemsPerPage;
      return paginationStore.products.slice(start, end);
    });

    onMounted(() => {
      paginationStore.fetchProducts(); // Загружаем продукты при монтировании компонента
    });
</script>

<style>
.pagination {
    padding-left: 20%;
}
select {
    margin-top: 1em;
}
.products {
  margin-top: 20px;
}
.products div {
  margin-bottom: 15px;
}
.pag-buttons-container {
  display: flex;
  list-style: none;
  border-radius: 0.25rem;
}

</style>
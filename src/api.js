import { API_URL } from './config';

export const getCategories = async () => {
    const response = await fetch(API_URL + 'category/getcategory');
    return await response.json();
};

export const getCategoryByName = async (name) => {
    const response = await fetch(API_URL + 'category/getcategory/' + name);
    return await response.json();
};

export const getAutoComplete = async (str) => {
    const response = await fetch(API_URL + 'product/autocomplete?searchString=' + str.toLowerCase());
    return await response.json();
}

export const getProductById = async (idProd) => {
    const response = await fetch(API_URL + 'product/byid/' + idProd);
    return await response.json();
}

export const getProductsByCategoryName = async (catName) => {
    const response = await fetch(API_URL + 'product/category/' + catName);
    return await response.json();
}

export const getProductsBySubCategoryName = async (subCatName) => {
    const response = await fetch(API_URL + 'product/subcategory/' + subCatName);
    return await response.json();
}

export const getNewProducts = async () => {
    const response = await fetch(API_URL + 'product/new');
    return await response.json();
}

export const getPopularProducts = async () => {
    const response = await fetch(API_URL + 'product/popular');
    return await response.json();
}
export const getSaleProducts = async () => {
    const response = await fetch(API_URL + 'product/sale');
    return await response.json();
}

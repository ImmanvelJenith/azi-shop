import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface ProductFilterState {
  category: string[];
  priceRange: [number, number];
  brand: string[];
  rating: number;
  sortBy: string;
  page: number;
  pageSize: number;
  searchQuery: string;
}

interface ProductContextType {
  filters: ProductFilterState;
  setCategory: (category: string[]) => void;
  setPriceRange: (priceRange: [number, number]) => void;
  setBrand: (brand: string[]) => void;
  setRating: (rating: number) => void;
  setSortBy: (sortBy: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setSearchQuery: (query: string) => void;
  resetFilters: () => void;
}

const defaultFilterState: ProductFilterState = {
  category: [],
  priceRange: [0, 1000],
  brand: [],
  rating: 0,
  sortBy: 'popularity',
  page: 1,
  pageSize: 10,
  searchQuery: '',
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getInitialState = useCallback(() => {
    const params = new URLSearchParams(location.search);
    return {
      category: params.get('category')?.split(',') || defaultFilterState.category,
      priceRange: params.get('priceRange')?.split('-').map(Number) as [number, number] || defaultFilterState.priceRange,
      brand: params.get('brand')?.split(',') || defaultFilterState.brand,
      rating: Number(params.get('rating')) || defaultFilterState.rating,
      sortBy: params.get('sortBy') || defaultFilterState.sortBy,
      page: Number(params.get('page')) || defaultFilterState.page,
      pageSize: Number(params.get('pageSize')) || defaultFilterState.pageSize,
      searchQuery: params.get('searchQuery') || defaultFilterState.searchQuery,
    };
  }, [location.search]);

  const [filters, setFilters] = useState<ProductFilterState>(getInitialState);

  // Effect to update state when URL changes (e.g., browser back/forward)
  useEffect(() => {
    setFilters(getInitialState());
  }, [location.search, getInitialState]);

  const updateUrl = useCallback((newFilters: ProductFilterState) => {
    const params = new URLSearchParams();
    if (newFilters.category.length > 0) params.set('category', newFilters.category.join(','));
    if (newFilters.priceRange[0] !== defaultFilterState.priceRange[0] || newFilters.priceRange[1] !== defaultFilterState.priceRange[1]) {
      params.set('priceRange', `${newFilters.priceRange[0]}-${newFilters.priceRange[1]}`);
    }
    if (newFilters.brand.length > 0) params.set('brand', newFilters.brand.join(','));
    if (newFilters.rating !== defaultFilterState.rating) params.set('rating', newFilters.rating.toString());
    if (newFilters.sortBy !== defaultFilterState.sortBy) params.set('sortBy', newFilters.sortBy);
    if (newFilters.page !== defaultFilterState.page) params.set('page', newFilters.page.toString());
    if (newFilters.pageSize !== defaultFilterState.pageSize) params.set('pageSize', newFilters.pageSize.toString());
    if (newFilters.searchQuery !== defaultFilterState.searchQuery) params.set('searchQuery', newFilters.searchQuery);

    navigate({ search: params.toString() }, { replace: true });
  }, [navigate]);

  const setFilter = useCallback((key: keyof ProductFilterState, value: any) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [key]: value };
      updateUrl(newFilters);
      return newFilters;
    });
  }, [updateUrl]);

  const setCategory = useCallback((category: string[]) => setFilter('category', category), [setFilter]);
  const setPriceRange = useCallback((priceRange: [number, number]) => setFilter('priceRange', priceRange), [setFilter]);
  const setBrand = useCallback((brand: string[]) => setFilter('brand', brand), [setFilter]);
  const setRating = useCallback((rating: number) => setFilter('rating', rating), [setFilter]);
  const setSortBy = useCallback((sortBy: string) => setFilter('sortBy', sortBy), [setFilter]);
  const setPage = useCallback((page: number) => setFilter('page', page), [setFilter]);
  const setPageSize = useCallback((pageSize: number) => setFilter('pageSize', pageSize), [setFilter]);
  const setSearchQuery = useCallback((query: string) => setFilter('searchQuery', query), [setFilter]);

  const resetFilters = useCallback(() => {
    setFilters(defaultFilterState);
    updateUrl(defaultFilterState);
  }, [updateUrl]);

  return (
    <ProductContext.Provider
      value={{
        filters,
        setCategory,
        setPriceRange,
        setBrand,
        setRating,
        setSortBy,
        setPage,
        setPageSize,
        setSearchQuery,
        resetFilters,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

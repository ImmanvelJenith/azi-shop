import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import type { Category } from '../types/type';
import { categoryService } from '../api/categories';

interface CategoryContextValue {
  categories: Category[];
  categoryTree: Category[];
  loading: boolean;
  getCategoryBySlug: (slug: string) => Category | undefined;
  refreshCategories: () => Promise<void>;
}

export const CategoryContext = createContext<CategoryContextValue>({} as CategoryContextValue);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryTree, setCategoryTree] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const [allCategories, tree] = await Promise.all([
        categoryService.getAll(),
        categoryService.getTree(),
      ]);
      setCategories(allCategories);
      setCategoryTree(tree);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
      setCategoryTree([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const getCategoryBySlug = useCallback(
    (slug: string): Category | undefined => {
      return categories.find((cat) => cat.slug === slug);
    },
    [categories]
  );

  const value = {
    categories,
    categoryTree,
    loading,
    getCategoryBySlug,
    refreshCategories: fetchCategories,
  };

  return <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>;
};

export const useCategory = () => {
  return useContext(CategoryContext);
};


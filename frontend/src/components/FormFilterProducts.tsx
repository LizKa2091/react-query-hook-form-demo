import React, { FC, useMemo, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';

interface IProduct {
   id: number;
   name: string;
   price: number;
   category: string;
};
 
const products: IProduct[] = [
   { id: 1, name: "Ноутбук", price: 50000, category: "Электроника" },
   { id: 2, name: "Книга", price: 500, category: "Книги" },
   { id: 3, name: "Смартфон", price: 30000, category: "Электроника" },
   { id: 4, name: "Кофеварка", price: 10000, category: "Бытовая техника" },
];

interface IFormTypes {
   search: string;
   category: string;
   maxPrice: number;
};

const FormFilterProducts: FC = () => {
   const { register, watch, reset } = useForm<IFormTypes>({
      defaultValues: { maxPrice: Math.max(...products.map(p => p.price)) }
   });
   const { search, category, maxPrice } = watch();

   const inputRef = useRef<HTMLInputElement>(null);

   const filteredProducts = useMemo(() => {
      return products.filter((product) => {
         const matchesSearch = product.name.toLowerCase().includes(search?.toLowerCase() || "");
         const matchesCategory = !category || product.category === category;
         const matchesPrice = !maxPrice || product.price <= maxPrice;

         return matchesSearch && matchesCategory && matchesPrice;
      });
   }, [search, category, maxPrice]);

   const handleReset = useCallback(() => {
      reset();
      inputRef.current?.focus();
   }, [reset]);

   return (
      <>
         <form>
            <input 
               {...register('search')} ref={inputRef}
               type="text" name="productName" id="productName" placeholder='название'
            />
            <label htmlFor="category">категория</label>
            <select {...register('category')} name="category" id="category">
               <option value="">Все категории</option>
               {Array.from(new Set(products.map(p => p.category))).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
               ))}
            </select>
            <label htmlFor="maxPrice">максимальная цена</label>
            <input 
               {...register('maxPrice')} max={Math.max(...products.map(p => p.price))}
               type="range" min="0" step="1000" 
            />
            <input {...register('maxPrice')} type="range" name="maxPridce" id="maxPrice" />
            <button onClick={ handleReset }>сбросить</button>
         </form>
         <ul>
         {filteredProducts && filteredProducts.length > 0 && (
            filteredProducts.map((product: IProduct) => 
                  <li key={product.id}>{product.name} - {product.price}₽</li>
            )
         )}
      </ul>
      </>
   )
};

export default FormFilterProducts;
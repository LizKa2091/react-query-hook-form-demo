import React, { FC, useState, useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
interface IFormInput {
  selectedCities: string[];
}
const FromMultiSelect: FC = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const [selectedCities, setSelectedCities] = useState<string[]>([]);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   
   const { register, handleSubmit, setValue } = useForm<IFormInput>({
      defaultValues: { selectedCities: [] }
   });

   const cities = ["Москва",
      "Санкт-Петербург",
      "Новосибирск",
      "Екатеринбург",
      "Казань",
      "Нижний Новгород",
      "Челябинск",
      "Самара",
      "Омск",
      "Ростов-на-Дону",
   ];
   
   const filteredCities = useMemo(() => {
      return cities.filter(city =>
         city.toLowerCase().includes(searchTerm.toLowerCase())
      );
   }, [searchTerm, cities]);

   const toggleCity = (city: string) => {
      const newSelectedCities = selectedCities.includes(city)
         ? selectedCities.filter(c => c !== city)
         : [...selectedCities, city];
      setSelectedCities(newSelectedCities);
      setValue('selectedCities', newSelectedCities);
   };

   const onSubmit = (data: IFormInput) => console.log(data);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
         }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   return (
      <form
         style={{ display: 'flex', flexDirection: 'column', width: '350px' }}
         onSubmit={handleSubmit(onSubmit)}
      >
         <div ref={dropdownRef} style={{ position: 'relative' }}>
            <input 
               type='text' placeholder='Поиск города'
               value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onFocus={() => setIsDropdownOpen(true)}   
            />
            <input type="hidden" {...register('selectedCities')} />
            {isDropdownOpen && (
               <div>
                  {filteredCities.map((city) => (
                     <div key={city} onClick={() => toggleCity(city)}>
                        {city}
                     </div>
                  ))}
               </div>
            )}
         </div>
         <button type='submit' style={{ marginTop: '10px' }}>отправить</button>
         <div>
            выбранное: {selectedCities.join(', ')}
         </div>
      </form>
   );
};

export default FromMultiSelect;
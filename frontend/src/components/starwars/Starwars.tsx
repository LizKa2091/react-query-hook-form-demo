import React, { FC, useState } from 'react';
import { useEntities, useEntityById } from './useStarwars';
import { IEntity } from '../../types/starwars.types';

const Starwars: FC = () => {
   const [selectedId, setSelectedId] = useState<number | null>(null);
   const { data: allEntities, isLoading } = useEntities();
   const { data: entity } = useEntityById(selectedId!);

   const handleEntityExpand = (id: number) => {
      setSelectedId(id);
   };

   return (
      <div>
         <div>список персонажей из звёздных войн:</div>
         {isLoading &&
            <span>пожалуйста, дождитесь полной загрузки</span>
         }
         {!isLoading && (
            <ul style={{display: 'flex', flexDirection: 'column'}}>
               {allEntities?.results?.map((entity: IEntity) => 
                  <li key={entity.id}>
                     <p>{entity.name}</p>
                     <button onClick={() => handleEntityExpand(entity.id)}>подробнее</button>
                  </li>
               )}
            </ul>
         )}
         {selectedId && entity && (
        <div>
          <h3>{entity.name}</h3>
          <p>рост: {entity.height}</p>
          <p>вес: {entity.mass}</p>
          <p>год рождения: {entity.birth_year}</p>
        </div>
      )}
      </div>
   )
}

export default Starwars;
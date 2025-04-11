import React, { FC } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

type FormValues = {
   name: string;
   address: string;
   telephone?: string;
   pizzas: PizzaValues[];
};

type PizzaValues = {
   size: "small" | "medium" | "large";
   extras: {
      cheeseBorder: boolean;
      spicy: boolean;
      vegetarian: boolean;
   };
};

const FormOrderPizza: FC = () => {
   const { register, handleSubmit, reset, control, formState: { errors} } = useForm<FormValues>({defaultValues: {
      pizzas: [{
         size: "medium",
         extras: {
            cheeseBorder: false,
            spicy: false,
            vegetarian: false
         }
      }]
   }});

   const { fields, append, remove } = useFieldArray({ name: 'pizzas', control });

   const onSubmit = (data: FormValues) => {
      console.log(data);
      reset();
   };
  
   return (
      <div>
         <form onSubmit={ handleSubmit(onSubmit) }>
            <div className="client-info">
               <input {...register('name', { required: 'имя обязательно', minLength: {  value: 2, message: 'минимум 2 символа' } })} placeholder='имя'/>
               {errors.name && <p className="error">{errors.name.message}</p>}
               <input {...register('address', { required: 'адрес обязателен' })} placeholder='адрес'/>
               {errors.address && <p className="error">{errors.address.message}</p>}
               <input {...register('telephone', { pattern: { value: /^[0-9]+$/, message: 'только цифры' } })} type='tel' placeholder='номер телефона' />
               {errors.telephone && <p className="error">{errors.telephone.message}</p>}
            </div>
            {fields.map((field, index) => (
               <div key={field.id} className="pizza-item">
                  <h3>Пицца #{index + 1}</h3>
               
                  <div className="pizza-size">
                     Размер пиццы:
                     <label>
                        <input type="radio" value="small" {...register(`pizzas.${index}.size`)} />
                        Маленькая
                     </label>
                     
                     <label>
                        <input type="radio" value="medium" {...register(`pizzas.${index}.size`)} defaultChecked/>
                        Средняя
                     </label>
                     
                     <label>
                        <input type="radio" value="large" {...register(`pizzas.${index}.size`)} />
                        Большая
                     </label>
                  </div>
               
                  <div className='pizza-extra'>
                     Дополнительно:
                     <label>
                        <input type="checkbox" {...register(`pizzas.${index}.extras.cheeseBorder`)} />
                        Сырный бортик
                     </label>
                     
                     <label>
                        <input type="checkbox" {...register(`pizzas.${index}.extras.spicy`)} />
                        Острая
                     </label>
                     
                     <label>
                        <input type="checkbox" {...register(`pizzas.${index}.extras.vegetarian`)} />
                        Вегетарианская
                     </label>
                  </div>
                  {fields.length > 1 && (
                     <button type="button" onClick={() => remove(index)} className="pizza-action__button">
                        Удалить пиццу
                     </button>
                  )}
               </div>
            ))}
            <div className="pizza-action">
               <button type="button" onClick={() => append({
                  size: "medium",
                  extras: {
                     cheeseBorder: false,
                     spicy: false,
                     vegetarian: false
                  }
               })}
               className="pizza-action__button"
               >
                  Добавить пиццу
               </button>
            </div>
            <button type='submit' className="button-submit">
               Подтвердить заказ
            </button>
         </form>
      </div>
   )
};

export default FormOrderPizza;
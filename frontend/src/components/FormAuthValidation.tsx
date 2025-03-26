import React, { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type IInputs = {
   email: string,
   password: string
};

const FormAuthValidation: FC = () => {
   const {
      register,
      handleSubmit,
      formState: { errors }
   } = useForm<IInputs>();

   const onSubmit: SubmitHandler<IInputs> = data => console.log(data);

   return (
      <form onSubmit={ handleSubmit(onSubmit) }>
         {/* специально у email type text, чтобы предотвратить дефолтную проверку и протестировать именно кастомную проверку */}
         <input type='text' placeholder="email" aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', { 
               required: "поле email обязательное", 
               pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'некорректный формат email'
               } 
            })} 
         />
         {errors.email &&
            <p>ошибка, {errors.email.message}</p>
         }
         <input type='password' placeholder="password" aria-invalid={errors.password ? 'true' : 'false'}
            {...register('password', { 
               required: "поле пароль обязательное", 
               minLength: {
                  value: 6, message: 'пароль должен быть не короче 6 символов'
               } 
            })} 
         />
         {errors.password &&
            <p>ошибка, {errors.password.message}</p>
         }
         <input type="submit" />
      </form>
   );
};

export default FormAuthValidation;
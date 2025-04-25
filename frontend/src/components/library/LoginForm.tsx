import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from './AuthContext';

type LoginFormData = {
   username: string;
   password: string;
};

const LoginForm: FC<LoginFormData> = () => {
   const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
   const { login } = useAuth();

   const formSubmit = (data: LoginFormData) => {
      if (login(data.username, data.password)) {
         console.log('успешный вход')
      }
      else {
         console.log('неуспешный вход')
      }
   };

   return (
     <form onSubmit={handleSubmit(formSubmit)}>
         <input {...register('username', { required: 'логин обязателен' })} placeholder='логин'/>
         {errors.username && <div>{errors.username.message}</div>}
         <input type="password" {...register('password', { required: 'пароль обязателен' })} placeholder='пароль'/>
         {errors.password && <div>{errors.password.message}</div>}
         <button type="submit">войти</button>
     </form> 
   );
};

export default LoginForm;
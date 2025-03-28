import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  firstName: string
  lastName: string
  age: number
};

export default function FormValidationExample() {
   const { register, handleSubmit } = useForm<IFormInput>()
   const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)

   return (
      /* "handleSubmit" проводит валидацию инпутов перед вызовом onSubmit */
      <form onSubmit={ handleSubmit(onSubmit) }>
         <input {...register("firstName", { required: true, maxLength: 20 })} />
         <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
         <input type="number" {...register("age", { min: 18, max: 99 })} />
         <input type="submit" />
      </form>
   )
};
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  example: string
  exampleRequired: string
};

export default function FormExample() {
  const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<Inputs>();

   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

   console.log(watch("example")); // ставится наблюдение за input "example"

   return (
      /* "handleSubmit" проводит валидацию инпутов перед вызовом onSubmit */
      <form onSubmit={ handleSubmit(onSubmit) }>
         {/* регистрация инпута в хуке посредством вызова функции "register". регистрируется как "example" */}
         <input defaultValue="test" {...register("example")} />

         {/* валидация с required. больше валидаций см в FormValidationExample.tsx */}
         <input {...register("exampleRequired", { required: true })} />

         {/* возврат ошибок в случае неуспешной валидации */}
         {errors.exampleRequired && <span>This field is required</span>}
         <input type="submit" />
      </form>
   )
};
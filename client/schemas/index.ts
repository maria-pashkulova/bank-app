import { z } from "zod";

export const RegisterSchema = z.object({
    pid:z.string().nonempty('Моля, въведете ЕГН!').regex(/^\d{10}$/, "Невалидно ЕГН!"),
    idNum: z.union([
      z.string().regex(/^\d{9}$/, "Невалидно ЛНЧ!"),
      z.literal(""),
    ]),
    cyrillicName:z.string().nonempty('Моля, въведете име').regex(/^[А-Яа-я\s]+$/, "Въведеното име съдържа символи на латиница!"),
    latinName:z.string().nonempty('Моля, въведете име').regex(/^[A-Za-z\s]+$/, "Въведеното име съдържа символи на кирилица!"),
    email:z.string().nonempty('Моля, въведете имейл').email({message:'Невалиден и-мейл!' }),
    phone:z.string().nonempty('Моля, въведете телефон'),
    address:z.string().nonempty('Моля, въведете адрес'),
    username: z.string().nonempty('Моля, въведете потребителско име').regex(/^[^А-Яа-я]+$/, "Символи на кирилица не са позволени!"),
    password:z.string().nonempty('Mоля, въведете парола').regex(/^(?=.*\d+)(?=.*[A-Za-z]+)[^А-Яа-я]{6,24}$/, "Спазвайте посочените изисквания за парола!"),
    confirmPassword:z.string().nonempty("Моля, повторете паролата!")
}).refine((data) => data.password === data.confirmPassword, {
    message: "Паролата не съвпада!",
    path: ["confirmPassword"], // this shows the error under the repeatPass field
  });



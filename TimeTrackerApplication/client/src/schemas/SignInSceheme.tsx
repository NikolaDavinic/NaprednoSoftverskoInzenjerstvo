import {z} from 'zod'

export const SingInScheme = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
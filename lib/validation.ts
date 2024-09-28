import { z } from "zod"

 export const UploadSchema = z.object({
    title: z.string().min(1),
    image: z.instanceof(File).refine((file) => file.size > 0,{
        message: "Image is required"
    })
    .refine((file) => file.size === 0 || file.type.startsWith("image/"),{
        message: "Only images are allowed"
    })
    .refine((file) => file.size < 4000000, {
        message: "Image must less 4MB"
    })

})

export const EditSchema = z.object({
    title: z.string().min(1),
    image: z.instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"),{
        message: "Only images are allowed"
    })
    .refine((file) => file.size < 4000000, {
        message: "Image must less 4MB"
    })
    .optional()
})

"use server"

import { del, put } from "@vercel/blob"
import { UploadSchema, } from "./validation"
import { prisma} from '@/lib/prisma'
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getImageById } from "./data"
import { EditSchema, } from "./validation"

export const uploadImage = async (prevState: unknown, formData: FormData) =>{
    const validatedFile = UploadSchema.safeParse(
        Object.fromEntries(formData.entries())
    )
    
    if (!validatedFile.success) {
        return {
            error:validatedFile.error.flatten().fieldErrors
        }
    }

    const {title, image} = validatedFile.data
    const {url} = await put(image.name, image, {
        access: "public",
        multipart: true
    });

    try {
        await prisma?.upload.create({
            data:{
                title,
                image: url
            }
        })
    } catch (error) {
        return {
            message: "Failed to upload data" 
        }
        console.log(error);
    }

    revalidatePath("/");
    redirect("/")
}



export const updateImage = async (id: string, prevState: unknown, formData: FormData) =>{
    const validatedFile = EditSchema.safeParse(
        Object.fromEntries(formData.entries())
    )
    
    if (!validatedFile.success) {
        return {
            error:validatedFile.error.flatten().fieldErrors
        }
    }

    const data = await getImageById(id) 

    if (!data) {
        return {
            message: "No data found"
        }
    }

    const {title, image} = validatedFile.data
    let imagePath;
    if (!image || image.size <= 0 ) {
        imagePath = data.image
    }else {
        await del(data.image)
        const {url} = await put(image.name, image, {
            access: "public",
            multipart: true
        });
        imagePath = url
    }
   

    try {
        await prisma?.upload.update({
            data:{
                title,
                image: imagePath,
            },
            where: {
                id
            }
        })
    } catch (error) {
        return {
            message: "Failed to update data" 
        }
        console.log(error);
    }

    revalidatePath("/");
    redirect("/")
}

export const deleteImage = async (id: string) => {
    const data = await getImageById(id) 
    if (!data) {
        return {
            message: "No data found"
        }
    }
    await del(data.image )
    try {
        await prisma.upload.delete({
            where: {id}
        })
    } catch (error) {
        console.log(error);
        return {
            message: "Failed to delete data"
        } 
    }
    revalidatePath("/")
}


"use client"

import { deleteImage } from "@/lib/action"
import clsx from "clsx"
import Link from "next/link"
import { useFormStatus } from "react-dom"

export const SubmitButton = ({label}:{label:string}) => {

    const {pending} = useFormStatus()
    return (
        <button className={clsx('bg-blue-700 text-white w-full font-medium py-2.5 px-6 text-base rounded-sm hover:bg-blue-600', {
            "opacity-50 cursor-progress": pending
        })} 
        disabled={pending}>
            {label === "upload" ? (
                <>
                    {pending? "Uploading..." : "Upload"}
                </>
            ) : (
                <>
                {pending? "Updating..." : "Update"}
            </>
            )}
         </button>
    )
}

export const EditButton = ({id}:{id:string}) => {
    return (
        <Link href={`edit/${id}`} className="py-3 text-sm bg-gray-50 w-full rounded rounded-bl-md hover:bg-gray-100 text-center">Edit</Link>
    )
}

export const DeleteButton = ({id}:{id:string}) => {
    const deleteImageWithId = deleteImage.bind(null, id)

    return (
       <form action={deleteImageWithId} 
       className="py-3 text-sm bg-gray-50 w-full  rounded rounded-br-md hover:bg-gray-100 text-center">
            <DeleteBtn />
       </form>
    )
}

const DeleteBtn = () => {
    const {pending} = useFormStatus()
    return (
        <button type="submit" disabled={pending}>{pending ? "Deleting..." : "Delete"}</button>
    )
}
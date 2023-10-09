import { redirect } from "next/navigation";

import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children
}: {children: React.ReactNode}) {
    const {userId} = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    });

    //se estiver logado, apresentamos o primeiro negocio dele
    if (store) {
        redirect(`/${store.id}`);
    }

    //caso contrario mostra o form
    return (
        <>
            {children}
        </>
    )
}
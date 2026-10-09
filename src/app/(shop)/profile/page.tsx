import { auth } from "@/src/auth.config";
import { Title } from "@/src/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user) redirect('/auth/login')


    return (
        <div>
            <Title title="Perfile" />
            <pre>
                {
                    JSON.stringify(session?.user, null, 2)
                }
            </pre>
        </div>
    );
}
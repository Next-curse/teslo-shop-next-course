import { Footer, SideMenu, TopMenu } from "@/src/components";

export default function ShopLayoutLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen">
            <TopMenu />
            <SideMenu />

            <div className="px-0 sm:px-5">

                {children}
            </div>

            <Footer />
        </main>
    );
}
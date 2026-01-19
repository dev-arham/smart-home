import Header from "@/components/blocks/header";

export default function ProductLayout({ children }) {
    return (
        <>
            <section className="w-full">
                <Header />
                {children}
            </section>
        </>
    );
}
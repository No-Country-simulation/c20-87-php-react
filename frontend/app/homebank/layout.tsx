import { Providers } from "@/store/Providers";
import AuthGuard from '../../Authentication/AuthGuard';

export default function HomeBankLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <Providers>
            <AuthGuard>
                {children}
            </AuthGuard>
        </Providers>
    );
}
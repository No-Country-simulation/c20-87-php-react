import { Providers } from "@/store/Providers";
import AuthGuard from '../../Authentication/AuthGuard';
import { ProvidersNext } from "@/Authentication/NextgGuard";

export default function HomeBankLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <Providers>
            <ProvidersNext>
                <AuthGuard>
                    {children}
                </AuthGuard>
            </ProvidersNext>
        </Providers>
    );
}
import { Providers } from "@/store/Providers";
import AuthGuard from '../../Authentication/AuthGuard';
import { ProvidersNext } from "@/Authentication/NextgGuard";
import NavbarPortal from '@/components/NavbarPortal'

export default function HomeBankLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return (

        <Providers>
            <ProvidersNext>
                <AuthGuard>
                    <NavbarPortal />
                    {children}
                </AuthGuard>
            </ProvidersNext>
        </Providers>
    );
}
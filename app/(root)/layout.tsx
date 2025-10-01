import React, {FC} from "react";
import Header from "@/components/header";

const RootLayout: FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <main className={'min-h-screen text-gray-400'}>
            {/*header*/}
            <Header />
            <div className={'container py-10'}>
                {children}
            </div>
        </main>
    )
}
export default RootLayout

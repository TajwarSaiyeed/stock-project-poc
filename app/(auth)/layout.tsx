import React, {FC} from "react";
import Link from "next/link";
import Image from "next/image";

const RootLayout: FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <main className={'auth-layout'}>
            <section className={'auth-left-section scrollbar-hide-default'}>
                <Link href={'/'} className={'auth-logo'}>
                    <Image
                        src={'/assets/icons/logo.svg'}
                        alt={'Stock Project Logo'}
                        width={140}
                        height={32}
                        className={'h-8 w-auto'}
                    />
                </Link>

                <div className={'pb-6 lg:pb-8 flex-1'}>
                    {children}
                </div>
            </section>
            <section className="auth-right-section">
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className={'auth-blockquote'}>
                        The stock market is a device for transferring money from the impatient to the patient.
                        Success in investing doesn&apos;t correlate with IQ. What you need is the temperament to control
                        the urges that get other people into trouble in investing.
                    </blockquote>
                    <div className="flex items-center justify-between">
                        <div>
                            <cite className={'auth-testimonial-author'}>
                                - Anonymous
                            </cite>
                            <p className={'max-md:text-xs text-gray-500'}>
                                Retail Investor
                            </p>
                        </div>
                        <div className={'flex items-center gap-0.5'}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image src={'/assets/icons/star.svg'} alt={'star'} key={star} width={20} height={20}
                                       className={'h-5 w-5'}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={'flex-1 relative'}>
                    <Image
                        src={'/assets/images/dashboard.png'}
                        alt={'dashboard preview'}
                        width={1440}
                        height={1150}
                        className={'auth-dashboard-preview absolute top-0'}
                    />
                </div>
            </section>
        </main>
    )
}
export default RootLayout

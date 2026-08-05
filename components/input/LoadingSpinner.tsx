import React from "react";

interface LoadingSpinnerProps {
    loading: boolean;
    children?: React.ReactNode;
    minHeight?: string;
}

/**
 * That spinner is displayed when request are being send and waiting for response
 * @param param0
 * @param param0.loading
 * @param param0.children
 * @param param0.minHeight
 * @constructor
 */
export function LoadingSpinner({
                                   loading,
                                   children,
                                   minHeight = "min-h-20"
                               }: LoadingSpinnerProps) {

    return (
        <div className={`relative ${minHeight}`}>
            <div
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    loading
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                }`}
            >
                <div className="flex h-20 items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#99331A]/20 border-t-[#99331A]"/>
                </div>
            </div>

            <div
                className={`transition-opacity duration-500 ${
                    loading
                        ? "pointer-events-none opacity-0"
                        : "opacity-100"
                }`}
            >
                <div className="flex flex-col gap-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
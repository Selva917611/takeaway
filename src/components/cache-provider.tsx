'use client';

import * as React from 'react';

interface CacheProviderProps {
    children: React.ReactNode;
}

export function CacheProvider({ children }: CacheProviderProps) {
    return (
        <>
            {children}
        </>
    );
}

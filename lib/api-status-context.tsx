"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ApiStatusContextType {
    isUsingFallback: boolean;
    resetApiStatus: () => void;
}

const ApiStatusContext = createContext<ApiStatusContextType | undefined>(undefined);

export function ApiStatusProvider({ children }: { children: ReactNode }) {
    const [isUsingFallback, setIsUsingFallback] = useState(false);

    useEffect(() => {
        // Check localStorage to see if API is disabled
        if (typeof window !== 'undefined' && window.localStorage) {
            const apiDisabled = window.localStorage.getItem('openrouter_api_disabled') === 'true';
            setIsUsingFallback(apiDisabled);
        }
    }, []);

    // Function to reset API status - can be used to try API again
    const resetApiStatus = () => {
        if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem('openrouter_api_disabled');
            setIsUsingFallback(false);
        }
    };

    return (
        <ApiStatusContext.Provider value={{ isUsingFallback, resetApiStatus }}>
            {children}
        </ApiStatusContext.Provider>
    );
}

export function useApiStatus() {
    const context = useContext(ApiStatusContext);
    if (context === undefined) {
        throw new Error('useApiStatus must be used within an ApiStatusProvider');
    }
    return context;
}

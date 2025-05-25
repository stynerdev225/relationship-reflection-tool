"use client";

import { AlertTriangle, RefreshCw } from 'lucide-react';
import { useApiStatus } from '@/lib/api-status-context';
import { Button } from '@/components/ui/button';

export function ApiStatusNotification() {
    const { isUsingFallback, resetApiStatus } = useApiStatus();

    if (!isUsingFallback) {
        return null;
    }

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4 flex items-start">
            <AlertTriangle className="text-amber-500 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
            <div className="flex-1">
                <p className="text-sm text-amber-800 font-medium">Using offline reflection mode</p>
                <p className="text-xs text-amber-700 mt-0.5">
                    The AI service is temporarily unavailable (possibly due to insufficient credits).
                    Your reflections are still being analyzed with pre-defined patterns.
                </p>
                <div className="mt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 border-amber-300 text-amber-700 hover:bg-amber-100"
                        onClick={resetApiStatus}
                    >
                        <RefreshCw className="h-3 w-3 mr-1" /> Try online mode
                    </Button>
                </div>
            </div>
        </div>
    );
}

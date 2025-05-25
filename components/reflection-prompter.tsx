// A component that provides dynamic reflection prompts in Styner's voice
// to inspire deeper relationship introspection

"use client"

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import { generateReflectionPrompt } from "@/lib/reflectionUtils";

type ReflectionPrompterProps = {
    area: "misaligned" | "emerging" | "uncertain";
    onPromptSelect?: (prompt: string) => void;
    className?: string;
}

export function ReflectionPrompter({
    area,
    onPromptSelect,
    className = ""
}: ReflectionPrompterProps) {
    const [currentPrompt, setCurrentPrompt] = useState<string>("");
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Generate initial prompt
    useEffect(() => {
        setCurrentPrompt(generateReflectionPrompt(area));
    }, [area]);

    // Get a new reflection prompt
    const refreshPrompt = () => {
        setIsRefreshing(true);

        // Small delay to show animation
        setTimeout(() => {
            setCurrentPrompt(generateReflectionPrompt(area));
            setIsRefreshing(false);
        }, 500);
    };

    // Use the prompt in the textarea
    const handleUsePrompt = () => {
        if (onPromptSelect && currentPrompt) {
            onPromptSelect(currentPrompt);
        }
    };

    // Get colors based on reflection area
    const getAreaColors = () => {
        switch (area) {
            case "misaligned":
                return {
                    bg: "bg-slate-100",
                    border: "border-slate-200",
                    text: "text-slate-700",
                    accent: "text-slate-500"
                };
            case "emerging":
                return {
                    bg: "bg-emerald-100",
                    border: "border-emerald-200",
                    text: "text-emerald-700",
                    accent: "text-emerald-500"
                };
            case "uncertain":
                return {
                    bg: "bg-rose-100",
                    border: "border-rose-200",
                    text: "text-rose-700",
                    accent: "text-rose-500"
                };
            default:
                return {
                    bg: "bg-purple-100",
                    border: "border-purple-200",
                    text: "text-purple-700",
                    accent: "text-purple-500"
                };
        }
    };

    const colors = getAreaColors();

    return (
        <Card className={`p-3 ${colors.bg} ${colors.border} shadow-sm ${className}`}>
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <p className={`text-xs ${colors.accent} font-medium mb-1`}>Reflection Prompt:</p>
                    <p className={`text-sm ${colors.text} italic`}>{currentPrompt}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className={`p-1.5 h-7 ${colors.accent} hover:${colors.bg}`}
                        onClick={refreshPrompt}
                    >
                        <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className={`p-1 h-7 text-[10px] ${colors.text} border-${colors.border}`}
                        onClick={handleUsePrompt}
                    >
                        Use
                    </Button>
                </div>
            </div>
        </Card>
    );
}

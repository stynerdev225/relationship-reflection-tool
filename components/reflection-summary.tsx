// A component for displaying and exporting relationship reflection summaries
// Supports PDF export, sharing, and saving

"use client"

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileDown,
    Share2,
    Copy,
    PrinterIcon,
    Check,
    BookOpen
} from "lucide-react";
import { createShareSummary } from "@/lib/reflectionUtils";
import { generateJournalPrompts } from "@/lib/reflectionUtils";

interface ReflectionSummaryProps {
    misalignedScore: number;
    emergingScore: number;
    uncertainScore: number;
    overallScore: number;
    misalignedText: string;
    emergingText: string;
    uncertainText: string;
    misalignedInsights: string;
    emergingInsights: string;
    uncertainInsights: string;
    className?: string;
}

export function ReflectionSummary({
    misalignedScore,
    emergingScore,
    uncertainScore,
    overallScore,
    misalignedText,
    emergingText,
    uncertainText,
    misalignedInsights,
    emergingInsights,
    uncertainInsights,
    className = ""
}: ReflectionSummaryProps) {
    const [showJournal, setShowJournal] = useState(false);
    const [copied, setCopied] = useState(false);

    const summary = createShareSummary(
        misalignedScore,
        emergingScore,
        uncertainScore,
        overallScore,
        misalignedText,
        emergingText,
        uncertainText,
        misalignedInsights,
        emergingInsights,
        uncertainInsights
    );

    const journalPrompts = generateJournalPrompts(
        misalignedScore,
        emergingScore,
        uncertainScore
    );

    const handleCopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(summary);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            alert("Failed to copy. Please try selecting the text manually.");
        }
    };

    const handleCreatePDF = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "My Relationship Reflection",
                    text: summary,
                    url: window.location.href
                });
            } catch (err) {
                console.error("Error sharing: ", err);
                alert("Sharing failed. You can copy the summary instead.");
                handleCopyToClipboard();
            }
        } else {
            alert("Web Share API not supported. You can copy the summary to share it.");
            handleCopyToClipboard();
        }
    };

    return (
        <div className={className}>
            <Card className="p-5 bg-gradient-to-br from-indigo-50 to-purple-100 border-indigo-200 shadow-md">
                <h3 className="text-lg font-bold text-indigo-800 mb-3">Soul-Mirror Summary</h3>

                <div className="bg-white rounded-lg p-4 border border-indigo-200 mb-4">
                    <p className="text-slate-700 whitespace-pre-line">{summary}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                        onClick={handleCopyToClipboard}
                    >
                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? "Copied!" : "Copy Summary"}
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                        onClick={handleCreatePDF}
                    >
                        <FileDown className="h-4 w-4 mr-1" />
                        Save / Print
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                        onClick={() => window.print()}
                    >
                        <PrinterIcon className="h-4 w-4 mr-1" />
                        Print
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                        onClick={handleShare}
                    >
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="sm"
                    className="text-indigo-700 hover:bg-indigo-100 w-full justify-start"
                    onClick={() => setShowJournal(!showJournal)}
                >
                    <BookOpen className="h-4 w-4 mr-2" />
                    {showJournal ? "Hide Journal Prompts" : "Show Journal Prompts"}
                </Button>

                {showJournal && (
                    <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-bold text-indigo-700">Journal Prompts for Deeper Reflection:</h4>
                        {journalPrompts.map((prompt, index) => (
                            <div key={index} className="bg-white rounded-lg p-3 border border-dashed border-indigo-200">
                                <p className="text-sm text-slate-700 italic">{prompt}</p>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}
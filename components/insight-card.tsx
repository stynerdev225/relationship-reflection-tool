// A component for displaying relationship insights with a soul-centric, poetic approach
// Uses Styner's voice for presenting deeper emotional truths

"use client"

import React from "react";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles, AlertTriangle, Lightbulb, Gem } from "lucide-react";
import { motion } from "framer-motion";

type InsightType =
    | "truth"
    | "growth"
    | "caution"
    | "celebration"
    | "wisdom";

interface InsightCardProps {
    type: InsightType;
    title: string;
    content: string;
    authorNote?: string;
    className?: string;
}

export function InsightCard({
    type,
    title,
    content,
    authorNote,
    className = ""
}: InsightCardProps) {
    // Get the appropriate icon and styling based on insight type
    const getInsightStyles = () => {
        switch (type) {
            case "truth":
                return {
                    icon: Heart,
                    gradient: "from-slate-50 to-purple-100",
                    border: "border-purple-200",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600"
                };
            case "growth":
                return {
                    icon: Sparkles,
                    gradient: "from-emerald-50 to-green-100",
                    border: "border-emerald-200",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    titleColor: "text-emerald-800"
                };
            case "caution":
                return {
                    icon: AlertTriangle,
                    gradient: "from-amber-50 to-orange-100",
                    border: "border-amber-200",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    titleColor: "text-amber-800"
                };
            case "celebration":
                return {
                    icon: Sparkles,
                    gradient: "from-blue-50 to-indigo-100",
                    border: "border-blue-200",
                    iconBg: "bg-blue-100",
                    iconColor: "text-blue-600",
                    titleColor: "text-blue-800"
                };
            case "wisdom":
                return {
                    icon: Lightbulb,
                    gradient: "from-rose-50 to-pink-100",
                    border: "border-rose-200",
                    iconBg: "bg-rose-100",
                    iconColor: "text-rose-600",
                    titleColor: "text-rose-800"
                };
            default:
                return {
                    icon: Gem,
                    gradient: "from-purple-50 to-pink-100",
                    border: "border-purple-200",
                    iconBg: "bg-purple-100",
                    iconColor: "text-purple-600",
                    titleColor: "text-purple-800"
                };
        }
    };

    const {
        icon: IconComponent,
        gradient,
        border,
        iconBg,
        iconColor
    } = getInsightStyles();

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className={`p-4 bg-gradient-to-br ${gradient} ${border} shadow-md ${className}`}>
                <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${iconBg}`}>
                        <IconComponent className={`h-5 w-5 ${iconColor}`} />
                    </div>

                    <div className="flex-1">
                        <h4 className="font-serif italic tracking-wide font-light text-lg mb-3 text-center" style={{
                            background: "linear-gradient(to right, #a78bfa, #ec4899)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "0 2px 4px rgba(0,0,0,0.05)",
                            fontFamily: "Didot, 'Playfair Display', 'Cormorant Garamond', serif"
                        }}>{title}</h4>

                        {/* White content box - Spacious for deep Styner wisdom */}
                        <div className="bg-white bg-opacity-95 rounded-lg p-8 border border-white/50 shadow-sm min-h-[300px]">
                            {content.startsWith('Share your reflections') ? (
                                // Placeholder text styling - similar to textarea placeholders
                                <div className="text-sm text-slate-400 italic leading-relaxed opacity-75">
                                    {content.split('\n\n').map((paragraph, index) => (
                                        <p key={index} className={index === 0 ? "mb-4" : "leading-relaxed"}>
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                // Regular content styling - room for quotes and deep insights
                                <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                                    {content.split('\n\n').map((paragraph, index) => (
                                        <div key={index}>
                                            {paragraph.startsWith('**') && paragraph.endsWith('**') ? (
                                                <p className="font-semibold text-slate-800 mb-3 text-lg">
                                                    {paragraph.replace(/\*\*/g, '')}
                                                </p>
                                            ) : paragraph === '---' ? (
                                                <div className="border-t border-slate-300 my-6 w-24 mx-auto"></div>
                                            ) : (
                                                <p className="leading-relaxed text-base mb-4">
                                                    {paragraph}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {authorNote && (
                            <div className="mt-3 text-xs italic text-slate-500 border-t border-white/30 pt-2 text-center">
                                {authorNote}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

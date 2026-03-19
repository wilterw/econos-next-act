"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

interface CounterUpProps {
    value: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function CounterUp({
    value,
    suffix = "",
    prefix = "",
    duration = 1.8,
    className = "",
}: CounterUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const [displayed, setDisplayed] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, value, {
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
            onUpdate: (v) => setDisplayed(Math.round(v)),
        });
        return () => controls.stop();
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {prefix}{displayed}{suffix}
        </span>
    );
}

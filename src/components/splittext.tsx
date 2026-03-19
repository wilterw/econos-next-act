"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
    children: string;
    className?: string;
    delay?: number;
    stagger?: number;
    tag?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function SplitText({
    children,
    className = "",
    delay = 0,
    stagger = 0.06,
    tag: Tag = "h1",
}: SplitTextProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });

    const words = children.split(" ");

    return (
        // @ts-ignore
        <Tag ref={ref} className={className} style={{ overflow: "hidden", display: "block" }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    style={{ display: "inline-block", overflow: "hidden", marginRight: "0.25em" }}
                >
                    <motion.span
                        style={{ display: "inline-block" }}
                        initial={{ y: "110%", opacity: 0 }}
                        animate={isInView ? { y: "0%", opacity: 1 } : {}}
                        transition={{
                            duration: 0.7,
                            ease: [0.33, 1, 0.68, 1],
                            delay: delay + i * stagger,
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}

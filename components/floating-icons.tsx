"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Battery, BatteryCharging, Leaf, Zap, Wind, Droplets, Sparkles, CircleDot } from "lucide-react";
import { useRef } from "react";

export const FloatingIcons = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Different parallax speeds for each icon
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const y5 = useTransform(scrollYProgress, [0, 1], [0, -90]);
    const y6 = useTransform(scrollYProgress, [0, 1], [0, -110]);
    const y7 = useTransform(scrollYProgress, [0, 1], [0, -130]);
    const y8 = useTransform(scrollYProgress, [0, 1], [0, -95]);
    const y9 = useTransform(scrollYProgress, [0, 1], [0, -105]);
    const y10 = useTransform(scrollYProgress, [0, 1], [0, -85]);
    const y11 = useTransform(scrollYProgress, [0, 1], [0, -115]);
    const y12 = useTransform(scrollYProgress, [0, 1], [0, -140]);

    const icons = [
        { Icon: Battery, y: y1, className: "top-20 left-[10%]", color: "text-green-400", size: 40, delay: 0 },
        { Icon: BatteryCharging, y: y2, className: "top-40 right-[15%]", color: "text-blue-400", size: 48, delay: 0.2 },
        { Icon: Leaf, y: y3, className: "top-[60%] left-[8%]", color: "text-emerald-400", size: 36, delay: 0.4 },
        { Icon: Zap, y: y4, className: "top-[30%] right-[8%]", color: "text-yellow-400", size: 44, delay: 0.6 },
        { Icon: Wind, y: y5, className: "top-[70%] right-[12%]", color: "text-cyan-400", size: 38, delay: 0.8 },
        { Icon: Sparkles, y: y6, className: "top-[45%] left-[12%]", color: "text-purple-400", size: 42, delay: 1 },
        { Icon: Droplets, y: y7, className: "top-[25%] left-[20%]", color: "text-blue-300", size: 34, delay: 0.3 },
        { Icon: CircleDot, y: y8, className: "top-[80%] left-[15%]", color: "text-indigo-400", size: 40, delay: 0.5 },
        { Icon: Battery, y: y9, className: "top-[50%] right-[20%]", color: "text-green-300", size: 36, delay: 0.7 },
        { Icon: Zap, y: y10, className: "top-[15%] right-[25%]", color: "text-amber-400", size: 42, delay: 0.9 },
        { Icon: Leaf, y: y11, className: "top-[65%] right-[5%]", color: "text-teal-400", size: 38, delay: 1.1 },
        { Icon: Wind, y: y12, className: "top-[35%] left-[5%]", color: "text-sky-400", size: 44, delay: 1.3 },
    ];

    return (
        <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
            {icons.map(({ Icon, y, className, color, size, delay }, index) => (
                <motion.div
                    key={index}
                    style={{ y }}
                    className={`absolute ${className}`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 0.5, scale: 1 }}
                    transition={{
                        duration: 1,
                        delay,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 2
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 4 + index,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Icon className={`${color} drop-shadow-2xl filter blur-[0.5px]`} size={size} strokeWidth={2} />
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

"use client";

import { Card, CardBody, CardFooter, Image, Button, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const CarModels = () => {
    const [cars, setCars] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/car-models")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCars(data.filter((c: any) => c.status === 'active'));
            })
            .catch(err => console.error("Failed to fetch cars", err));
    }, []);

    // const cars = [ ... ]; // removed static data
    return (
        <section id="models" className="py-20 bg-zinc-950 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        รุ่นรถ<span className="text-gold-500">แนะนำ</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        เลือกรถยนต์ที่เหมาะกับไลฟ์สไตล์ของคุณ พร้อมเทคโนโลยีขับขี่อัจฉริยะและการออกแบบที่ล้ำสมัย
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cars.map((car, index) => (
                        <motion.div
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card
                                shadow="sm"
                                className="bg-zinc-900/50 border border-white/5 hover:border-gold-500/50 transition-all duration-300 group"
                            >
                                <CardBody className="overflow-visible p-0">
                                    <Image
                                        shadow="sm"
                                        radius="lg"
                                        width="100%"
                                        alt={car.name}
                                        className="w-full object-cover h-[200px] group-hover:scale-105 transition-transform duration-500"
                                        src={car.main_image_url}
                                    />
                                </CardBody>
                                <CardFooter className="flex flex-col items-start gap-2 p-4">
                                    <div className="flex justify-between items-start w-full">
                                        <div className="flex flex-col gap-1">
                                            <b className="text-xl text-white group-hover:text-gold-400 transition-colors uppercase tracking-wider">{car.name}</b>
                                            <p className="text-gray-400 text-sm">{car.slug}</p>
                                        </div>
                                        <Chip size="sm" variant="flat" classNames={{ base: "bg-gold-500/10", content: "text-gold-400 font-bold" }}>
                                            EV
                                        </Chip>
                                    </div>
                                    <p className="text-gray-300 font-medium">เริ่มต้น ฿{parseInt(car.base_price).toLocaleString()}</p>
                                    <Button
                                        fullWidth
                                        className="bg-white/5 text-white border border-white/10 group-hover:bg-gradient-to-r group-hover:from-gold-400 group-hover:to-gold-500 group-hover:text-black group-hover:border-transparent transition-all font-medium py-6"
                                        radius="full"
                                        size="md"
                                    >
                                        ดูรายละเอียด
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

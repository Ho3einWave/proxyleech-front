import { useEffect, useState } from "react";
import axios from "axios";

import TgLogo from "./assets/tglogo.png";
import { PiHandTap } from "react-icons/pi";
import { TbAlertHexagonFilled } from "react-icons/tb";
import ProxyCard from "./components/ProxyCard";
import { Toaster } from "react-hot-toast";
function App() {
    const [proxyList, setProxyList] = useState([]);
    useEffect(() => {
        axios
            .get("https://api.observersteam.ir/priv8/proxyleech")
            .then((res) => {
                setProxyList(res.data);
            });
    }, []);
    return (
        <div className="w-full min-h-screen flex justify-start items-center flex-col font-irancell text-white pb-10">
            <img
                className="w-24 mt-10 rounded-full"
                src={TgLogo}
                alt="Telegram Proxy Logo - ProxyLeech"
            />
            <h1 className="font-irancellbold mt-5 text-xl">
                پروکسی لیچر تلگرام
            </h1>
            <p dir="rtl" className="text-sm mt-2 text-white/50">
                توسعه داده شده توسط{" "}
                <a
                    className="text-blue-500"
                    href="tg://resolve?domain=HoseinBaseri"
                >
                    Hosein
                </a>
            </p>
            <p dir="rtl" className="flex gap-1 text-sm mt-3">
                برای کپی کلیک کنید <PiHandTap />
            </p>
            <div className="w-[200px] text-center text-xs flex flex-col items-center bg-white text-black p-1 rounded-xl mt-3 gap-1">
                <TbAlertHexagonFilled className="text-3xl text-red-600" />
                ممکن است اکثر پروکسی ها فعال نباشند به همین دلیل تمامی پروکسی ها
                را تست کنید
            </div>
            <div className="flex flex-col gap-10 mt-5">
                {proxyList &&
                    proxyList.map(
                        (
                            proxy: { id: number; link: string; time: string },
                            idx
                        ) => <ProxyCard key={idx} {...proxy} />
                    )}
            </div>
            <Toaster position="bottom-center" />
        </div>
    );
}

export default App;

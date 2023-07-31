import { useState, useEffect } from "react";

import { BiSolidTimeFive } from "react-icons/bi";

import farsiRel from "../utils/farsiRelTime";
import ping from "../utils/ping";
import toast from "react-hot-toast";

type ProxyCardProps = {
    id: number;
    link: string;
    time: string;
};

type ProxyDetailsType = {
    server?: string;
    port?: string;
    secret?: string;
};
const ProxyCard: React.FC<ProxyCardProps> = ({ link, time }) => {
    const [proxyDetails, setProxyDetails] = useState<ProxyDetailsType>({});
    const [serverPing, setServerPing] = useState<boolean>(false);
    useEffect(() => {
        const url = new URL(link);
        const urlParams = new URLSearchParams(url.search);
        const server = urlParams.get("server")!;
        const port = urlParams.get("port")!;
        const secret = urlParams.get("secret")!;
        const checkPing = async () => {
            const delta = await ping(`http://${server}:${port}`);
            setServerPing(delta > 0 ? true : false);
        };
        checkPing();
        setProxyDetails({ server, port, secret });
    }, []);

    const copyLink = () => {
        navigator.clipboard
            .writeText(link)
            .then(() => {
                toast("Text copied to clipboard!", {
                    icon: "📃",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
            })
            .catch((err) => {
                toast("Failed to copy!", {
                    icon: "📃",
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                console.error("Failed to copy text: ", err);
            });
    };
    return (
        <div className="bg-zinc-800 p-4 rounded-2xl font-irancell relative pb-10">
            <div onClick={copyLink} className="cursor-pointer">
                <div dir="rtl" className="flex flex-col text-xs gap-1">
                    <span>سرور: {proxyDetails?.server?.slice(0, 25)}</span>
                    <span>پورت: {proxyDetails?.port}</span>
                    <span>سکرت: {proxyDetails?.secret?.slice(0, 25)}...</span>
                </div>
                <div className="mt-2 flex items-center gap-2" dir="rtl">
                    <div className="text-xs flex gap-1">
                        {serverPing ? (
                            <>
                                <div className="rounded-full w-2 h-2 bg-green-600"></div>{" "}
                                احتمالا کار میکنه{" "}
                            </>
                        ) : (
                            <>
                                <div className="rounded-full w-2 h-2 bg-red-600"></div>{" "}
                                احتمالا کار نمیکنه
                            </>
                        )}
                    </div>
                    <div className="text-xs flex gap-1">
                        <BiSolidTimeFive />
                        {farsiRel(time)}
                    </div>
                </div>
            </div>
            <a
                className="w-24 text-center bg-blue-600 py-1  absolute z-10 rounded-2xl text-sm -bottom-3 right-1/2 translate-x-1/2"
                href={link}
                target="_blank"
            >
                اتصال
            </a>
        </div>
    );
};

export default ProxyCard;

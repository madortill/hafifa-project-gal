import { useMemo } from "react";
import Lottie from "lottie-react";

import loadingAnimation
    from "../../media/loadingAnimation.json";

import loadingStar
    from "../../media/loadingStar.png";

import "./LoadingScreen.css";


function LoadingScreen() {

    const animationData = useMemo(() => {
        const data =
            structuredClone(
                loadingAnimation
            );
        data.assets =
            data.assets.map(asset => {

                if (
                    asset.id ===
                    "7bb1a3d6318fe1b068b5cf559a10fef6320f8f92"
                ) {
                    return {
                        ...asset,
                        u: "",
                        p: loadingStar,
                        e: 0
                    };
                }


                return asset;
            });


        return data;

    }, []);


    return (
        <div
            className="loading-screen"
            role="status"
            aria-label="טוען"
        >

            <div
                className="
                    loading-screen__animation
                "
            >

                <Lottie
                    animationData={
                        animationData
                    }
                    autoplay={true}
                    loop={true}
                />

                <div className="loading-screen__text">
                    <span>עובדים על זה</span>

                    <span className="loading-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                </div>

            </div>

        </div>
    );
}


export default LoadingScreen;
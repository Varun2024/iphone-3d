import {
    useRef,
    useState,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle
} from "react";
// get reference to the canvas element
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
    mobileAndTabletCheck,
    CanvasSnipperPlugin,
    TweakpaneUiPlugin,
    AssetManagerBasicPopupPlugin,
} from "webgi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollAnimation } from "../lib/scroll-animation";

gsap.registerPlugin(ScrollTrigger);


function WebgiViewer() {
    const canvasRef = useRef(null);
    const memoizedScrollAni = useCallback((position, target, onUpdate) => {
        if (position && target && onUpdate) {
            scrollAnimation(position, target, onUpdate);
        }
    }, []);

    const setupViewer = useCallback(async () => {

        if (typeof window === "undefined") return;
        if (!canvasRef.current) return

        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        })


        viewer.renderer.renderScale = Math.min(
            window.devicePixelRatio,
            2
        )
        // 1️
        const camera = viewer.scene.activeCamera;
        const position = camera.position
        const target = camera.target



        await viewer.addPlugin(GBufferPlugin)
        await viewer.addPlugin(new ProgressivePlugin(32))
        await viewer.addPlugin(new TonemapPlugin(true))
        await viewer.addPlugin(SSAOPlugin)
        await viewer.addPlugin(BloomPlugin)
        await viewer.addPlugin(GammaCorrectionPlugin)





        // 2️⃣ Asset loader (THIS loads files)
        const assetManager = await viewer.addPlugin(AssetManagerPlugin)

        // 3️⃣ Popup UI (THIS only shows UI)
        await viewer.addPlugin(AssetManagerBasicPopupPlugin)

        viewer.renderer.refreshPipeline()

        // 5️⃣ Load your model ✅
        await assetManager.addFromPath("./scene-black.glb")

        const tonemap = viewer.getPlugin(TonemapPlugin)
        if (tonemap) {
            tonemap.config.clipBackground = true
        }

        // 6️⃣ UI
        const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin)
        uiPlugin.setupPlugins(TonemapPlugin)
        // viewer.getPlugin(TonemapPlugin).config.clipBackground = true;
        // viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });
        window.scrollTo(0, 0);

        let needsUpdate = true;
        const onUpdate = () => {
            needsUpdate = true;
            // for rerendering the scene
            viewer.setDirty();
        }

        viewer.addEventListener("preFrame", () => {
            if (needsUpdate) {
                camera.positionUpdated(true);
                // camera.targetUpdated(true);
                needsUpdate = false;
            }
        })

        memoizedScrollAni(position, target, onUpdate);
    }
        , []);


    useEffect(() => {
        setupViewer();
    }, []);

    return (
        <div id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef} />
        </div>
    );
}

export default WebgiViewer;
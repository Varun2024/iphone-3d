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

// forwardRef to work with refs

const WebgiViewer = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const [viewerRef, setViewerRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [positionRef, setPositionRef] = useState(null);
    const canvasContainerRef = useRef(null);
    const [previewMode, setPreviewMode] = useState(false);

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            setPreviewMode(true);
            canvasContainerRef.current.style.pointerEvents = "all";
            props.contentRef.current.style.opacity = 0;


            gsap.to(positionRef, {
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty();
                    cameraRef.positionUpdated(true);
                }
            })

            gsap.to(targetRef, {
                x: 0.11,
                y: 0,
                z: 0,
                duration: 2,
                onUpdate: () => {
                    viewerRef.setDirty();
                    cameraRef.targetUpdated(true);
                }
            })


            viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: true });
        }
    }))

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
        setViewerRef(viewer);


        viewer.renderer.renderScale = Math.min(
            window.devicePixelRatio,
            2
        )
        // 1️
        const camera = viewer.scene.activeCamera;
        const position = camera.position
        const target = camera.target
        setCameraRef(camera);
        setPositionRef(position);
        setTargetRef(target);



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

    const handleExit = useCallback(() => {
        setPreviewMode(false);
        props.contentRef.current.style.opacity = 1;
        canvasContainerRef.current.style.pointerEvents = "none";
        viewerRef.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

        gsap.to(positionRef, {
            x: 10,
            y: 6.0,
            z: 0.011,
            scrollTrigger: {
                trigger: ".display-section",
                start: "top bottom",
                end: "top top",
                scrub: 2,
                immediateRender: false
            },
            onUpdate: () => {
                viewerRef.setDirty();
                cameraRef.positionTargetUpdated(true);
            },
        })
        gsap.to(
            targetRef,
            {
                x: 1.56,
                y: 5.0,
                z: 0.01,
                scrollTrigger: {
                    trigger: ".display-section",
                    start: "top bottom",
                    end: "top top",
                    scrub: 2,
                    immediateRender: false
                },
            },
        )
    }, [props.contentRef, viewerRef, positionRef, targetRef, cameraRef, canvasContainerRef]);

    return (
        <div ref={canvasContainerRef} id="webgi-canvas-container">
            <canvas id="webgi-canvas" ref={canvasRef} />
            {previewMode && (
                <button className="button" onClick={handleExit} >Exit</button>
            )}
        </div>
    );
});

export default WebgiViewer;
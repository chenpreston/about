// Service Worker 注册
if ("serviceWorker" in navigator) {
    console.log("about page: 注册 Service Worker 中...");
    navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
            console.log("about page: Service Worker 已注册:", registration);
            registration.addEventListener("updatefound", () => {
                const newWorker = registration.installing;
                newWorker.addEventListener("statechange", () => {
                    if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                        console.log("about page: 有新版本的 Service Worker 可用");
                        if (confirm("A new version ABOUT PAGE is available. Refresh to update?")) {
                            newWorker.postMessage({ action: "skipWaiting" });
                        }
                    }
                });
            });
        })
        .catch((err) => console.error("about page: Service Worker 注册失败:", err));

    navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("about page: 正在载入新版本的 Service Worker");
        window.location.reload();
    });

    navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data && event.data.action === "skipWaiting") {
            console.log("about page: Skipping waiting via message");
        }
    });
}
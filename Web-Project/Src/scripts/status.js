// ====== ⚙️ 維護總開關 (控制中心) ======
// 這裡設定你想要顯示的維護訊息主題
// true = 啟動全黑維護面；false = 開啟正常網頁主頁
// 當你要維護網頁時，把這裡改成 true。平常正常運作時，改成 false。
const isMaintenance = true; 
// 可以填寫："maint" (維護中)、"permission" (權限不足)、"error" (無法運行)、"404" (檔案找不到了)
const maintenanceMode = "maint"; 
// 可選："maint"、"permission"、"error"、"404"
// ========================================

const errorMessages = {
    "404": { title: "404 NOT FOUND", detail: "您要求的檔案或教學資源不翼而飛，請確認網址是否正確。" },
    "maint": { title: "SYSTEM MAINTENANCE", detail: "Teaching Archives 正在進行系統升級與主頁維護。<br>核心架構正在優化中，請稍後再試。" },
    "error": { title: "PAGE UNREACHABLE", detail: "您要求的網頁目前無法安全運行。造成不便，敬請見諒。" },
    "permission": { title: "ACCESS RESTRICTED", detail: "安全性驗證未通過。您的帳戶權限不足，無法存取核心檔案。" }
};

// 網頁載入時優先執行
window.addEventListener('DOMContentLoaded', () => {
    
    // 如果開啟了維護模式，由 JS 現場動態組裝並注射整個維護介面到 HTML 中
    if (isMaintenance) {
        
        // 1. 徹底鎖死網頁滾動條，不讓用戶亂滾動
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        // 2. 向網頁動態注入動畫效果的 <style> 標籤
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
            @keyframes icePulse {
                0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); opacity: 0.6; }
                70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(34, 211, 238, 0); opacity: 1; }
                100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); opacity: 0.6; }
            }
        `;
        document.head.appendChild(styleTag);

        // 3. 獲取對應的錯誤文字
        const currentStatus = errorMessages[maintenanceMode] || { title: "SYSTEM ERROR", detail: "發生未知錯誤。" };

        // 4. 現場打造全螢幕遮罩的 HTML 結構與 Stealth & Ice 樣式
        const overlay = document.createElement('div');
        overlay.id = "maintenance-overlay";
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: radial-gradient(circle at top left, rgba(6, 182, 212, 0.05), transparent 40%), linear-gradient(180deg, #09090b 0%, #000000 100%);
            color: #f4f4f5; z-index: 999999; display: flex; flex-direction: column; 
            justify-content: center; align-items: center; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        `;

        // 5. 現場打造卡片內部的內容
        overlay.innerHTML = `
            <div style="
                background: rgba(24, 24, 27, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.08); border-bottom: 3px solid #06b6d4;
                padding: 50px 40px; border-radius: 24px; text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(6, 182, 212, 0.1);
                max-width: 550px; width: 85%;
            ">
                <div style="width: 14px; height: 14px; background-color: #22d3ee; border-radius: 50%; margin: 0 auto 28px auto; box-shadow: 0 0 20px #22d3ee; animation: icePulse 2.5s infinite ease-in-out;"></div>
                <h1 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 18px; background: linear-gradient(to bottom, #ffffff, #22d3ee); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px; line-height: 1.3;">
                    ${currentStatus.title}
                </h1>
                <div style="width: 50px; height: 2px; background: linear-gradient(90deg, transparent, #06b6d4, transparent); margin: 0 auto 24px auto;"></div>
                <p style="font-size: 1.05rem; color: #a1a1aa; line-height: 1.8; margin: 0; letter-spacing: 0.5px;">
                    ${currentStatus.detail}
                </p>
            </div>
        `;

        // 6. 把做好的維護網頁「啪」一聲，直接貼到網頁的最上層
        document.body.prepend(overlay);
    }
});

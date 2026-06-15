// ====== ⚙️ 控制中心 (維護與視覺設定) ======
const isMaintenance = true; 
// true = 啟動全黑維護面；false = 關閉維護面，讓所有網頁恢復正常運作
const maintenanceMode = "404"; 
// 可選："maint"、"permission"、"error"、"404"

// 🌟 【線條風格切換開關】
// 填入 "A" = 方案 A (滿版流線型科技漸層長線)
// 填入 "B" = 方案 B (滿版霓虹光暈發光長線)
const lineStyleMode = "B"; 
// ========================================

const errorMessages = {
    "404": { title: "404 NOT FOUND", detail: "您要求的檔案或教學資源不翼而飛，請確認網址是否正確。" },
    "maint": { title: "SYSTEM MAINTENANCE", detail: "Teaching Archives 正在進行系統升級與主頁維護。<br>核心架構正在優化中，請稍後再試。" },
    "error": { title: "PAGE UNREACHABLE", detail: "您要求的網頁目前無法安全運行。造成不便，敬請見諒。" },
    "permission": { title: "ACCESS RESTRICTED", detail: "安全性驗證未通過。您的帳戶權限不足，無法存取核心檔案。" }
};

// 1. 動態注入樣式的函式（改為只有在需要維護時才由內部觸發，避免污染正常網頁）
function injectMainStyles() {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        /* Stealth & Ice Theme */
        :root {
            --bg: #09090b;            
            --bg-alt: #18181b;            
            --surface: rgba(24, 24, 27, 0.85);            
            --surface-soft: rgba(39, 39, 42, 0.8);            
            --surface-hover: rgba(63, 63, 70, 0.85);
            --text: #f4f4f5;            
            --muted: #a1a1aa;            
            --border: rgba(255, 255, 255, 0.08);         
            --primary: #06b6d4;           
            --primary-2: #0891b2;            
            --accent: #22d3ee;
            --shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            --gradient-bg: radial-gradient(circle at top left, rgba(6, 182, 212, 0.08), transparent 30%),
                           radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.05), transparent 25%),
                           linear-gradient(180deg, #09090b 0%, #18181b 50%, #000000 100%);
            --hero-glow: radial-gradient(circle at center, rgba(6, 182, 212, 0.12), transparent 60%);
        }

        /* 維護面專用動畫 */
        @keyframes icePulse {
            0% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0.7); opacity: 0.6; }
            70% { transform: scale(1); box-shadow: 0 0 0 15px rgba(34, 211, 238, 0); opacity: 1; }
            100% { transform: scale(0.92); box-shadow: 0 0 0 0 rgba(34, 211, 238, 0); opacity: 0.6; }
        }
    `;
    document.head.appendChild(styleTag);
}

// 2. 當網頁結構準備就緒，檢查是否需要啟動維護遮罩
window.addEventListener('DOMContentLoaded', () => {
    // 💡 關鍵修正：只有當 isMaintenance 為 true 時，才執行裡面的鎖死與遮罩邏輯！
    if (isMaintenance) {
        // 第一時間注入維護需要的樣式
        injectMainStyles();

        // 徹底鎖死當前網頁的滾動條
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        const currentStatus = errorMessages[maintenanceMode] || { title: "SYSTEM ERROR", detail: "發生未知錯誤。" };

        const overlay = document.createElement('div');
        overlay.id = "maintenance-overlay";
        
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; 
            background: var(--gradient-bg);
            background-attachment: fixed;
            color: #f4f4f5; z-index: 999999; display: flex; flex-direction: column; 
            justify-content: center; align-items: center; font-family: 'Plus Jakarta Sans', -apple-system, sans-serif;
        `;

        // 根據開關自動生成對應的 100% 滿版長線代碼
        let selectedLineHtml = "";
        if (lineStyleMode === "A") {
            // 方案 A：100% 滿版流線型科技漸層線
            selectedLineHtml = `<div style="width: 100%; height: 2px; background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.3) 10%, #06b6d4 50%, rgba(34, 211, 238, 0.3) 90%, transparent); margin: 0 auto 28px auto; filter: drop-shadow(0 0 5px rgba(6, 182, 212, 0.7));"></div>`;
        } else {
            // 方案 B：100% 滿版霓虹光暈發光線
            selectedLineHtml = `<div style="width: 100%; height: 2px; background: #22d3ee; margin: 0 auto 28px auto; box-shadow: 0 0 14px #06b6d4, 0 0 5px #22d3ee; opacity: 0.9;"></div>`;
        }

        overlay.innerHTML = `
            <div style="
                background: rgba(24, 24, 27, 0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.08); border-bottom: 3px solid #06b6d4;
                padding: 50px 40px; border-radius: 24px; text-align: center;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(6, 182, 212, 0.1);
                max-width: 550px; width: 85%;
            ">
                <div style="width: 14px; height: 14px; background-color: #22d3ee; border-radius: 50%; margin: 0 auto 28px auto; box-shadow: 0 0 20px #22d3ee; animation: icePulse 2.5s infinite ease-in-out;"></div>
                
                <h1 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 22px; background: linear-gradient(to bottom, #ffffff, #22d3ee); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -1px; line-height: 1.3;">
                    ${currentStatus.title}
                </h1>
                
                ${selectedLineHtml}
                
                <p style="font-size: 1.05rem; color: #a1a1aa; line-height: 1.8; margin: 0; letter-spacing: 0.5px;">
                    ${currentStatus.detail}
                </p>
            </div>
        `;

        document.body.prepend(overlay);
    } else {
        // 💡 當 isMaintenance = false (關閉維護) 時：
        // 確保滾動條是開啟的，讓其他引進此 JS 的網頁（如 aoc.html）可以完全正常自由滑動！
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }
});

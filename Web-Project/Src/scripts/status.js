// status.js

// ====== 🛠️ 維護總開關 ======
// 當你要維護網頁時，把這裡改成 true。平常正常運作時，改成 false。
const isMaintenance = true; 

// 這裡設定你想要顯示的維護訊息主題
// 可以填寫："maint" (維護中)、"permission" (權限不足)、"error" (無法運行)、"404" (檔案找不到了)
const maintenanceMode = "maint"; 
// ==========================

const errorMessages = {
    "404": { title: "404 Not Found", detail: "找不到檔案：這裏的檔案可能已經過期或已經被移除，請確認連結是否正確。" },
    "maint": { title: "網頁維護中", detail: "伺服器正在維護中，暫時無法開啟網頁，請稍後再試。" },
    "error": { title: "網頁無法運行", detail: "您所要求的網頁或連結目前無法運行，造成不便敬請見諒。" },
    "permission": { title: "存取受限", detail: "您的權限不足，無法瀏覽此網頁。" },
    "expired": { title: "網頁已失效", detail: "連結已失效：檔案已經過期" }
};

window.onload = function() {
    // 1. 檢查是否開啟了維護模式
    if (isMaintenance) {
        const overlay = document.getElementById('maintenance-overlay');
        const titleElement = document.getElementById('maintenance-title');
        const msgElement = document.getElementById('maintenance-msg');

        if (overlay && titleElement && msgElement) {
            // 取得對應的文字內容
            const currentStatus = errorMessages[maintenanceMode] || { title: "系統錯誤", detail: "發生未知錯誤。" };
            
            // 塞入文字
            titleElement.innerText = currentStatus.title;
            msgElement.innerText = currentStatus.detail;
            
            // 把全黑蓋子顯示出來 (利用 flex 居中文字)
            overlay.style.display = 'flex'; 
            
            // 終止後續執行，讓原本網頁的邏輯完全無法運作
            return; 
        }
    }

    // 2. 如果沒有開啟維護模式 (isMaintenance = false)，就維持原來的網址檢查邏輯
    const params = new URLSearchParams(window.location.search);
    const code = params.get('status');
    const displayElement = document.getElementById('error-message');
    
    if (displayElement && code) {
        displayElement.innerText = errorMessages[code]?.detail || "發生未知錯誤。";
    }
};

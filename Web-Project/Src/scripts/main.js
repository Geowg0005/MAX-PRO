// 1. 網頁加載時「第一時間」動態注入主頁的 Stealth & Ice UI 樣式
(function injectMainStyles() {
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

        * { box-sizing: border-box; }
        html, body { overflow: hidden; height: 100vh; margin: 0; }

        body {
            font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: var(--gradient-bg);
            background-attachment: fixed;
            color: var(--text);
            line-height: 1.8;
            font-size: 18px;
        }

        .container { max-width: 1300px; margin: 0 auto; height: 100%; }
        .content { height: 100%; }

        .hero-section {
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: var(--hero-glow);
            width: 100%;
            padding-bottom: 10vh;
        }

        .hero-title {
            font-size: 4.2rem;
            font-weight: 900;
            margin-bottom: 30px;
            background: linear-gradient(to bottom, #ffffff, #67e8f9);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: -3px;
            line-height: 1.2;
        }

        .search-container {
            max-width: 550px;
            width: 100%;
            margin: 0 auto 35px auto;
            position: relative;
        }

        .search-input {
            width: 100%;
            background: var(--surface-soft);
            border: 2px solid var(--border);
            border-radius: 999px;
            padding: 18px 30px 18px 60px;
            font-size: 1.1rem;
            color: var(--text);
            outline: none;
            backdrop-filter: blur(10px);
            transition: all 0.3s;
        }

        .search-input:focus {
            border-color: var(--primary);
            background: var(--surface-hover);
            box-shadow: var(--shadow);
        }

        .search-icon {
            position: absolute; left: 25px; top: 50%; transform: translateY(-50%);
            font-size: 1.2rem; opacity: 0.5;
        }

        .category-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
            max-width: 1100px;
            width: 100%;
            margin: 0 auto;
            transition: opacity 0.3s ease;
        }

        .category-box {
            background: var(--surface-soft);
            border: 1px solid var(--border);
            border-radius: 20px;
            padding: 25px 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(16px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 150px;
        }

        .category-box:hover {
            transform: translateY(-8px);
            background: var(--surface-hover);
            border-color: var(--primary);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .category-box i { font-size: 3.2rem; margin-bottom: 15px; display: block; }
        .category-box span { font-weight: 700; font-size: 1.3rem; }

        .results-container {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: var(--bg); z-index: 999; display: none; padding: 60px;
            overflow-y: auto; opacity: 0; transition: opacity 0.2s ease; pointer-events: none;
        }

        .results-container.active { display: block; opacity: 1; pointer-events: auto; }

        .resource-list {
            display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; margin-top: 60px;
        }
        /* ====================================================================
        💎 完美還原：螢光藍、動態下劃線與鼠標懸停發光效果
        ==================================================================== */

        /* 1. 按鈕卡片的基本狀態 */
        .resource-card {
            flex: 1 1 320px; 
            max-width: 420px; 
            background: var(--surface-soft);
            padding: 30px; 
            border-radius: 20px; 
            /* 核心：原本的幼小下劃線（底邊框），使用帶著科技感的暗藍色 border */
            border: 1px solid var(--border);
            border-bottom: 2px solid rgba(6, 182, 212, 0.3); 
            text-decoration: none; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center;
            text-align: center; 
            gap: 12px;
            /* 關鍵：讓所有屬性（發光、下劃線、位置）在 0.3 秒內絲滑過渡 */
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        /* 3. 🔥 當鼠標移過去（Hover）時的震撼視覺特效 */
        .resource-card:hover {
            background: var(--surface-hover); 
            transform: translateY(-6px); /* 卡片微微向上飄浮 */
            /* 【效果一】原本幼小的下劃線瞬間變成「粗線」，且顏色完全亮起 */
            border-bottom: 5px solid #06b6d4; 
            border-top: 1px solid rgba(6, 182, 212, 0.4);
            border-left: 1px solid rgba(6, 182, 212, 0.4);
            border-right: 1px solid rgba(6, 182, 212, 0.4);
            /* 【效果二】整體卡片釋放出如同黑客帝國、科幻極光般的「外發光特效」 */
            box-shadow: 0 0 25px rgba(6, 182, 212, 0.35), 0 20px 40px rgba(0, 0, 0, 0.6);
        }
        /* 2. 卡片內部的文字與 Icon 預設就呈現高級螢光藍 */
        .resource-card h3 { 
            margin: 0; font-size: 1.2rem; line-height: 1.4; color: #22d3ee; 
            text-shadow: 0 0 8px rgba(34, 211, 238, 0.2); transition: color 0.3s ease;
        }
         /* 讓 Icon 圖標也同步帶有螢光藍的色調濾鏡（如果不想影響Emoji顏色可自由移除這行） */
        .resource-card .card-inner span { text-shadow: 0 0 10px rgba(6, 182, 212, 0.5); }
        /* 4. 當鼠標移過去時，文字顏色變得更亮、發光更強 */
        .resource-card:hover h3 { color: #ffffff; text-shadow: 0 0 12px #06b6d4; }

        .resource-card .cat-label { font-size: 0.85rem; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; }
        .card-inner { display: flex; align-items: center; gap: 15px; }
        .card-inner span { font-size: 1.5rem; }
        .no-results { text-align: center; padding: 40px; opacity: 0.6; width: 100%; display: none; 
        }
    `;
    document.head.appendChild(styleTag);
})();

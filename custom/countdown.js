const CountdownTimer = (() => {
    const config = {
        targetDate: "2026-12-19",
        targetName: "考研",
        units: {
            day: { text: "今日", unit: "小时", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' },
            week: { text: "本周", unit: "天", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' },
            month: { text: "本月", unit: "天", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>' },
            year: { text: "本年", unit: "天", icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' }
        }
    };

    const calculators = {
        day: () => {
            const hours = new Date().getHours();
            return {
                remaining: 24 - hours,
                percentage: (hours / 24) * 100
            };
        },
        week: () => {
            const day = new Date().getDay();
            const passed = day === 0 ? 6 : day - 1;
            return {
                remaining: 6 - passed,
                percentage: ((passed + 1) / 7) * 100
            };
        },
        month: () => {
            const now = new Date();
            const total = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            const passed = now.getDate() - 1;
            return {
                remaining: total - passed,
                percentage: (passed / total) * 100
            };
        },
        year: () => {
            const now = new Date();
            const start = new Date(now.getFullYear(), 0, 1);
            const total = 365 + (now.getFullYear() % 4 === 0 ? 1 : 0);
            const passed = Math.floor((now - start) / 86400000);
            return {
                remaining: total - passed,
                percentage: (passed / total) * 100
            };
        }
    };

    function updateCountdown() {
        const elements = ['eventName', 'eventDate', 'daysUntil', 'countRight']
            .map(id => document.getElementById(id));

        if (elements.some(el => !el)) return;

        const [eventName, eventDate, daysUntil, countRight] = elements;
        const now = new Date();
        const target = new Date(config.targetDate);

        eventName.textContent = config.targetName;
        eventDate.textContent = config.targetDate;
        daysUntil.textContent = Math.round((target - now.setHours(0,0,0,0)) / 86400000);

        countRight.innerHTML = Object.entries(config.units)
            .map(([key, {text, unit, icon}]) => {
                const {remaining, percentage} = calculators[key]();
                return `
                    <div class="cd-count-item">
                        <div class="cd-item-name">
                            <span class="cd-item-icon">${icon}</span>
                            <span class="cd-item-text">${text}</span>
                        </div>
                        <div class="cd-item-bar">
                            <div class="cd-progress-bar" style="width: ${percentage}%"></div>
                        </div>
                        <div class="cd-item-value">
                            <span class="cd-percentage">${percentage.toFixed(1)}%</span>
                            <span class="cd-remaining">${remaining} ${unit}</span>
                        </div>
                    </div>
                `;
            }).join('');
    }

    function injectStyles() {
        const styles = `
            .card-countdown .item-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 5px;
            }
            .cd-count-left {
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-width: 80px;
                padding-right: 12px;
            }
            .cd-count-left .cd-text {
                font-size: 12px;
                color: var(--anzhiyu-secondtext);
                margin-bottom: 2px;
                letter-spacing: 1px;
                opacity: 0.8;
            }
            .cd-count-left .cd-name {
                font-weight: 700;
                font-size: 14px;
                color: var(--anzhiyu-fontcolor);
                margin-bottom: 2px;
                letter-spacing: 0.5px;
            }
            .cd-count-left .cd-time {
                font-size: 32px;
                font-weight: 900;
                background: linear-gradient(to right, var(--anzhiyu-main), var(--anzhiyu-theme-op));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                line-height: 1;
                margin-bottom: 4px;
                font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                text-shadow: 2px 4px 8px rgba(var(--anzhiyu-main-rgb), 0.2);
                position: relative;
            }
            .cd-count-left .cd-time::after {
                content: "天";
                font-size: 12px;
                margin-left: 2px;
                -webkit-text-fill-color: var(--anzhiyu-secondtext);
                color: var(--anzhiyu-secondtext);
                font-weight: 400;
                opacity: 0.8;
                vertical-align: baseline;
            }
            .cd-count-left .cd-date {
                font-size: 12px;
                color: var(--anzhiyu-secondtext);
                opacity: 0.6;
                letter-spacing: 0.5px;
                transform: scale(0.9);
            }
            .cd-count-right {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding-left: 12px;
                border-left: 1px dashed var(--anzhiyu-secondbg);
            }
            .cd-count-item {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            .cd-item-name {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 12px;
                color: var(--anzhiyu-fontcolor);
                width: 45px;
                white-space: nowrap;
                font-weight: 500;
            }
            .cd-item-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--anzhiyu-secondtext);
            }
            .cd-item-icon svg {
                width: 14px;
                height: 14px;
                stroke-width: 2.5;
            }
            .cd-item-bar {
                flex: 1;
                height: 6px;
                background-color: var(--anzhiyu-secondbg);
                border-radius: 10px;
                overflow: hidden;
                box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);
            }
            .cd-progress-bar {
                height: 100%;
                border-radius: 10px;
                background: linear-gradient(90deg, var(--anzhiyu-main) 0%, var(--anzhiyu-theme-op) 100%);
                transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                position: relative;
                overflow: hidden;
            }
            .cd-progress-bar::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                transform: translateX(-100%);
                animation: shimmer 2s infinite;
            }
            @keyframes shimmer {
                100% { transform: translateX(100%); }
            }
            .cd-item-value {
                width: 50px;
                font-size: 12px;
                position: relative;
                text-align: right;
                height: 18px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: var(--anzhiyu-fontcolor);
                font-variant-numeric: tabular-nums;
                font-weight: 600;
            }
            .cd-percentage,
            .cd-remaining {
                position: absolute;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                white-space: nowrap;
            }
            .cd-remaining {
                opacity: 0;
                transform: translateY(10px);
                color: var(--anzhiyu-main);
            }
            .card-countdown .item-content:hover .cd-remaining {
                opacity: 1;
                transform: translateY(0);
            }
            .card-countdown .item-content:hover .cd-percentage {
                opacity: 0;
                transform: translateY(-10px);
            }
        `;

        const styleSheet = document.createElement("style");
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    let timer;
    const start = () => {
        injectStyles();
        updateCountdown();
        timer = setInterval(updateCountdown, 600000);
    };

    ['pjax:complete', 'DOMContentLoaded'].forEach(event => document.addEventListener(event, start));
    document.addEventListener('pjax:send', () => timer && clearInterval(timer));

    return { start, stop: () => timer && clearInterval(timer) };
})();
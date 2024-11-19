// ==UserScript==
// @name         去除logo水印优化版
// @namespace    http://tampermonkey.net/
// @version      1.4.2
// @description  免费去除在线制作logo中的水印，适用于标智客、标小智、LOGO123
// @license      AGPL-3.0-or-later
// @author       imoki,诸葛
// @match        *://www.logomaker.com.cn/*
// @match        *://www.logosc.cn/*
// @match        *://ai.logo123.com/*
// @grant        none
// ==/UserScript==
 
(function ($) {
    'use strict';
 
    // 添加悬浮按钮 HTML 和样式
    const buttonHtml = `
    <div style='padding:10px; position: fixed; right: 10px; top: 50%; z-index: 99999;'>
        <button id='clearWatermark'
                style='padding: 10px; margin-bottom: 10px; box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2); border: 1px solid #007BFF;
                       border-radius: 30px; font-size: 14px; font-weight: bold; background: linear-gradient(white, #B2D3F5);
                       color: #000; cursor: pointer;'>
            去水印
        </button>
        <button id='clearBackground'
                style='padding: 10px; box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.2); border: 1px solid #007BFF;
                       border-radius: 30px; font-size: 14px; font-weight: bold; background: linear-gradient(white, #B2D3F5);
                       color: #000; cursor: pointer;'>
            去背景
        </button>
    </div>`;
    $("body").prepend(buttonHtml);
 
    // 核心移除功能
    const clearElements = () => {
        $(".watermark, .watermarklayer, .el-tooltip.css-139qfe, .css-1ii3ma3").remove();
    };
 
    // 动态检测并移除目标元素
    const observeMutations = () => {
        const observer = new MutationObserver(() => {
            clearElements();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    };
 
    // 按钮事件
    $("button#clearWatermark").on("click", () => {
        clearElements();
        observeMutations(); // 启动动态检测，持续移除新生成的目标元素
    });
 
    $("button#clearBackground").on("click", () => {
        $(".background").remove();
    });
 
    // 自动去除水印和背景
    const autoClear = () => {
        setTimeout(clearElements, 5000); // 初始延迟处理，确保页面加载完成
    };
 
    // 防抖函数，用于滚动事件
    const debounce = (func, delay) => {
        let timeout;
        return () => {
            clearTimeout(timeout);
            timeout = setTimeout(func, delay);
        };
    };
 
    // 滚动时动态清理
    window.onscroll = debounce(clearElements, 200);
 
    // 初始化加载
    $(document).ready(() => {
        autoClear();
    });
})(jQuery);

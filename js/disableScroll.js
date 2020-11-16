// Отключение скроллинга при открытом модальном окне
window.disableScroll = function () {
    const widthScroll = window.innerWidth - document.body.offsetWidth;

    document.body.dbScrollY = window.scrollY;

    document.body.style.cssText = `
        overflow:hidden;
        position:fixed;
        top:${-window.scrollY}px;
        left:0;
        width:100%;
        height:100vh;
        padding-right :${widthScroll}px;
    `;
}
window.enableScroll = function () {
    document.body.style.cssText =``;
    window.scroll({
        top:document.body.dbScrollY
    })
}

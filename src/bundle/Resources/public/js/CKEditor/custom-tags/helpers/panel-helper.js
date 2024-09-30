const setPanelContentMaxHeight = (balloonView) => {
    const MIN_HEIGHT_VALUE = 100;
    const MARGIN = 50;
    const { innerHeight: windowHeight } = window;
    const { element: panelNode } = balloonView;
    const panelHeader = panelNode.querySelector('.ibexa-custom-tag-panel-header');
    const panelContent = panelNode.querySelector('.ibexa-custom-tag-panel-content');
    const panelFooter = panelNode.querySelector('.ibexa-custom-tag-panel-footer');

    if (!panelContent) {
        return;
    }

    const isBalloonAbovePivot = panelNode.classList.contains('ck-balloon-panel_arrow_s');
    const panelInitialHeight = panelNode.offsetHeight;
    const panelTopPosition = parseInt(panelNode.style.top, 10);
    const panelHeaderHeight = panelHeader?.offsetHeight ?? 0;
    const panelFooterHeight = panelFooter?.offsetHeight ?? 0;
    const maxHeightValue = isBalloonAbovePivot
        ? panelInitialHeight + panelTopPosition - panelHeaderHeight - panelFooterHeight - MARGIN
        : windowHeight - panelTopPosition - panelHeaderHeight - panelFooterHeight - MARGIN;
    const panelMaxHeight = maxHeightValue < MIN_HEIGHT_VALUE ? MIN_HEIGHT_VALUE : maxHeightValue;

    panelContent.style.maxHeight = `${panelMaxHeight}px`;

    if (isBalloonAbovePivot) {
        const panelNewHeight = panelNode.offsetHeight;
        const panelHeightChange = panelInitialHeight - panelNewHeight;
        const panelNewTopPosition = panelTopPosition + panelHeightChange;

        panelNode.style.top = `${panelNewTopPosition}px`;
    }
};

export { setPanelContentMaxHeight };
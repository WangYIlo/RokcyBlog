export default function animateText(textElement: HTMLElement, text: string, showDelay: number, hideDelay: number): void {
    let index = 0;

    // 逐个显示文字
    function showNextLetter(): void {
        if (index < text.length) {
            textElement.innerText=text.slice(0,index++)
            setTimeout(showNextLetter, showDelay);
        } else {
            setTimeout(hideNextLetter, hideDelay);
        }
    }

    // 逐个隐藏文字
    function hideNextLetter(): void {
        if (index > 0) {
            textElement.innerText = text.slice(0, index--);
            setTimeout(hideNextLetter, hideDelay);
        } else {
            setTimeout(showNextLetter, showDelay);
        }
    }

    // 开始逐个显示文字
    showNextLetter();
}
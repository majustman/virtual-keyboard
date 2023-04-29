export default function createElement(tagName, className) {
    const element = document.createElement(tagName);
    element.classList.add(className);
    return element;
}

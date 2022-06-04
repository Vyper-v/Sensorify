class App {
  
  constructor(id) {
    this.dom = document.querySelector(id);
  }

  add(childTag, content = "", props) {
    childNode = document.createElement(childTag);
    this.dom.appendChild(childTag);
    return this.put(childTag, content, props, { replace: true });
  }

  get(childTag) {
    return this.dom.querySelector(childTag);
  }

  put(childTag, content = "", props, options = { replace: false }) {
    const childNode = this.get(childTag);

    if (props) {
      Object.keys(props).forEach((key) => {
        if (key === "className") {
          childNode.classList.add(props[key]);
        } else if (key.startsWith("on")) {
          childNode.addEventListener(key.substring(2), props[key]);
        } else {
          childNode.setAttribute(key, props[key]);
        }
      });
    }

    if (content !== "" && options.replace === true) {
      childNode.innerHTML = content;
    } else if (content !== "" && options.replace === false) {
      childNode.innerHTML += content;
    }

    return childNode;
  }

  remove(childTag) {
    this.dom.removeChild(childTag);
  }
}

export default App;

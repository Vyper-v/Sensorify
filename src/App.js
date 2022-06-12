import Router from "vanilla-router";


class App {
  
  constructor(id) {
    this.dom = document.querySelector(id);
    this.router = new Router({
      mode: 'hash',
      page404: function (path) {
          if(this.dom.hasChildNodes()) {
            const children = this.dom.childNodes;
            const childList = Array.from(children);
            childList.forEach((child) => {
              this.dom.removeChild(child);
            });
          }
          this.add("h1", path+"404 - Page not found");
      }
  });

  this.router.addUriListener();
  
  }

  add(childTag, content = "", props) {
    const childNode = document.createElement(childTag);
    this.dom.appendChild(childNode);
    return this.put(childTag, content, props, { replace: true });
  }

  appendToChild(childTag, containerTag,content="") {
    const fragment = document.createElement(containerTag);
    fragment.innerHTML = content;
    this.get(childTag).appendChild(fragment);
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

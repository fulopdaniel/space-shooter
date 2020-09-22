class Input {
  key: string;
  keyDownHandler: any;
  keyUpHandler: any;
  onDown: any;
  onUp: any;

  constructor(key: string, keyDownHandler?: any, keyUpHandler?: any) {
    this.key = key;
    this.keyDownHandler = keyDownHandler;
    this.keyUpHandler = keyUpHandler;
    this.onDown = this.onDownHandler.bind(this);
    this.onUp = this.onUpHandler.bind(this);
    this.subscribe();
  }

  onDownHandler(event: KeyboardEvent) {
    if (event.key === this.key && !event.repeat) {
      this.keyDownHandler();
    }
  }

  onUpHandler(event: KeyboardEvent) {
    if (event.key === this.key && !event.repeat) {
      this.keyUpHandler();
    }
  }

  subscribe() {
    if (this.keyDownHandler) {
      window.addEventListener("keydown", this.onDown);
    }
    if (this.keyUpHandler) {
      window.addEventListener("keyup", this.onUp);
    }
  }

  unsubscribe() {
    if (this.keyDownHandler) {
      window.removeEventListener("keydown", this.onDown);
    }
    if (this.keyUpHandler) {
      window.removeEventListener("keyup", this.onUp);
    }
  }
}

export default Input;

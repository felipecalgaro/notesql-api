export class Name {
  private content: string;

  get value() {
    return this.content;
  }

  validateContentLength(content: string) {
    return content.length <= 30;
  }

  constructor(content: string) {
    const isContentValid = this.validateContentLength(content);

    if (!isContentValid) {
      throw new Error("Name must have maximum length of 30 characters.");
    }

    this.content = content;
  }
}

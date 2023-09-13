export class BaseModel {
  public copyWith(modifyObject: { [P in keyof this]?: this[P] }): this {
    return Object.assign(Object.create(this.constructor.prototype), {
      ...this,
      ...modifyObject,
    });
  }

  public static create<T extends BaseModel>(
    this: new () => T,
    modifyObject: Partial<T>,
  ): T {
    return new this().copyWith(modifyObject);
  }
}

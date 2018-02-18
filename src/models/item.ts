/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Item {

  public name: string;
  public created_date: string;
  public user: string;
  public desc: string;
  public day: string;
  public start_text_time: string;
  public contacts: any;

  constructor(name: string, created_date:string, desc:string, day:string, start_text_time:string) {
    this.name = name;

  }

}

export interface Item {
  [prop: string]: any;
}

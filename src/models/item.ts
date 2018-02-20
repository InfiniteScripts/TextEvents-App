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
  public user: string;
  public profilePic: string;
  public created_date: number;

  public desc: string;
  public day: string;
  public start_text_time: string;
  public start_text_am_pm: string;
  public contacts: any;
  public id: string;

  constructor(data: any) {
    for (let key in data) {
            this[key] = data[key];
    }

    this.created_date = Date.now();
    this.profilePic = 'assets/img/profile/pokerchip.png';
    this.user = localStorage.getItem('currentUser');
  }

}

export interface Item {
  [prop: string]: any;
}

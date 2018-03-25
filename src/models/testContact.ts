export class TestContact {

  public name: string;
  public id: number;
  public phoneNumbers: string;
  public displayName: string;



  constructor(data: any) {
    for (let key in data) {
            this[key] = data[key];
    }

  }

}

export interface Item {
  [prop: string]: any;
}

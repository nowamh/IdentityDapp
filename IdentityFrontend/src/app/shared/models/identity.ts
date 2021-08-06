export class Identity {
    firstname: string
    lastname: string
    nickName:string
    avatarHash:string
     index:Int16Array


    constructor(    firstname: string,
        lastname: string,
        nickName:string,
        avatarHash:string,
        index:Int16Array
        ) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.nickName = nickName;
      this.avatarHash = avatarHash;
      this.index=index
    }
}
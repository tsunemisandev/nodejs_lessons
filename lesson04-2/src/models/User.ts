class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}

export default User;

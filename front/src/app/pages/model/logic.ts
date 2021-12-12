let name = '';

export function saveUserName(userName: string): void {
  name = userName;
}

export function getUserName(): string {
  return name;
}

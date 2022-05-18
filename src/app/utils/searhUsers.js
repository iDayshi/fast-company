export function searchUser(users, findUser) {
  const foundMatches = users.filter((user) =>
    user.name.toLowerCase().match(`${findUser.toLowerCase()}`)
  );
  return foundMatches;
}

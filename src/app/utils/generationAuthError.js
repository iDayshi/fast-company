export function generationAuthError(message) {
  switch (message) {
    case "INVALID_PASSWORD" && "EMAIL_NOT_FOUND":
      return "Введён неверный Email или Password";
    case "EMAIL_EXISTS":
      return "Введён неверный Email или Password";

    default:
      throw new Error("Множественные попытки входа. Попробуйте позже");
  }
}

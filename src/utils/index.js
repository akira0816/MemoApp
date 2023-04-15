import { format } from "date-fns";

export function dateToString(date) {
  if (!date) {
    return "";
  }
  return format(date, "yyyy年M月d日 HH時mm分");
}

export function translateErrors(code) {
  const error = { title: "エラー", descrption: "時間をおいてお試しください。" };
  switch (code) {
    case "auth/invalid-email":
      error.title = "メールアドレス";
      error.descrption = "メールアドレスが不正です。";
      break;
    case "auth/user-desabled":
      error.descrption = "アカウントが無効です。";
      break;
    case "auth/user-not-found":
      error.descrption = "ユーザーがみつかりませんでした。";
      break;
    case "auth/wrong-password":
      error.descrption = "パスワードが間違っています。";
      break;
    case "auth/email-already-in-use":
      error.descrption = "メールアドレスが既に使用されています。";
      break;
    case "auth/operation-not-allowed":
      error.descrption = "開発者にお問い合わせください。";
      break;
    case "auth/weak-password":
      error.descrption = "パスワードが簡単過ぎます。";
      break;
    default:
  }
  return error;
}

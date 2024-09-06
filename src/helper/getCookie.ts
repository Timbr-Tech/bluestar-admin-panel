/* eslint-disable */

export function getCookie(cname: string) {
  let decodedCookie;

  if (typeof window !== "undefined") {
    decodedCookie = decodeURIComponent(document.cookie);
  }

  const ca = decodedCookie?.split(";");

  const tokenCookie = ca?.filter((el) => el?.includes(`${cname}=`));

  const tokenArr =
    (tokenCookie && tokenCookie[0] && tokenCookie[0]?.split("=")) || null;

  if (tokenArr) {
    return tokenArr[1];
  }

  return "";
}

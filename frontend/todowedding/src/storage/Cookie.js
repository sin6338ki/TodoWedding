import { Cookies } from "react-cookie";

/**
 * Refresh Token 저장을 위한 저장소 (Cookie 사용)
 * 작성자 : 신지영
 * 작성일 : 2023.09.09
 */

const cookies = new Cookies();

/**
 * Refresh Token을 Cookie에 저장
 * sameSite : strict -> 동일한 사이트에서 발생한 요청에만 쿠키를 포함함
 *                      현재 사이트에서 다른 사이트로 링크를 통해 이동할 경우, 쿠키 전송 차단
 *            lax -> 일부 다른 사이트로 링크를 통해 이동할 경우 GET 요청에 대해 쿠키 전송
 *            none -> 모든 종류의 요청에 대하여 쿠키 전송
 * path : 웹사이트 내에서 어떤 경로에 대해 해당 쿠키가 유효한지 지정
 *          "/" -> 웹사이트의 모든 페이지에서 해당 쿠키 정보 사용 가능
 */
export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate() + 7);

    return cookies.set("refresh_token", refreshToken, {
        sameSite: "strict",
        path: "/",
        expires: new Date(expireDate),
    });
};

/**
 * Cookie에 저장된 Refresh Token 값 가져오기
 */
export const getCookieToken = () => {
    return cookies.get("refresh_token");
};

/**
 * Cookie 삭제 - 로그아웃시 사용
 */
export const removeCookieToken = () => {
    return cookies.remove("refresh_token", { sameSite: "strict", path: "/" });
};

export const getCookie = (key: string) => {
    const b: any = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
} 

export const formatMoney = (money: number) => {
    return `$${(money/100).toFixed(2)}`;
}
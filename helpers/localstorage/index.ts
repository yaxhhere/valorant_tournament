export const darkModeSwitch = (darkMode: string) => {
    localStorage.setItem('darkMode', darkMode);
}

export const getDarkMode = (): boolean => {
    return localStorage.getItem('darkMode') == 'true' ? true : false;
}
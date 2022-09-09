const getLocalStorage = (code: string, iscrypto: boolean = true) => {
  const codeLocal = window.localStorage.getItem(code);
  const stringEncode = codeLocal || '';

  let deserializedValue;
  try {
    deserializedValue = JSON.parse(stringEncode);
  } catch (error) {
    deserializedValue = null;
    window.localStorage.removeItem(code);
  }

  return deserializedValue;
};
const setLocalStorage = (
  code: string,
  value: any,
  iscrypto: boolean = true
) => {
  let serializedValue = JSON.stringify(value);
  window.localStorage.setItem(code, serializedValue);
};

export const setToken = (token: string | null) =>
  setLocalStorage('token', token);
export const getToken = (): string | null => getLocalStorage('token');

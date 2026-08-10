const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

export const getApiHost = () => {
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  return 'http://localhost:8000';
};

export const getApiEndpoint = (resource) => `${getApiHost()}/api/${resource}`;

export const parseApiResponse = async (response) => {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.error || payload?.message || response.statusText;
    throw new Error(message);
  }

  return payload?.data ?? payload;
};

export const normalizeApiData = (payload) => {
  if (payload == null) return [];
  if (Array.isArray(payload)) return payload;
  return payload;
};

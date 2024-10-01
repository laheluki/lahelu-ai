export function checkProvider(provider: string) {
  let url = '';
  switch (provider) {
    case 'groq':
      url = '/api/chat/groq';
      break;
    case 'openai':
      url = '/api/chat/openai';
      break;
    case 'google':
      url = '/api/chat/google';
      break;
    case 'zhipu':
      url = '/api/chat/zhipu';
      break;
    default:
      break;
  }

  return url;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'marabout-aziman.fr') {
    url.hostname = 'www.marabout-aziman.fr';
    return Response.redirect(url.toString(), 301);
  }
  return context.next();
}

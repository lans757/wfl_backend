export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    return new Response('Hello World from WFL Backend Worker!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
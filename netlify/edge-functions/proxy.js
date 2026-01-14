export default async (request, context) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");

  if (!targetUrl) {
    return new Response("Kullanım: /proxy?url=VIDEO_LINKI", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      headers: {
        "Range": request.headers.get("Range") || "",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      }
    });

    const newResponse = new Response(response.body, response);
    
    // CORS İzinleri
    newResponse.headers.set("Access-Control-Allow-Origin", "*");
    newResponse.headers.set("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
    newResponse.headers.set("Access-Control-Allow-Headers", "*");

    return newResponse;

  } catch (error) {
    return new Response("Hata: " + error.message, { status: 500 });
  }
};
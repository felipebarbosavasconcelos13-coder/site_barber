module.exports = async (req, res) => {
    // Cabeçalhos CORS para permitir requisições locais e cross-origin se necessário
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Metodo nao permitido. Use POST.' });
    }

    let { apiKey, placeId } = req.body || {};

    // Tenta ler prioritariamente da variavel de ambiente do servidor para maxima seguranca
    if (!apiKey || apiKey.trim() === '') {
        apiKey = process.env.GOOGLE_PLACES_API_KEY;
    }

    if (!apiKey || apiKey.trim() === '') {
        return res.status(400).json({ error: 'Google Places API Key nao configurada no servidor.' });
    }
    if (!placeId || placeId.trim() === '') {
        return res.status(400).json({ error: 'Informe o Google Place ID do estabelecimento.' });
    }

    try {
        const params = new URLSearchParams({
            place_id: placeId.trim(),
            fields: "name,rating,user_ratings_total,reviews",
            reviews_sort: "newest",
            language: "pt-BR",
            key: apiKey.trim()
        });

        const url = `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.status !== "OK") {
            // Mapeia mensagens ricas e amigáveis para erros comuns do Google
            let errorMessage = data.error_message || `Falha do Google Places (${data.status}).`;
            if (data.status === "REQUEST_DENIED") {
                errorMessage = "Chave de API negada pelo Google. Certifique-se de que a Places API esta ativada no projeto do Google Cloud Console e de que a chave nao esta com restricoes incorretas.";
            } else if (data.status === "INVALID_REQUEST") {
                errorMessage = "Requisicao invalida. O Place ID informado pode estar incorreto ou malformatado.";
            } else if (data.status === "OVER_QUERY_LIMIT") {
                errorMessage = "Limite de cota excedido ou faturamento nao ativo no Google Cloud Console.";
            }

            return res.status(400).json({ 
                success: false,
                error: errorMessage,
                status: data.status
            });
        }

        const result = data.result || {};
        return res.status(200).json({
            success: true,
            name: result.name || "",
            rating: result.rating || 0,
            user_ratings_total: result.user_ratings_total || 0,
            reviews: result.reviews || []
        });

    } catch (error) {
        console.error("[places-api-error]:", error);
        return res.status(500).json({ error: error.message || 'Erro interno do servidor ao consultar o Google.' });
    }
};

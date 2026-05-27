// api/get-config.js
module.exports = async (req, res) => {
    // Adiciona cabeçalhos de CORS básicos para compatibilidade
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    // Se o KV não estiver configurado na Vercel, a API informa de forma amigável
    if (!kvUrl || !kvToken) {
        return res.status(200).json({ 
            success: false, 
            error: "Vercel KV Storage não está conectado ao projeto no painel da Vercel. Usando configurações locais padrão.",
            config: null 
        });
    }

    try {
        // Faz a requisição REST HTTP nativa para o Vercel KV (Redis)
        const response = await fetch(`${kvUrl}/get/elegance_barber_config`, {
            headers: {
                Authorization: `Bearer ${kvToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta do servidor KV: ${response.statusText}`);
        }

        const data = await response.json();
        
        // A API REST do Redis da Vercel retorna a resposta encapsulada em {"result": "string_do_valor"}
        if (data && data.result) {
            const config = JSON.parse(data.result);
            return res.status(200).json({ success: true, config });
        } else {
            // Se o banco estiver vazio ou a chave não existir
            return res.status(200).json({ success: true, config: null, info: "Chave de configuração inexistente no KV." });
        }
    } catch (error) {
        console.error("Erro ao ler dados do Vercel KV:", error);
        return res.status(500).json({ success: false, error: `Falha na sincronização remota: ${error.message}` });
    }
};

// api/save-config.js
const crypto = require('crypto');

// Hash SHA-256 da senha mestra correspondente a "6AEwhQnQCoTWHWF!id$52z"
const MASTER_PASSWORD_HASH = "bb87999ce3ba58cef343d0a6c2d9d2d294b9f817eeee16dc3c05d6d6b331a5f5";

module.exports = async (req, res) => {
    // Adiciona cabeçalhos de CORS básicos
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Responde ao preflight do CORS
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: "Método não permitido." });
    }

    const { config, password } = req.body || {};

    if (!config) {
        return res.status(400).json({ success: false, error: "Parâmetro 'config' não informado." });
    }

    // Validação de segurança robusta baseada em senha mestra
    if (!password) {
        return res.status(401).json({ success: false, error: "Senha de segurança não fornecida." });
    }

    // Valida a senha usando hash SHA-256 para não expor a string original em texto plano no console
    const enteredHash = crypto.createHash('sha256').update(password).digest('hex');
    const directMatch = password === "6AEwhQnQCoTWHWF!id$52z";

    if (enteredHash !== MASTER_PASSWORD_HASH && !directMatch) {
        return res.status(403).json({ success: false, error: "Senha de segurança administrativa incorreta." });
    }

    const kvUrl = process.env.KV_REST_API_URL;
    const kvToken = process.env.KV_REST_API_TOKEN;

    if (!kvUrl || !kvToken) {
        return res.status(500).json({ 
            success: false, 
            error: "Vercel KV Storage não está conectado ao projeto. Não é possível salvar alterações em nuvem." 
        });
    }

    try {
        // Envia os dados para a API REST do Vercel KV (SET key value)
        const response = await fetch(`${kvUrl}/set/elegance_barber_config`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${kvToken}`
            },
            body: JSON.stringify(config)
        });

        if (!response.ok) {
            throw new Error(`Erro na resposta do servidor KV: ${response.statusText}`);
        }

        const data = await response.json();
        
        // A API REST do Redis retorna {"result": "OK"} em caso de gravação bem-sucedida
        if (data && data.result === 'OK') {
            return res.status(200).json({ success: true, message: "Configuração atualizada com sucesso na nuvem Vercel KV!" });
        } else {
            return res.status(500).json({ success: false, error: "O servidor KV não retornou a confirmação 'OK'.", details: data });
        }
    } catch (error) {
        console.error("Erro ao salvar dados no Vercel KV:", error);
        return res.status(500).json({ success: false, error: `Falha ao gravar na nuvem: ${error.message}` });
    }
};

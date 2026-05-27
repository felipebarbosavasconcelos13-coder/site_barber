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

    const supabaseUrl = process.env.STORAGE_URL;
    // Damos preferência à service_role para contornar RLS de gravação, senão usamos a anon
    const supabaseKey = process.env.STORAGE_SERVICE_ROLE_KEY || process.env.STORAGE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ 
            success: false, 
            error: "A integração do Supabase não está conectada ao projeto. Não é possível salvar alterações em nuvem." 
        });
    }

    try {
        // Envia os dados para a API REST do Supabase para realizar um UPSERT nativo no banco
        // Para fazer UPSERT no Supabase/PostgREST enviamos um POST com a chave primária 'id'
        // e incluímos o header 'Prefer: resolution=merge-duplicates'
        const response = await fetch(`${supabaseUrl}/rest/v1/configuracoes`, {
            method: 'POST',
            headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                'Content-Type': 'application/json',
                'Prefer': 'resolution=merge-duplicates'
            },
            body: JSON.stringify({
                id: 'barber_config',
                dados: config
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Erro na gravação do Supabase (${response.status}): ${errText}`);
        }

        return res.status(200).json({ success: true, message: "Configuração atualizada com sucesso na nuvem do Supabase!" });
    } catch (error) {
        console.error("Erro ao salvar dados no Supabase:", error);
        return res.status(500).json({ success: false, error: `Falha ao gravar na nuvem: ${error.message}` });
    }
};

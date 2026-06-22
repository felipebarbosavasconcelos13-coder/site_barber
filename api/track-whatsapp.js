// api/track-whatsapp.js
module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Metodo nao permitido.' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    const configId = process.env.SUPABASE_CONFIG_ID || 'barber_config';

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ success: false, error: 'Supabase nao configurado.' });
    }

    try {
        const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        if (!payload || typeof payload !== 'object') {
            return res.status(400).json({ success: false, error: 'Payload invalido.' });
        }

        const configResponse = await fetch(`${supabaseUrl}/rest/v1/configuracoes?id=eq.${configId}&select=dados`, {
            headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`
            }
        });

        if (!configResponse.ok) {
            throw new Error(`Erro ao buscar configuracao (${configResponse.status}).`);
        }

        const configData = await configResponse.json();
        const config = configData && configData[0] && configData[0].dados ? configData[0].dados : null;
        const webhookUrl = config && config.integrations && config.integrations.webhook_url ? config.integrations.webhook_url.trim() : '';

        if (!webhookUrl) {
            return res.status(200).json({ success: false, skipped: true, error: 'Webhook nao configurado.' });
        }

        const webhookResponse = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!webhookResponse.ok) {
            const errorText = await webhookResponse.text();
            throw new Error(`Webhook retornou ${webhookResponse.status}: ${errorText}`);
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Erro ao rastrear clique de WhatsApp:', error);
        return res.status(500).json({ success: false, error: error.message || 'Erro interno.' });
    }
};

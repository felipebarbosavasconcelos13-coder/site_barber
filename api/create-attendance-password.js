// api/create-attendance-password.js
const crypto = require('crypto');

const PASSWORD_PREFIX = 'WPP';
const PASSWORD_LENGTH = 6;
const PASSWORD_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const MAX_ATTEMPTS = 12;

function generateAttendancePassword() {
    let code = '';
    const bytes = crypto.randomBytes(PASSWORD_LENGTH);

    for (let i = 0; i < PASSWORD_LENGTH; i++) {
        code += PASSWORD_ALPHABET[bytes[i] % PASSWORD_ALPHABET.length];
    }

    return `${PASSWORD_PREFIX}-${code}`;
}

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
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        return res.status(500).json({ success: false, error: 'Supabase service role nao configurado.' });
    }

    try {
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            const password = generateAttendancePassword();

            const response = await fetch(`${supabaseUrl}/rest/v1/attendance_passwords`, {
                method: 'POST',
                headers: {
                    apikey: supabaseKey,
                    Authorization: `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json',
                    Prefer: 'return=representation'
                },
                body: JSON.stringify({
                    password,
                    status: 'reserved'
                })
            });

            if (response.ok) {
                return res.status(200).json({ success: true, password });
            }

            const errorText = await response.text();
            if (response.status === 409 || errorText.toLowerCase().includes('duplicate')) {
                continue;
            }

            throw new Error(`Erro ao reservar senha (${response.status}): ${errorText}`);
        }

        return res.status(500).json({ success: false, error: 'Nao foi possivel gerar uma senha unica.' });
    } catch (error) {
        console.error('Erro ao criar senha de atendimento:', error);
        return res.status(500).json({ success: false, error: error.message || 'Erro interno.' });
    }
};

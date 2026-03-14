import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { diagnosticId, diagnosticScore, companyName, resultData } = req.body;

  try {
    // Definindo as configurações de e-mail e senha enviadas pelo usuário
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'produtorahc@gmail.com',
        // ATENÇÃO: Se o Gmail bloquear este acesso por senha insegura, 
        // será necessário gerar uma "Senha de App" (App Password) no Google.
        pass: '@1234567'
      }
    });

    // Enviar e-mail formatado para o Administrador
    const mailOptions = {
      from: '"F-Laure Diagnostic" <produtorahc@gmail.com>',
      to: 'produtorahc@gmail.com',
      subject: `Novo Diagnóstico Recebido - ${companyName || 'Empresa'} (Score: ${diagnosticScore})`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2563EB;">Novo Diagnóstico Concluído!</h2>
          <p>Um novo diagnóstico acabou de ser finalizado através da plataforma F-Laure.</p>
          
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>ID:</strong> ${diagnosticId}</p>
            <p><strong>Empresa (Se aplicável):</strong> ${companyName || 'Não informada'}</p>
            <p><strong>Score Global:</strong> <span style="font-size: 18px; color: #059669; font-weight: bold;">${diagnosticScore}%</span></p>
          </div>

          <p>Para ver os detalhes completos das respostas e do plano de ação gerado, faça login no painel administrativo do seu aplicativo e busque pelo ID <strong>${diagnosticId}</strong>.</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
          <p style="font-size: 12px; color: #777;">F-Laure Diagnostic System - Este é um e-mail automático.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}

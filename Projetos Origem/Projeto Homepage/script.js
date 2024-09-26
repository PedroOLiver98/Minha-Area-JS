const axios = require('axios');

// Configuração da API do WhatsApp
const apiToken = 'SEU_TOKEN_API_DO_WHATSAPP';
const apiURL = 'https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages';

// Função para enviar mensagem via WhatsApp
async function sendMessage(numeroTelefone, message) {
  const headers = {
    'Authorization': `Bearer ${apiToken}`,
    'Content-Type': 'application/json'
  };
  const data = {
    'messaging_product': 'whatsapp',
    'to': numeroTelefone.replace(/\D/g, ''), // Remove todos os caracteres não numéricos
    'type': 'text',
    'text': {
      'body': message
    }
  };
  
  try {
    const response = await axios.post(apiURL, data, { headers });
    console.log('Mensagem enviada com sucesso:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // A resposta foi recebida, mas houve um erro na requisição
      console.error('Erro na resposta da API:', error.response.data);
    } else if (error.request) {
      // A requisição foi feita, mas não houve resposta
      console.error('Nenhuma resposta recebida:', error.request);
    } else {
      // Outro erro ocorreu ao configurar a requisição
      console.error('Erro ao configurar a requisição:', error.message);
    }
  }
}

// Função para agendar compromisso
async function scheduleAppointment(numeroTelefone, nomearData, nomearHora) {
  const message = `Olá! Você tem um compromisso agendado para ${nomearData} às ${nomearHora}.`;
  await sendMessage(numeroTelefone, message);
}

// Exemplo de uso
const numeroTelefone = '+5511999999999';
const nomearData = '2024-08-30';
const nomearHora = '14:00';
scheduleAppointment(phoneNumber, appointmentDate, appointmentTime);

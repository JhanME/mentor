import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMentorshipReport(keywords: string): Promise<string> {
  try {
    const prompt = `
Eres un asistente especializado en generar reportes formales de mentorías universitarias.

Genera una descripción formal y profesional de una sesión de mentoría basada en las siguientes palabras clave: ${keywords}

La descripción debe:
- Ser en español
- Usar lenguaje universitario y formal
- Tener entre 100-200 palabras
- Incluir una introducción, desarrollo y conclusión
- Mencionar los temas abordados
- Destacar recomendaciones y estrategias
- Terminar con un resumen positivo

Ejemplo de estructura:
"Durante la mentoría se abordaron estrategias de estudio eficientes, haciendo énfasis en la organización del tiempo y la planificación semanal. Asimismo, se brindaron recomendaciones para el manejo del estrés académico y la adaptación a la carga universitaria, promoviendo hábitos saludables y una rutina de estudio constante."
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Eres un generador de reportes de mentorías universitarias.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content?.trim() || 'Error al generar el reporte';
  } catch (error) {
    console.error('Error generating report:', error);
    return 'Error al generar el reporte con IA';
  }
}
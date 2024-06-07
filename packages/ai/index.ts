import { ChatOpenAI } from "@langchain/openai";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "@langchain/core/prompts";

export const classifyEmail = async (body: string) => {
  const SECRECT_KEY = process.env.OPEN_API_SECRECT_KEY;

  const chat = new ChatOpenAI({ openAIApiKey: SECRECT_KEY });

  const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate(
    "Classify the following email into one of these categories: spam, important, or marketing in one word only."
  );

  const humanMessagePrompt =
    HumanMessagePromptTemplate.fromTemplate("{classify_email}");

  const chatPrompt = ChatPromptTemplate.fromMessages([
    systemMessagePrompt,
    humanMessagePrompt,
  ]);

  const formatedChatPrompt = await chatPrompt.formatMessages({
    classify_email: body,
  });

  const response = await chat.invoke(formatedChatPrompt);

  return response.content;
};

import express from "express";
import {OpenAI} from "langchain";
import { TokenTextSplitter } from "langchain/text_splitter";
import fs from "fs";
import {OpenAIEmbeddings} from "langchain/embeddings";
import {Chroma} from "langchain/vectorstores";
import {TextLoader} from "langchain/document_loaders";
import {ConversationalRetrievalQAChain} from "langchain/chains";


const ContextQueryHandler = async (req: express.Request , res: express.Response) => {
    const openAIApiKey = process.env.API_KEY
    // Absolute path has to be used because typescript is used here
    const textLoader = new TextLoader("/Users/collinlim/Projects/chatgpt-context-recommender/src/routes/context.txt")
    const context = await textLoader.load()

    // Generate Embeddings
    console.log("1")

    const embeddings = new OpenAIEmbeddings({openAIApiKey});
    console.log("2", embeddings)

    const vector = await Chroma.fromDocuments(context, embeddings, {});
    console.log("3")
    const qa = ConversationalRetrievalQAChain.fromLLM(new OpenAI({openAIApiKey, temperature:0, modelName:"gpt-3.5-turbo"}), vector.asRetriever(), {returnSourceDocuments:true});
    console.log("4")

    // Ask question
    const reqPrompt = (req.query?.prompt?.toString ?  req.query?.prompt?.toString() : req.query?.prompt) || ''
    const parsedPrompt = typeof reqPrompt === 'string' ? reqPrompt : JSON.stringify(reqPrompt)

    console.log("Predicting")

    const result = await qa.call({"question": parsedPrompt})

    console.log("Result",result.text.trim())

    res.status(200).json({
        result: result.text.trim()
    })
}

export default ContextQueryHandler

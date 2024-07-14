import Groq from "groq-sdk";

export class groqClient{
    private static instance: groqClient;
    private groq:any
    
    private constructor(envVar:string){ 
        this.groq=new Groq({apiKey:envVar})
    }

    public static getInstance(envVar:string):groqClient{

        if(!groqClient.instance){
            groqClient.instance=new groqClient(envVar)
        }
        return groqClient.instance
    }
    public getGroqInstance(){
        return this.groq;
    }

}
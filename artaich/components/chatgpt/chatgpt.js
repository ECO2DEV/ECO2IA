import { useState } from "react";
import countTokens from "../../util/count_tokens";
import Loader from "../loader/loader";
import Counter from "../tokenCountCard/tokenCount";
import { Suspense } from 'react';

export default function ChatGpt(){
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('');
    const [prompTokens, setprompTokens] = useState(0)
    const [tokensUsed, setTokensUsed] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const strapiToken = process.env.API_TOKEN;

    const FetchData = async () => {
        setIsLoading(true)
        // Realiza la llamada a la API
        console.log(prompt);
        const res = await fetch("http://localhost:1337/api/openai/chatgpt",{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${strapiToken}`
            },
            //body: JSON.stringify({prompt})
            body:JSON.stringify({"prompt":prompt})
        });
        
        const data = await res.json();
        setResponse(data.data);
        console.log(JSON.stringify(data));
        let resptokens = countTokens(data.data);
        setTokensUsed(prompTokens + resptokens);
        setIsLoading(false)
      //  let number_tokens = countTokens(data.data);
        //console.log("Number tokens is" + number_tokens);

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        let tokens = countTokens(e.target.value);
        setPrompt(e.target.value);
        setprompTokens(tokens);
    }
    
    return(
        <div>
            <h1>Generate a Question</h1>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={e => handleChange(e)}/>
            <br></br>
          
            <button onClick={FetchData} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate Response</button>
            
            {!loading ? 
                
                <div className="mt-2">
                    <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    defaultValue={response}
                   />
                    
                </div> : 
                    <div>
                <Loader/>
                </div>
           
                
            }  
            <div> 
            <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2"> 
            <li key={'tokens_prompt'} className="col-span-1 flex rounded-md shadow-sm">   
            <Counter tokens_quantity={prompTokens} token_libelle='Tokens used in this request' bgColor={'bg-green-500'}/>  
            </li> 
            <li key={'total_tokens'} className="col-span-1 flex rounded-md shadow-sm"> 
            <Counter tokens_quantity={tokensUsed} token_libelle='Total Tokens used in this request' bgColor={'bg-gray-600'}/>
            </li>   
            </ul>   
            </div> 
        </div>
    )
}

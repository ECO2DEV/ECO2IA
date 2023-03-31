import { use, useState } from "react";
import countTokens from "../../util/count_tokens";
import Loader from "../loader/loader";
import Counter from "../tokenCountCard/tokenCount";
import { Suspense } from 'react';
import axios from "axios";

export default function ChatGpt(props) {
    const user = props.user;
    //console.log("props" + user);
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState('');
    const [prompTokens, setprompTokens] = useState(0)
    const [tokensUsed, setTokensUsed] = useState(0);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const strapiToken = process.env.API_TOKEN;
    const strapiUrl = process.env.STRAPI_URL;
    console.log(strapiToken + strapiUrl);
    const FetchData = async () => {
        if (!prompt) {
            setError('Please type something before submit')
        }
        else {
            setIsLoading(true)

            // Realiza la llamada a la API
            const header = {
                headers: {
                    Authorization: `Bearer ${strapiToken}`,
                }
            }
            await axios.post(`${strapiUrl}/api/openai/chatgpt`, { "prompt": prompt, "users_permissions_user": user }, header)
                .then(response => {
                    setResponse(response.data.data);
                    let resptokens = countTokens(response.data.data.trim())
                    setTokensUsed(prompTokens + resptokens)
                })
            setIsLoading(false)
        }

        //  let number_tokens = countTokens(data.data);
        //console.log("Number tokens is" + number_tokens);

    }
    const handleChange = (e) => {

        const { name, value } = e.target;
        let tokens = countTokens(e.target.value);
        setPrompt(e.target.value);
        setprompTokens(tokens);
    }

    return (
        <div>
            <h1>Generate a Question</h1>
            <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={e => handleChange(e)} />
            <br></br>
        
            <button onClick={FetchData} className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Generate Response</button>
            {
                error && <h4 className="text-red-700"> {error}</h4>
            }
            { loading && <Loader/> }
            
                <div className="mt-2">
                    <textarea
                        rows={4}
                        name="comment"
                        id="comment"
                        className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                        defaultValue={response}
                    />

                </div> 
                
            <div>
                <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
                    <li key={'tokens_prompt'} className="col-span-1 flex rounded-md shadow-sm">
                        <Counter tokens_quantity={prompTokens} token_libelle='Tokens used in this request' bgColor={'bg-green-500'} />
                    </li>
                    <li key={'total_tokens'} className="col-span-1 flex rounded-md shadow-sm">
                        <Counter tokens_quantity={tokensUsed} token_libelle='Total Tokens used in this request' bgColor={'bg-gray-600'} />
                    </li>
                </ul>
            </div>
        </div>
    )
}

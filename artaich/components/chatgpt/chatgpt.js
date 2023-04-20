import { use, useState } from "react";
import countTokens from "../../util/helpers/count_tokens";
import Loader from "../loader/loader";
import Counter from "../tokenCountCard/tokenCount";

import axios from "axios";

import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid'
import SearchTextbox from "../searchTextbox/searchTextbox";
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
            await axios.post(`${strapiUrl}/api/openai/chatgpt`, { "prompt":  prompt, "users_permissions_user": user }, header)
                .then(response => {
                    console.log('Response is:');
                    console.log(JSON.stringify(response));
                    setResponse(response.data.data);
                    let resptokens = countTokens(response.data.data.trim())
                    setTokensUsed(prompTokens + resptokens)
                })
            setIsLoading(false)
        }

    }
    const handleChange = (e) => {

        let tokens = countTokens(e.target.value);
        setPrompt(e.target.value);
        setprompTokens(tokens);
    }

    return (
        <div>

            <br></br>

      
                <textarea
                    rows={8}
                    name="comment"
                    id="comment"
                    className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                    defaultValue={response}
                />

            <SearchTextbox OnChange={handleChange} Fetch={FetchData} />        
            {
                error && <h4 className="text-red-700"> {error}</h4>
            }
            
             <span className="fixed flex bottom-4 text-gray-900"> Points utilisés pour la question : {prompTokens}&nbsp;&nbsp;{loading && <Loader />} </span>

            {/* <div>
                <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-2">
                    <li key={'tokens_prompt'} className="col-span-1 flex rounded-md shadow-sm">
                        <Counter tokens_quantity={prompTokens} token_libelle='Tokens used in this request' bgColor={'bg-green-500'} />
                    </li>
                    <li key={'total_tokens'} className="col-span-1 flex rounded-md shadow-sm">
                        <Counter tokens_quantity={tokensUsed} token_libelle='Total Tokens used in this request' bgColor={'bg-gray-600'} />
                    </li>
                </ul>
            </div> */}
        </div>
    )
}

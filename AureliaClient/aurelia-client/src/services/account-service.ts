import { HttpClient } from "aurelia";
import { IFetchResponse } from "../types/IFetchResponse";
import { IJwt } from "../types/IJwt";
import { IMessage } from "../types/IMessage";

export class AccountService {
    constructor(protected apiEndpointUrl: string, protected httpClient: HttpClient) {
        // apiEndpointUrl = https://xxx.xxx.xxx.xx/api/v1/ContactTypes
    }

    async login(email: string, password: string): Promise<IFetchResponse<IJwt | IMessage>> {
        let url = this.apiEndpointUrl;


        try {
            let body = {email, password};
            let bodyStr = JSON.stringify(body);
            console.log(bodyStr);

            const response = await this.httpClient.post(url, bodyStr , { cache: "no-store" });

            console.log('foobar1');
            console.log(response);

            if (response.ok) {
                const data = (await response.json()) as IJwt;
                return {
                    statusCode: response.status,
                    data: data,
                };
            }

            // TODO: why cant i do this?
            const data = (await response.json()) as IMessage;

            console.log('foobar2');
            return {
                statusCode: response.status,
                errorMessage: response.statusText + ' ' + data.messages.join(' '),
            };
        } catch (reason) {
            return {
                statusCode: 0,
                errorMessage: JSON.stringify(reason),
            };
        }

    }

}

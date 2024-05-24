using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using Dofins.Interfaces;


namespace Dofins.Services
{
    public class AuthenticationServices :IAuthentication
    {
        public async Task<String> GetTokenFireAnt()
        {
            string token = "";
            int maxRetries = 2000; // Maximum number of retry attempts
            int retryDelayMilliseconds = 2000; // Delay between retries in milliseconds (2 seconds in this example)
            using (HttpClient httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                int attempt = 1;
                while (attempt <= maxRetries)
                {
                    try
                    {
                        var postData = new
                        {
                            email = "dolphindofin@gmail.com",
                            password = "Nvtrung@81",
                        };
                        string jsonContent = JsonConvert.SerializeObject(postData);
                        var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                        HttpResponseMessage response = await httpClient.PostAsync("https://www.fireant.vn/api/Data/Login/Login", content);
                        if (response.IsSuccessStatusCode)
                        {
                            string data = await response.Content.ReadAsStringAsync();
                            JObject jsonObject = JsonConvert.DeserializeObject<JObject>(data);
                            return jsonObject["Token"]?.ToString();
                        }
                        else
                        {
                            Console.WriteLine($"Failed to post data: {response.StatusCode} - {response.ReasonPhrase}");
                            await Task.Delay(retryDelayMilliseconds);
                            attempt++; 
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"An error occurred: {ex.Message}");
                        await Task.Delay(retryDelayMilliseconds);
                        attempt++; 
                    }
                }
                Console.WriteLine($"Failed to get token after {maxRetries} attempts.");
                return "Not working";
            }
        }
    }
}

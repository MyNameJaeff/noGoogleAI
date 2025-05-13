chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        // Get the URL of the request
        let url = new URL(details.url);

        // Check if the URL is a Google search request
        if (url.hostname.includes("google.com") && url.pathname === "/search") {
            // Get the search parameters
            let params = url.searchParams;

            // Check if the "q" parameter exists and does not already include "-ai"
            let query = params.get("q");

            // If the query exists and does not include "-ai", modify it
            if (query && !query.includes("-ai")) {
                // Add "-ai" to the query
                params.set("q", query + " -ai");

                url.search = params.toString();

                // Redirect to the modified URL
                return { redirectUrl: url.toString() };
            }
        }
    },
    { urls: ["*://www.google.com/search*"] },
    ["blocking"]
);

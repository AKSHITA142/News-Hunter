const apiKey = "8e535c611ce8429291ac04befed4b4d0";

// Load default news when page opens
window.onload = () => {
    getNews("India");
};

async function getNews(topic) {
    topic = topic || document.getElementById("topic").value;
    if (!topic) {
        alert("Please enter a topic");
        return;
    }

    const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
    document.getElementById("newsContainer").innerHTML = "<p>Loading...</p>";

    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!data.articles || data.articles.length === 0) {
            document.getElementById("newsContainer").innerHTML = "<p>No news found.</p>";
            return;
        }

        document.getElementById("newsContainer").innerHTML = "";

        data.articles.forEach(article => {
            const div = document.createElement("div");
            div.classList.add("news");
            div.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/250'}" alt="">
                <h3>${article.title}</h3>
                <p>${article.description || 'No description available.'}</p>
                <a href="${article.url}" target="_blank">Read More →</a>
            `;
            document.getElementById("newsContainer").appendChild(div);
        });

    } catch (err) {
        console.error(err);
        document.getElementById("newsContainer").innerHTML = "<p>Error fetching news.</p>";
    }
}
/*
  npm init -y         Para generar una estructura por defecto
*/

const url = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCw05fUBPwmpu-ehXFMqfdMw&part=snippet%2Cid&order=date&maxResults=10';
const  content = null || document.getElementById('content'); // agregamos una referencia para poder utilizar el código en el archivo .html

const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '84274b6945mshc67b85170e9f640p1e6082jsn67fe7c4223ba',
		'x-rapidapi-host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData (urlApi){
    const response = await fetch(urlApi, options);
    const data = await response.json();
    return data;
}
(async () =>{
    try{
        const videos = await fetchData(url);
        let view = `
                  ${videos.items.map(video => `
                      <div class="group relative">
                        <div
                          class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                          <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                        </div>
                        <div class="mt-4 flex justify-between">
                          <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${video.snippet.title}
                          </h3>
                        </div>
                      </div>
                    `
                  ).slice(0,4).join(" ")} <!--slice permite mostrar cierta cantidad de elementos dde un array -->
        `;
        content.innerHTML = view;

    }catch(error){
      console.log(error);
    }
})();

/*
  DESPLIEGUE
  https://www.npmjs.com/package/gh-pages

  npm install gh-pages --save-dev

  En el package.json agregar un script
  
  "scripts": {
    "deploy": "gh-pages -d src"
  },


  npm run deploy
*/
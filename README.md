////////////////
THE SAKI PROJECT
////////////////

![image](https://github.com/user-attachments/assets/34be8ffa-d951-4926-ba19-9122f987334c)
![image](https://github.com/user-attachments/assets/8ccae356-455e-4a8a-b7b5-e0241149a096)
![image](https://github.com/user-attachments/assets/bd05431f-963e-41ca-aef2-cf3058c78728)


Summary:
- Pequeño Marketplace respaldado en un bonito frontal donde listamos una coleccion de NFT de dibujos de gatos hechos a mano, listos para vender (testnet). El proyecto pretende en un futuro poder recibir dibujos de pequeños artistas y realizar el pingueo a IPFS, convertir-los en NFTs y listarlos para vender...


1) PRIMEROS PASOS...

- Instalar e inicializar un proyecto de HardHat, usando node (npm install --save-dev hardhat // npx hardhat init) e instalar varias de las depencias que necesitaremos (openzeppelin, pinata, ethers, dotenv, etc.)

- Trastear e investigar que es esta nueva funcionalidad de "ignition". Más adelante veremos que es clave para desplegar los contratos e interactuar con ellos.

- Crear nuestro archivo ".env", donde iremos almacenando nuestras credenciales:
    ·PRIVATE_KEY (clave privada de la wallet del proyecto)
    ·PINATA_API_KEY (clave privada del nodo de Piñata, clave para pinear a IPFS)
    ·INFURA_API_KEY (clave privada del nodo de Infura, clave para el despliegue de SC)
    ·NFT_CONTRACT_ADDRESS (address del contrato "TheSakiNFT")
    ·SP_CONTRACT_ADDRESS (address del contrato "TheNewSakiPlace)

- Creación de una nueva carpeta llamada "images" donde almacenaremos los dibujos (.jpg)


2) BACKEND

- Preparación del archivo "hardhat.config.js" para tener todo listo a la hora de los deploys (conexión al nodo de Infura, importación de los artifacts y de las claves privadas)

- Creación de la carpeta "src/ipfs", donde programaremos 3 scripts que nos permitiran pinguer las imagenes y los metadatos a IPFS, así como conseguir una URL leible para browsers comerciales.

    ///////
    SCRIPTS
    ///////

    · pinFile: llamada a la función "pinFileToIpfs" pasandole un const con la ruta del dibujo
    · pinMetadata: llamada a la función "pinMetadataWithImageUri" pasandole la ruta de la imagen y los metadatos
    · zparseUri: llamda a la función "parseIpfsUri" pasandole la uri de la imagen o de los metadatos 


- Creación de los contratos para mintear los NFTs y comprarlos.

    /////////
    CONTRACTS
    /////////

    · "TheSakiNFTs": lógica para mintear los NFTs asociados a a los metadatos de los dibujos.
    · "TheNewSakiPlace": lógica para listar los NFTs, cancelar el listado y comprar los NFTs.
    · "ITheSakiNFTs": interfaz con las funciones para interactuar con el contrato de minteo des de el contrato TheNewSakiPlace.


- Creación de los módulos "Ignition", que realizarán el despliegue y las llamadas a las funciones.

    ///////
    MODULES
    ///////

    · MyNFTModule: Despliegue del contrato "TheSakiNFTs" sobre Sepolia y llamada a la función "safeMint" para mintear los 3 NFTs en nuestra wallet

    · TheRealList: Llamada a la instacia del contrato "TheSakiNFTs" y posteriormente a la función de "listNFT" para dejar listados los 3 NFTs.

    · TheRealSakiPlace: Despliegue del contrato "TheNewSakiPlace" sobre Sepolia.

    · MyTestDraw: Llamada a la función "listNFT" para listar el dibujo de test.


3) FRONTEND

- Creación de un pequeño frontal utilizando html y css como estilo ("index.html/index.css"), y javascript para poder conectar algunos de los botones del frontal con el backend mediante el script "main.js". (src/web)

    · Sección Inicio: Encontramos 4 botones: "Inicio" que te llevan al principio de la web, "Colección" te lleva a la colección de los NFTs, "Crea NFTs" te lleva a las redes sociales de Miki y Samu y "Conectar Metamask" te permite loggearte con tu wallet.

    · Sección Colección: Encontramos los 3 dibujos listados y ready para comprar. Veremos el nombre del dibujo, un botón de comprar que llama a al funció de "buyNFT" de nuestro contrato para realizar la compra, y un botón de ver en OpenSea para poder ver toda la información del NFT como el "id", la address del creador, etc.

    · Sección Final: Encontramos información de los developers, 4 botones para acceder al GitHub i Linkedin de Samu y Miki respectivamente

- Creación del archivo "main.js", el cual nos permitirá conectarnos a Metamask y hacer la llamada al contrato que está desplegado en Sepolia. En este script encontraremos la lógica para conectarnos a Metamask ("connectMetamask"), la importación de la ABI y la address del Smart Contract de TheNewSakiPlace (contrato con el que interactuaremos con el botón "Comprar" des de el frontal). Desde la constante "buyNFT" accederemos al contrato ya desplegado e interactuaremos con la función que permite la compra de los NFTs, recibiendo por parametros el "id" y el "price". Mediante "document.getElementById", conectaremos nuestro botón del front a la lógica del backend.


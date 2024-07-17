////////////////
THE SAKI PROJECT
////////////////

Summary:
- Pequeño Marketplace respaldado en un bonito frontal donde listamos una coleccion de NFT de dibujos de gatos hechos a mano, listos para vender (testnet).


1) PRIMEROS PASOS...

- Instalar e inicializar un proyecto de HardHat, usando node (npm install --save-dev hardhat // npx hardhat init) e instalar varias de las depencias que necesitaremos (openzeppelin, pinata, ethers, dotenv...)

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

- Creación del archivo "index.html" i su "index.css" para la creación del frontal y los botones que realizarán la conexión con el backed.

- Creación del archivo "main.js", el cual nos permitirá conectarnos a MEtamask y hacer la llamada al contrato que está desplegado en Sepolia.


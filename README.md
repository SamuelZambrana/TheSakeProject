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

- Creación de la carpeta "src/ipfs", donde programaremos 3 scripts que nos permitiran pinguer las imagenes y los metadatos a IPFS, así como conseguir una URL leible para browsers comerciales.

    ///////
    SCRIPTS
    ///////
```
    ·pinFile: 
    ·pinMetadata:
    ·zparseUri:

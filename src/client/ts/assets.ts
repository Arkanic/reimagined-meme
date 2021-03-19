import Logger from "../ts/logger";

let logger:Logger = new Logger("asset loader", "green");

let assets:{[unit:string]:HTMLImageElement} = {};

interface AssetData {
    name:string;
    url:string;
}

function handleRequireContext(r:__WebpackModuleApi.RequireContext):Array<AssetData> {
    let names:Array<string> = r.keys();
    let urls:Array<string> = r.keys().map(r) as Array<string>;

    let assetData:Array<AssetData> = [];
    for(let i in names) {
        assetData.push({
            name:names[i],
            url:urls[i]
        });
    }

    return assetData;
}

function downloadAsset(meta:AssetData):Promise<void> {
    return new Promise(resolve => {
        const asset:HTMLImageElement = new Image();
        asset.onload = () => {
            logger.log(`Successfully downloaded "${meta.url}"`);
            assets[meta.name] = asset;
            resolve();
        }
        asset.src = meta.url;
    });
}

export function startAssetLoading():void {
    let temp = handleRequireContext(require.context("../assets/", false, /\.(png|jpe?g|svg|gif|webp)$/));
    for(let i in temp) {
        
    }
}